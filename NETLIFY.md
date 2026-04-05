# Publishing this project on Netlify

This app is a **Next.js 14** site. Deployment uses the official [**`@netlify/plugin-nextjs`**](https://docs.netlify.com/integrations/frameworks/next-js/overview/), which is declared in `netlify.toml`. You do **not** need to set a static `publish` folder manually; the plugin wires the Next.js build output to Netlify’s CDN and serverless runtime.

## Prerequisites

- A [Netlify](https://www.netlify.com/) account (free tier is enough).
- This repository pushed to **GitHub**, **GitLab**, **Bitbucket**, or **Azure DevOps** (Netlify connects via Git), *or* the [Netlify CLI](https://docs.netlify.com/cli/get-started/) for manual deploys.

## Option A — Deploy from Git (recommended)

1. **Push your code** to your Git host (e.g. GitHub) on the branch you want to deploy (often `main`).
2. In Netlify: **Add new site** → **Import an existing project**.
3. **Connect** your Git provider and pick this repository.
4. Netlify will read `netlify.toml` and should show:
   - **Build command:** `npm run build`
   - **No manual publish directory** — the Next.js plugin manages it.
5. Click **Deploy site**. The first build may take several minutes.
6. After success, your site is available at `https://<your-site-name>.netlify.app`. You can change the site name under **Site configuration → Domain management**.

### Optional: Node version

The repo includes `.nvmrc` (Node 20). Netlify will use it if you enable **“Read `.nvmrc`”** or set **Environment variable** `NODE_VERSION=20` under **Site configuration → Environment variables**.

## Option B — Deploy with Netlify CLI

Install the CLI, log in, and deploy from your machine:

```bash
npm install -g netlify-cli
netlify login
cd /path/to/this/project
npm install
netlify deploy --build --prod
```

For a production deploy, `--prod` publishes to your live `*.netlify.app` URL. Without `--prod`, you get a **draft** deploy URL.

## After deploy: sitemap and canonical URL

`next-sitemap` uses `next-sitemap.config.js` (`siteUrl`). For SEO, set it to your real URL (custom domain or `https://<your-site>.netlify.app`), commit, and redeploy.

## Troubleshooting

- **Build fails on ESLint:** Run `npm run build` locally and fix reported errors before pushing.
- **Wrong Node version:** Set `NODE_VERSION` in Netlify or rely on `.nvmrc`.
- **API routes:** Next.js routes under `src/pages/api/` are handled by the Netlify Next.js runtime; no extra Netlify Functions config is required for those.
- **Windows / `netlify deploy --build`: `ENOENT` unlink `.next\...`:**  
  Next.js can fail while cleaning `.next` if the folder is stale or partially locked. **`netlify.toml`** runs `npx rimraf .next && npm run build` so each Netlify/CLI build starts from a clean output directory. Before deploying from your PC:
  - **Stop `npm run dev`** (and anything else using the project) so `rimraf` is not blocked with `EPERM` on files like `.next/trace`.
  - If cleanup still fails, delete the `.next` folder in File Explorer, then run again.
  - OneDrive-synced project folders can worsen locking; excluding `.next` from sync or moving the repo helps.

