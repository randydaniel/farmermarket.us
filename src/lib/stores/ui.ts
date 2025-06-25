import { writable, derived } from 'svelte/store';

// UI Store for application-wide UI state
export interface UIState {
	currentView: 'list' | 'map';
	mobileMenuOpen: boolean;
	selectedState: string;
	currentPage: number;
	loading: boolean;
}

const initialUIState: UIState = {
	currentView: 'list',
	mobileMenuOpen: false,
	selectedState: '',
	currentPage: 1,
	loading: false
};

// Core UI store
const createUIStore = () => {
	const { subscribe, set, update } = writable<UIState>(initialUIState);

	return {
		subscribe,
		setView: (view: 'list' | 'map') => update((state) => ({ ...state, currentView: view })),
		toggleMobileMenu: () =>
			update((state) => ({ ...state, mobileMenuOpen: !state.mobileMenuOpen })),
		closeMobileMenu: () => update((state) => ({ ...state, mobileMenuOpen: false })),
		setSelectedState: (state: string) =>
			update((uiState) => ({ ...uiState, selectedState: state, currentPage: 1 })),
		setCurrentPage: (page: number) => update((state) => ({ ...state, currentPage: page })),
		setLoading: (loading: boolean) => update((state) => ({ ...state, loading })),
		reset: () => set(initialUIState)
	};
};

export const uiStore = createUIStore();

// Derived stores for computed values
export const isMapView = derived(uiStore, ($ui) => $ui.currentView === 'map');
export const isListView = derived(uiStore, ($ui) => $ui.currentView === 'list');
