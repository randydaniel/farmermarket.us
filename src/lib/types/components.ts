// Component prop interfaces following PRD TypeScript strict mode requirements

export interface ResourceCardProps {
	title: string;
	description?: string;
	image: string;
	state: string;
	externalUrl: string;
	sponsored?: boolean;
}

export interface HeroProps {
	align?: 'left' | 'center' | 'right';
	videoBackground?: string;
	videoBackgroundMobile?: string;
	showAvatars?: boolean;
	avatarImages?: string[];
	height?: string;
}

export interface ButtonProps {
	variant?: 'primary' | 'secondary' | 'ghost';
	size?: 'sm' | 'md' | 'lg';
	href?: string;
	type?: 'button' | 'submit' | 'reset';
	disabled?: boolean;
	loading?: boolean;
	leftIcon?: {
		component: any;
		props?: Record<string, any>;
	};
	rightIcon?: {
		component: any;
		props?: Record<string, any>;
	};
	onClick?: (event: MouseEvent) => void;
}

export interface PaginationProps {
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
	showFirstLast?: boolean;
	maxVisiblePages?: number;
}

export interface FilterBarProps {
	filters: Array<{
		label: string;
		icon: any;
		state: string;
	}>;
	selectedState: string;
	onFilterSelect: (state: string) => void;
}

export interface AdProps {
	adData: {
		id: string;
		image: string;
		url: string;
	} | null;
	className?: string;
}

// Resource data interfaces
export interface ResourceAddress {
	street?: string;
	city: string;
	state: string;
	zipCode?: string;
	latitude?: number;
	longitude?: number;
}

export interface Resource {
	id: string;
	title: string;
	description?: string;
	image: string;
	address: ResourceAddress;
	externalUrl: string;
	sponsored?: boolean;
	hours?: Array<{
		day: string;
		open: string;
		close: string;
	}>;
	contact?: {
		phone?: string;
		email?: string;
		website?: string;
	};
	categories?: string[];
}

// Blog post interfaces
export interface BlogPost {
	slug: string;
	title: string;
	description: string;
	date: string;
	author: string;
	content: string;
	excerpt: string;
	readingTime: number;
	tags: string[];
	image?: string;
}

// SEO meta interfaces
export interface SEOProps {
	title: string;
	description: string;
	canonical?: string;
	ogImage?: string;
	ogType?: 'website' | 'article';
	articleAuthor?: string;
	articlePublishedTime?: string;
	structuredData?: Record<string, any>;
}
