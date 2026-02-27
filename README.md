# Mystery History Website

A static website featuring mystery content, unknown mysteries, and lesser-known historical stories.

## 🌐 Live Site
(Will be updated after deployment)

## 📁 Project Structure

```
mystery-history-web/
├── src/                    # Website source files
│   ├── index.html         # Homepage
│   ├── about.html         # About page
│   ├── posts/             # Blog posts
│   ├── static/css/        # Stylesheets
│   └── layouts/           # Hugo templates (future use)
├── docs/                   # Planning documents
│   ├── planning/          # Business plan
│   ├── content/           # Content guidelines
│   └── technical/         # Tech stack docs
├── netlify.toml           # Netlify deployment config
└── vercel.json            # Vercel deployment config
```

## 🚀 Deployment

### Option 1: Netlify
1. Connect this repo to Netlify
2. Build settings are auto-configured in netlify.toml
3. Deploy!

### Option 2: Vercel
1. Connect this repo to Vercel
2. Settings are in vercel.json
3. Deploy!

## 🔎 Bing + IndexNow

### Bing Webmaster Tools (one-time)
1. Add your site in Bing Webmaster Tools: `https://mystery-history-web.vercel.app`
2. Verify ownership (recommended: import from Google Search Console, or upload Bing XML file if prompted).
3. Submit sitemap:
   - `https://mystery-history-web.vercel.app/sitemap.xml`

### IndexNow (already wired in this repo)
- Ownership key file is included at:
  - `src/0f9062759dcf474f9b27cb2d166aa8ed.txt`
- After deployment, this URL must return `200`:
  - `https://mystery-history-web.vercel.app/0f9062759dcf474f9b27cb2d166aa8ed.txt`
- GitHub Action auto-submit is included at:
  - `.github/workflows/indexnow.yml`
  - Add repository secret `INDEXNOW_KEY` with value `0f9062759dcf474f9b27cb2d166aa8ed`

Submit all sitemap URLs to IndexNow:

```bash
INDEXNOW_KEY=0f9062759dcf474f9b27cb2d166aa8ed scripts/submit-indexnow.sh
```

Dry run (preview payload only):

```bash
INDEXNOW_KEY=0f9062759dcf474f9b27cb2d166aa8ed scripts/submit-indexnow.sh --dry-run
```

## 💰 Cost
- Hosting: FREE (Netlify/Vercel free tier)
- Domain: ~$10-15/year (optional custom domain)
- Total: ~$15-20/year

## 📝 Content Workflow
1. Research mystery/lesser-known history topics
2. Verify sources (academic, reputable publications)
3. Write post following content-guidelines.md
4. Add to src/posts/ directory
5. Update index.html with new post link
6. Commit and push (auto-deploys)
