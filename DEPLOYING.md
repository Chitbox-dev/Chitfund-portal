# Deploying to Netlify (Static Export)

This project is configured for a static export and static hosting on Netlify.
It does not change app functionality; it only describes how to deploy.

- Framework: Next.js (App Router) with `output: "export"`
- Static output directory: `out/`
- Netlify config file: `netlify.toml`
- SPA + redirects: `public/_redirects`

## 1) Prerequisites

- Node.js 20.x
- A Netlify account
- (Optional) Netlify CLI if you prefer deploying from terminal

## 2) Build locally (optional but recommended)

```bash
npm install
npm run build
# Static site will be generated into the ./out directory
```

If the build succeeds, you are ready to deploy.

## 3) Deploy via Netlify UI (no CLI)

This is the easiest way—no terminal tools required.

1. Push your code to a Git provider (GitHub, GitLab, or Bitbucket)
2. In Netlify, click "Add new site" → "Import from Git"
3. Select your repository and branch
4. Build settings (Netlify reads these from `netlify.toml`):
   - Build command: `npm run build`
   - Publish directory: `out`
   - Node version: `20`
5. Click Deploy

Netlify will build your site and publish the static output from `out/`.

## 4) Deploy via Netlify CLI (optional)

If you prefer using the CLI but do not want to install it globally, use `npx`:

```bash
# One‑off usage without global install
npx netlify login
npm run build
npx netlify deploy --dir=out          # Preview deployment
npx netlify deploy --dir=out --prod   # Production deployment
```

If you want the CLI installed globally:

```bash
npm install -g netlify-cli
netlify login
npm run build
netlify deploy --dir=out
netlify deploy --dir=out --prod
```

If `netlify` is not found after a global install, ensure your global npm bin is in PATH
(macOS/zsh example):

```bash
mkdir -p ~/.npm-global/bin
npm config set prefix ~/.npm-global
echo 'export PATH="$HOME/.npm-global/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc
netlify --version
```

## 5) SPA routing and redirects

This project includes `public/_redirects` for Netlify‑style redirects:

- `/*    /index.html   200` ensures SPA fallback for client‑side routing
- `/login  /auth/login  301` redirects legacy `/login` to the current `/auth/login`

Netlify automatically uses this file during deploy; no extra config needed.

## 6) Environment and configuration

- `next.config.mjs` sets `output: "export"` and static‑export friendly options
- `netlify.toml` contains:
  - Build command: `npm run build`
  - Publish directory: `out`
  - Node version: `20`

## 7) Post‑deploy validation checklist

After Netlify finishes the build and deploy:

- Visit `/auth/login` and verify Admin / Foreman / User login flows
- Admin → Schemes → open a live scheme → "Reports"
- Foreman → Schemes → for a scheme, open "Manage" and "Publish"
- User → Dashboard, Card, Schemes
- Hit `/login` and confirm it redirects to `/auth/login` (or client‑side redirects immediately)
- Refresh deep links (e.g., `/foreman/schemes/...`) to confirm SPA fallback works

## 8) Troubleshooting

- "netlify: command not found"
  - Use `npx netlify ...` commands, or install globally with `npm i -g netlify-cli`
- Deployed site 404s on deep links
  - Ensure `public/_redirects` includes `/* /index.html 200` and is present in the build output
- Wrong publish directory
  - In Site settings, confirm Publish directory is `out`
- Node version mismatch
  - Ensure Node 20 is selected (set by `netlify.toml` or in Site settings → Environment)

## 9) Rollbacks

- Netlify keeps previous deploys—use the Netlify UI to roll back to a prior successful deploy.

---

You can now deploy this repository safely as a static website on Netlify without changing app functionality.

