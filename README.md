# My Static Site

React + TypeScript static website, built with Vite. Deployable to any virtual server (VPS) via nginx.

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

## Deploy to Virtual Server (nginx)

### 1. Build

```bash
npm run build
```

### 2. Upload dist/ to your server

```bash
rsync -avz dist/ user@your-server:/var/www/my-static-site/dist/
```

Or with scp:

```bash
scp -r dist/ user@your-server:/var/www/my-static-site/
```

### 3. Configure nginx

Copy `nginx.conf` to your server and update:
- `server_name` — your domain
- `root` — path to your `dist/` folder
- SSL cert paths (use [Certbot](https://certbot.eff.org/) for free Let's Encrypt certs)

```bash
sudo cp nginx.conf /etc/nginx/sites-available/my-static-site
sudo ln -s /etc/nginx/sites-available/my-static-site /etc/nginx/sites-enabled/
sudo nginx -t          # test config
sudo systemctl reload nginx
```

### 4. (Optional) Get a free SSL certificate

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com -d www.your-domain.com
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
