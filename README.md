# Direx

[![MadeWithSvelte.com shield](https://madewithsvelte.com/storage/repo-shields/5731-shield.svg)](https://madewithsvelte.com/p/direx/shield-link)

A modern resource directory built with SvelteKit, featuring categorized resource listings, advanced filtering, pagination, and comprehensive SEO optimization.

---

## ✨ Features

- **📚 Resource Directory**: Curated collection of tools and resources
- **🏷️ Category Filtering**: Filter resources by category with toggle functionality
- **📄 Pagination**: Handle large resource collections with smooth navigation
- **🔍 SEO Optimized**: Comprehensive meta tags, Open Graph, and structured data
- **📱 Responsive Design**: Beautiful UI that works on all devices
- **🏃‍♂️ Fast Performance**: Built with SvelteKit for optimal speed
- **🎨 Modern Styling**: Tailwind CSS with clean, professional design

---

## 🚀 Tech Stack

- **Framework:** [SvelteKit](https://kit.svelte.dev/)
- **Language:** TypeScript
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Icons:** [Phosphor Icons](https://phosphoricons.com/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Code Quality:** ESLint, Prettier

---

## 📁 Project Structure

```
src/
├── routes/
│   ├── [category]/[slug]/     # Dynamic resource pages
│   │   ├── +page.svelte       # Resource detail page
│   │   └── +page.ts          # Resource data loading
│   ├── +layout.svelte        # Root layout
│   └── +page.svelte          # Homepage with filters
├── lib/
│   ├── components/
│   │   ├── ui/               # Reusable UI components
│   │   │   ├── Chip.svelte
│   │   │   ├── Pagination.svelte
│   │   │   └── ResourceCard.svelte
│   │   └── layout/           # Layout components
│   │       ├── FilterBar.svelte
│   │       └── Hero.svelte
│   ├── data/
│   │   └── resources.json    # Resource data
│   ├── utils/
│   │   └── slugify.ts        # URL slugification
│   └── config.ts             # Site configuration
```

---

## ⚙️ Configuration

### Site Configuration

Update the main site settings in `src/lib/config.ts`:

```typescript
export const config = {
	siteName: 'Your Site Name', // Update for your brand
	siteDescription: 'Your description', // SEO description
	defaultSiteUrl: 'https://yourdomain.com' // Your production domain
};
```

### Environment Variables

Create a `.env` file in your project root for environment-specific configuration:

```bash
# Production domain (used for SEO meta tags)
PUBLIC_SITE_URL=https://yourdomain.com
```

#### Environment Examples

**Development:**

```bash
PUBLIC_SITE_URL=http://localhost:5173
```

**Staging:**

```bash
PUBLIC_SITE_URL=https://staging.yourdomain.com
```

**Production:**

```bash
PUBLIC_SITE_URL=https://yourdomain.com
```

> **Note:** The `PUBLIC_` prefix makes the variable available to client-side code in SvelteKit.

### Deployment Configuration

#### Vercel

Add environment variables in your Vercel dashboard:

- Key: `PUBLIC_SITE_URL`
- Value: `https://yourdomain.com`

#### Netlify

Add to your Netlify environment variables:

```
PUBLIC_SITE_URL=https://yourdomain.com
```

#### Custom Server

Export the environment variable:

```bash
export PUBLIC_SITE_URL=https://yourdomain.com
npm run build
```

---

## 🛠️ Getting Started

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd direx

# Install dependencies
npm install
```

### Development

```bash
# Start development server
npm run dev

# Open in browser automatically
npm run dev -- --open
```

### Production Build

```bash
# Build for production
npm run build

# Preview production build locally
npm run preview
```

---

## 📝 Content Management

### Adding Resources

Edit `src/lib/data/resources.json` to add new resources:

```json
{
	"id": "unique-id",
	"title": "Resource Name",
	"description": "Brief description of the resource",
	"image": "/images/resource-image.jpg",
	"category": "category-slug",
	"externalUrl": "https://external-resource.com",
	"sponsored": false
}
```

### Categories

Update filter categories in `src/routes/+page.svelte`:

```typescript
const filters = [
	{
		label: 'Category Name',
		icon: IconComponent,
		category: 'category-slug'
	}
	// Add more categories...
];
```

### Pagination

Resources are automatically paginated when there are more than 20 items. You can adjust this in `src/routes/+page.svelte`:

```typescript
const itemsPerPage = 20; // Change this value
```

---

## 💰 Ad System

The project includes a flexible ad system that supports multiple custom ads with randomization and future Google Ads integration.

### Features

- **🎲 Randomized Ads**: Each page load displays a random ad from your pool
- **📍 Smart Placement**: Configure which grid row ads appear in on directory pages
- **📄 Resource Page Ads**: Display ads on individual resource pages
- **🎯 Multiple Ad Support**: Manage multiple custom ads easily
- **🚀 Google Ads Ready**: Built-in support for future Google Ads integration
- **⚙️ Fully Configurable**: Control placement, frequency, and display logic

### Configuration

Configure ads in `src/lib/config.ts`:

```typescript
export const config = {
	// ... other config
	ads: {
		enabled: true, // Enable/disable ad system
		// Directory page ads
		placementRow: 1, // Insert ad after this row (1-based)
		itemsPerRow: 4, // Must match your grid columns
		// Individual resource page ads
		showOnResourcePages: true, // Enable/disable ads on resource pages

		// Custom ads pool - randomly selected
		customAds: [
			{
				id: 'soc-compliance',
				image: '/ads/soc.png',
				url: 'https://randy.digital'
			}
			// Add more ads here...
		],

		// Google Ads configuration (for future use)
		googleAds: {
			enabled: false, // Will enable when Google Ads are ready
			adSlotId: '', // Your Google Ads slot ID
			frequency: 0.3 // 30% chance to show Google Ad vs custom ad
		}
	}
};
```

### Ad Placement Logic

The system uses a smart placement algorithm:

- **Row-Based**: Ads appear after complete rows of resources
- **Example**: With `placementRow: 1` and `itemsPerRow: 4`, the ad appears after the 4th resource
- **Responsive**: Automatically adapts to your grid configuration

```typescript
// Placement Examples:
placementRow: 1, itemsPerRow: 4  // Ad after 4 resources (1st row)
placementRow: 2, itemsPerRow: 4  // Ad after 8 resources (2nd row)
placementRow: 3, itemsPerRow: 4  // Ad after 12 resources (3rd row)
```

The system will automatically calculate the correct insertion point based on your grid layout.

### Resource Page Ads

Ads also appear on individual resource pages after the main content. This provides additional ad impressions and monetization opportunities.

**Features:**

- **Same Ad Pool**: Uses the same randomized ad system as directory pages
- **Optimal Placement**: Positioned after resource description, before page end
- **Configurable**: Can be disabled independently from directory ads
- **Responsive**: Adapts to the resource page layout

**Configuration:**

```typescript
ads: {
	showOnResourcePages: true,  // Enable ads on individual resource pages
	// ... other settings
}
```

**To disable resource page ads only:**

```typescript
ads: {
	enabled: true,              // Keep directory ads enabled
	showOnResourcePages: false, // Disable resource page ads
	// ... other settings
}
```

### Ad System Components

- **`Ad.svelte`**: Displays custom ads with your branding
- **`GoogleAd.svelte`**: Ready for Google Ads integration (currently placeholder)
- **`ads.ts`**: Utility functions for ad logic and randomization

### Disabling Ads

To disable the ad system completely:

```typescript
ads: {
	enabled: false,
	// ... rest of config
}
```

### Adding New Ads

Simply add new ad objects to the `customAds` array:

```typescript
{
	id: 'unique-ad-id',                    // Unique identifier
	image: '/ads/your-ad-image.png',       // Full ad image path
	url: 'https://example.com/landing'     // Click-through URL
}
```

### Ad Image Guidelines

- **Full-Image Design**: Ads are complete images that fill the entire ad space
- **Self-Contained**: All text, branding, and call-to-action should be part of the image
- **Recommended Size**: 1200x400px (3:1 aspect ratio) for banner-style ads
- **Format**: PNG, JPG, or WebP
- **File Size**: Under 500KB for optimal loading
- **Content**: Design the complete ad within the image file
- **Responsive**: Images automatically scale to fit the container width

### Randomization System

- **Load-Time Selection**: A random ad is chosen when the page loads
- **Equal Distribution**: All ads have equal chance of being displayed
- **Future Enhancement**: Google Ads can be mixed in based on frequency setting

### Google Ads Integration (Future)

When ready to integrate Google Ads:

1. **Enable Google Ads**:

   ```typescript
   googleAds: {
     enabled: true,
     adSlotId: 'your-google-ads-slot-id',
     frequency: 0.3  // 30% Google Ads, 70% custom ads
   }
   ```

2. **Update GoogleAd Component**: Uncomment the Google Ads code in `src/lib/components/ui/GoogleAd.svelte`

3. **Add Google Ads Script**: The system will automatically handle the integration

### Testing Different Placements

You can easily test different ad placements by adjusting the configuration:

```typescript
// Test ad after first row
placementRow: 1;

// Test ad after second row
placementRow: 2;

// Test ad after third row
placementRow: 3;
```

The system will automatically calculate the correct insertion point based on your grid layout.
