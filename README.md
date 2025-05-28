# direx

A modern SvelteKit starter project, pre-configured with TypeScript, Tailwind CSS, ESLint, and Prettier for rapid development.

---

## Tech Stack

- **Framework:** [SvelteKit](https://kit.svelte.dev/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) (with Typography plugin)
- **Type Checking:** TypeScript
- **Linting/Formatting:** ESLint, Prettier (with Svelte and Tailwind plugins)

---

## Directory Structure

```
/ (root)
├── src/
│   ├── routes/         # SvelteKit routes (pages, layouts)
│   │   ├── +layout.svelte
│   │   └── +page.svelte
│   ├── lib/            # Shared components/utilities (currently empty)
│   ├── app.css         # Global styles (Tailwind)
│   ├── app.d.ts, app.html
├── static/             # Static assets (not shown)
├── package.json        # Project metadata, scripts, dependencies
├── svelte.config.js    # SvelteKit configuration
├── vite.config.ts      # Vite configuration
├── tsconfig.json       # TypeScript configuration
├── eslint.config.js    # ESLint configuration
├── .prettierrc         # Prettier configuration
```

---

## Getting Started

### Create a Project

If you haven't already:

```bash
npx sv create my-app
cd my-app
```

### Install Dependencies

```bash
npm install
# or
pnpm install
# or
yarn
```

### Develop

```bash
npm run dev
# or open in browser automatically
npm run dev -- --open
```

### Build for Production

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

> To deploy, install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.

---

## Project Status

- **Starter state:** Minimal custom code, ready for development.
- **No business logic or custom components yet.**
- **Modern tooling and best practices pre-configured.**

---

## Suggestions for Next Steps

- Add components/utilities to `src/lib/`.
- Add new pages or endpoints in `src/routes/`.
- Customize Tailwind config as needed.
- Add tests as the project grows.

---

## Learn More

- [SvelteKit Documentation](https://kit.svelte.dev/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Vite Documentation](https://vitejs.dev/guide/)
