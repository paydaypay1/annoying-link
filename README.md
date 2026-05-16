# Annoying Link

React + TypeScript static website, built with Vite. Deployable to any virtual server (VPS).

## Tech Stack

- **React 18** — UI library
- **TypeScript** — type safety
- **Vite** — fast dev server and optimized builds

## Local Development

```bash
# Install dependencies
npm install

# Start dev server (http://localhost:5173)
npm run dev

# Type-check
npx tsc --noEmit
```

## Build for Production

```bash
npm run build
```

Output goes to `dist/`. Preview it locally with:

```bash
npm run preview
```

## Project Structure

```
my-static-site/
├── public/            # Static assets (copied as-is to dist/)
├── src/
│   ├── components/    # Reusable React components
│   ├── App.tsx        # Root component
│   ├── App.css
│   ├── main.tsx       # Entry point
│   ├── index.css      # Global styles
│   └── vite-env.d.ts  # Vite type shims
├── index.html         # HTML shell
├── vite.config.ts     # Vite config
├── tsconfig.json      # TypeScript config
├── nginx.conf         # nginx server config
└── package.json
```
