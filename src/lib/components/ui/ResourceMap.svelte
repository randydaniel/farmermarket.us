<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { addCoordinatesToResource } from '$lib/utils/geocoding';
	import { slugify } from '$lib/utils/slugify';

	export let resources: any[] = [];

	let mapContainer: HTMLDivElement;
	let map: google.maps.Map;
	let isLoaded = false;
	let currentMarkers: any[] = [];

	// Function to clear existing markers
	function clearMarkers() {
		currentMarkers.forEach((marker) => {
			marker.map = null;
		});
		currentMarkers = [];
	}

	// Function to add markers to the map
	function addMarkersToMap(resourcesToMap: any[]) {
		if (!map || !isLoaded) return;

		// Clear existing markers first
		clearMarkers();

		// Process resources and add markers
		const processedResources = resourcesToMap.map((resource) => {
			// Use real coordinates if available, otherwise use geocoding fallback
			if (resource.coordinates && resource.coordinates.lat && resource.coordinates.lng) {
				return resource;
			} else {
				return addCoordinatesToResource(resource);
			}
		});

		const bounds = new (window as any).google.maps.LatLngBounds();
		let markersAdded = 0;

		// Add markers for resources
		processedResources.forEach((resource) => {
			if (resource.coordinates && resource.coordinates.lat && resource.coordinates.lng) {
				const position = { lat: resource.coordinates.lat, lng: resource.coordinates.lng };

				// Create custom pin
				const { AdvancedMarkerElement, PinElement } = (window as any).google.maps.marker;
				const pin = new PinElement({
					background: '#2563eb',
					borderColor: '#1d4ed8',
					glyphColor: 'white'
				});

				// Create marker
				const marker = new AdvancedMarkerElement({
					map,
					position,
					content: pin.element,
					title: resource.title
				});

				// Create info window content
				const infoContent = `
					<div style="padding: 12px; min-width: 200px; max-width: 300px;">
						<h3 style="font-weight: 600; margin: 0 0 8px 0; color: #1f2937; font-size: 16px;">${resource.title}</h3>
						<p style="font-size: 14px; color: #6b7280; margin: 0 0 8px 0; line-height: 1.4;">${resource.description}</p>
						<p style="font-size: 12px; color: #9ca3af; margin: 0 0 12px 0;">${resource.address.street}, ${resource.address.city}, ${resource.address.state}</p>
						<a href="/${slugify(resource.address.state)}/${slugify(resource.title)}" 
						   style="color: #2563eb; text-decoration: underline; font-size: 14px; display: inline-block; padding: 4px 0;"
						   onmouseover="this.style.color='#1d4ed8'"
						   onmouseout="this.style.color='#2563eb'">
						   View Details →
						</a>
					</div>
				`;

				const infoWindow = new (window as any).google.maps.InfoWindow({
					content: infoContent
				});

				// Add click listener to marker
				marker.addListener('click', () => {
					infoWindow.open(map, marker);
				});

				// Store marker for later cleanup
				currentMarkers.push(marker);

				bounds.extend(position);
				markersAdded++;
			}
		});

		// Fit map to show all markers
		if (markersAdded > 0) {
			map.fitBounds(bounds);
			// Ensure minimum zoom level for single markers
			const listener = (window as any).google.maps.event.addListener(map, 'bounds_changed', () => {
				const zoom = map.getZoom();
				if (zoom && zoom > 15) {
					map.setZoom(15);
				}
				(window as any).google.maps.event.removeListener(listener);
			});
		}
	}

	// Watch for changes in resources prop
	$: if (isLoaded && resources) {
		addMarkersToMap(resources);
	}

	onMount(async () => {
		if (!browser) return;

		// Wait for Google Maps to load
		const loadGoogleMaps = () =>
			new Promise<void>((resolve) => {
				if ((window as any).google && (window as any).google.maps) {
					resolve();
					return;
				}

				(window as any).initMap = () => {
					resolve();
				};

				const script = document.createElement('script');
				// Use environment variable or fallback to a demo key for testing
				const apiKey =
					import.meta.env.VITE_GOOGLE_MAPS_API_KEY || 'AIzaSyB41DRUbKWJHPxaFfYBxF0wKrE-GgdD6JM';
				script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=maps,marker&v=beta&callback=initMap`;
				script.async = true;
				script.defer = true;
				document.head.appendChild(script);
			});

		try {
			await loadGoogleMaps();

			// Initialize Google Maps
			const { Map } = await (window as any).google.maps.importLibrary('maps');
			const { AdvancedMarkerElement, PinElement } = await (window as any).google.maps.importLibrary(
				'marker'
			);

			// Initialize map centered on USA
			map = new Map(mapContainer, {
				zoom: 4,
				center: { lat: 39.8283, lng: -98.5795 }, // Center of USA
				mapId: 'farmers-market-map',
				mapTypeControl: false,
				streetViewControl: false,
				fullscreenControl: false
			});

			isLoaded = true;

			// Add initial markers
			addMarkersToMap(resources);
		} catch (error) {
			console.error('Error loading Google Maps:', error);
		}
	});
</script>

{#if !isLoaded}
	<div
		class="relative flex h-[600px] w-full items-center justify-center overflow-hidden rounded-lg border border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-900"
	>
		<div class="text-center">
			<div class="mx-auto mb-2 h-8 w-8 animate-spin rounded-full border-b-2 border-blue-600"></div>
			<p class="text-sm text-slate-600 dark:text-slate-400">Loading map...</p>
		</div>
	</div>
{/if}

<div
	bind:this={mapContainer}
	class="relative h-[600px] w-full overflow-hidden rounded-lg border border-slate-200 dark:border-slate-700"
	class:hidden={!isLoaded}
></div>

<style>
	/* Custom styling for Google Maps info windows */
	:global(.gm-style-iw) {
		border-radius: 8px !important;
	}

	:global(.gm-style-iw-d) {
		overflow: hidden !important;
	}
</style>
