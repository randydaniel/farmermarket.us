<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import type { Map } from 'leaflet';
	import { addCoordinatesToResource } from '$lib/utils/geocoding';
	import { slugify } from '$lib/utils/slugify';

	export let resources: any[] = [];

	let mapContainer: HTMLDivElement;
	let map: Map;

	onMount(async () => {
		if (!browser) return;

		// Dynamically import Leaflet to avoid SSR issues
		const L = await import('leaflet');

		// Initialize map
		map = L.map(mapContainer).setView([39.8283, -98.5795], 4); // Center of USA

		// Add tile layer
		L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
			attribution: '© OpenStreetMap contributors'
		}).addTo(map);

		// Process resources and add markers
		const processedResources = resources.map((resource) => {
			// Use real coordinates if available, otherwise use geocoding fallback
			if (resource.coordinates && resource.coordinates.lat && resource.coordinates.lng) {
				return resource;
			} else {
				return addCoordinatesToResource(resource);
			}
		});

		// Add markers for resources
		processedResources.forEach((resource) => {
			if (resource.coordinates && resource.coordinates.lat && resource.coordinates.lng) {
				const popupContent = `
					<div style="padding: 12px; min-width: 200px;">
						<h3 style="font-weight: 600; margin: 0 0 8px 0; color: #1f2937;">${resource.title}</h3>
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

				const marker = L.marker([resource.coordinates.lat, resource.coordinates.lng])
					.addTo(map)
					.bindPopup(popupContent, {
						maxWidth: 300,
						className: 'custom-popup'
					});
			}
		});

		// Fit map to show all markers
		const markersWithCoords = processedResources.filter(
			(r) => r.coordinates && r.coordinates.lat && r.coordinates.lng
		);

		if (markersWithCoords.length > 0) {
			const group = new L.FeatureGroup(
				markersWithCoords.map((r) => L.marker([r.coordinates.lat, r.coordinates.lng]))
			);
			if (group.getLayers().length > 0) {
				map.fitBounds(group.getBounds().pad(0.1));
			}
		}
	});

	// Cleanup function
	function cleanup() {
		if (map) {
			map.remove();
		}
	}
</script>

<svelte:head>
	<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
</svelte:head>

<div
	bind:this={mapContainer}
	class="relative h-[600px] w-full overflow-hidden rounded-lg border border-slate-200 dark:border-slate-700"
	style="z-index: 1;"
></div>

<style>
	:global(.leaflet-popup-content-wrapper) {
		border-radius: 8px;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
	}

	:global(.custom-popup .leaflet-popup-content-wrapper) {
		background: white;
		border-radius: 8px;
	}

	:global(.custom-popup .leaflet-popup-content) {
		margin: 0;
		padding: 0;
	}

	:global(.leaflet-popup-tip) {
		background: white;
	}

	/* Ensure map controls don't interfere with page layout */
	:global(.leaflet-control-container) {
		position: relative !important;
	}

	/* Prevent map from being sticky or fixed */
	:global(.leaflet-container) {
		position: relative !important;
		z-index: 1 !important;
	}

	/* Fix any potential overlay issues */
	:global(.leaflet-pane) {
		z-index: auto !important;
	}

	/* Ensure popups are properly layered */
	:global(.leaflet-popup-pane) {
		z-index: 700 !important;
	}

	:global(.leaflet-popup) {
		z-index: 1000 !important;
	}
</style>
