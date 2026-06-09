# Base44 App

## Project setup

Install dependencies:

```bash
npm install
```

Run locally:

```bash
npm run dev
```

Build production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Environment variables

Create a `.env` file from `.env.example` and set your Base44 configuration:

```env
VITE_BASE44_APP_ID=your_app_id
VITE_BASE44_BACKEND_URL=https://your-backend.example.com
VITE_BASE44_FUNCTIONS_VERSION=your_functions_version
VITE_BASE44_APP_BASE_URL=https://your-app-base-url.example.com
BASE44_LEGACY_SDK_IMPORTS=false
```

- `VITE_BASE44_APP_ID` is the application ID for your Base44 app.
- `VITE_BASE44_BACKEND_URL` points to the Base44 backend server.
- `VITE_BASE44_FUNCTIONS_VERSION` selects the functions API version.
- `VITE_BASE44_APP_BASE_URL` enables proxy support during local development and preview.
- `BASE44_LEGACY_SDK_IMPORTS` is optional and only needed for legacy `@/entities` or `@/integrations` imports.

## Deployment

This is a static Vite app. The production build output is generated in the `dist/` folder.

### Netlify

- Build command: `npm run build`
- Publish directory: `dist`
- The included `netlify.toml` redirects all routes to `index.html` for SPA routing.

### Vercel

- Build command: `npm run build`
- Output directory: `dist`
- The included `vercel.json` configures SPA routing and static deployment.

## Notes

- `dist/` is generated and ignored by git.
- `node_modules/` is ignored by git.
- `manifest.json` is provided so the app can reference a web manifest without a 404.
