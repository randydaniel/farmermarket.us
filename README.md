# Direx

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

## 🔧 SEO Features

### Automatic SEO Generation

Each resource page automatically generates:

- **Meta tags**: Title, description, keywords
- **Open Graph**: Social media sharing optimization
- **Twitter Cards**: Twitter-specific meta tags
- **JSON-LD**: Structured data for search engines
- **Canonical URLs**: Prevent duplicate content issues

### SEO Best Practices Included

- ✅ Dynamic, descriptive page titles
- ✅ Category-based keywords
- ✅ Social media preview images
- ✅ Structured data markup
- ✅ Mobile-friendly viewport
- ✅ Semantic HTML structure

---

## 🎨 Customization

### Styling

The project uses Tailwind CSS. Customize the design by:

1. **Colors**: Update color classes throughout components
2. **Typography**: Modify text sizes and fonts
3. **Layout**: Adjust spacing and grid configurations
4. **Components**: Customize individual component styles

### Components

All UI components are in `src/lib/components/ui/`:

- **Chip**: Filter buttons with active states
- **Pagination**: Navigation with Previous/Next and page numbers
- **ResourceCard**: Resource display with hover effects

---

## 📋 Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run check        # Run Svelte check
npm run check:watch  # Run Svelte check in watch mode
npm run lint         # Run ESLint
npm run format       # Run Prettier
```

---

## 🚀 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables in Vercel dashboard
```

### Netlify

```bash
# Build command: npm run build
# Publish directory: build
# Add PUBLIC_SITE_URL to environment variables
```

### Other Platforms

The project builds to static files and can be deployed to any static hosting service. Make sure to:

1. Set `PUBLIC_SITE_URL` environment variable
2. Configure redirects for SPA routing if needed
3. Set up SSL certificate for HTTPS

---

## 📚 Learn More

- [SvelteKit Documentation](https://kit.svelte.dev/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Phosphor Icons](https://phosphoricons.com/)
- [SEO Best Practices](https://developers.google.com/search/docs)

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

---

## 📄 License

[MIT License](LICENSE) - feel free to use this project for your own resource directory!
