# Fozayel Ibn Ayaz — Portfolio Website

A high-impact, frontend-first portfolio built from the provided CV and public GitHub profile.

## What is included

- Unique dark, high-tech UI with glass panels, animated ambient background, particle network canvas, animated service graphics, and a project slider.
- Expanded portfolio coverage for digital marketing, social media marketing, SEO, email marketing, content writing, lead generation, data entry/VA, Shopify/Amazon VA, customer support, IT support, Unreal Engine support, and Playwright automation.
- Fully responsive layout for mobile, tablet, and desktop.
- Live GitHub integration using the public GitHub API.
- Local GitHub snapshot fallback for offline previews or blocked networks.
- LinkedIn profile connection plus a data scaffold for approved LinkedIn API updates.
- Downloadable CV with optional hidden Google Drive backend delivery, so the admin can update the PDF in Drive without changing portfolio code.
- Accessible navigation, reduced-motion support, scroll progress indicator, floating Call/WhatsApp actions, semantic HTML, SEO metadata, JSON-LD, sitemap, manifest, and service worker.
- No frontend framework required; the site is static and free-hosting ready.

## File structure

```text
portfolio/
├─ index.html
├─ styles.css
├─ app.js
├─ service-worker.js
├─ api/cv.js
├─ api/_drive-cv.js
├─ netlify/functions/cv.js
├─ manifest.webmanifest
├─ robots.txt
├─ sitemap.xml
├─ assets/
│  ├─ avatar.jpg
│  ├─ favicon.svg
│  ├─ og-card.svg
│  └─ Fozayel-Ibn-Ayaz-CV.pdf
├─ data/
│  ├─ github-snapshot.json
│  ├─ profile.json
│  └─ linkedin.json
├─ scripts/
│  └─ update-github-snapshot.mjs
└─ .github/workflows/
   ├─ deploy-pages.yml
   └─ refresh-github-snapshot.yml
```

## Run locally

Because the site fetches local JSON fallback files, preview it through a tiny local server instead of opening `index.html` directly.

```bash
cd portfolio
python3 -m http.server 8080
```

Then open:

```text
http://localhost:8080
```

## Contact form

The contact form is wired to FormSubmit so messages can be delivered to `ibnayaz789@gmail.com` from a static free-hosted site. On the first real submission, FormSubmit may send a one-time activation/confirmation email to that inbox. After confirmation, future submissions go directly to the inbox.

A `mailto:` fallback is also included if the external form service is blocked in a local preview.


## Google Drive CV backend

The CV download links use a smart fallback:

1. If `/api/cv` is available, the visitor downloads the latest PDF through the site backend. The Google Drive folder URL is not exposed in the visible portfolio UI.
2. If the site is opened locally or hosted on GitHub Pages without a backend, the link falls back to `assets/Fozayel-Ibn-Ayaz-CV.pdf`.

The backend is configured for this Google Drive folder:

```text
https://drive.google.com/drive/folders/1VCnTDzoYmmCQ5nMUaIggYnOIyPfJ2h1R
```

To make the backend work on Vercel or Netlify:

1. Keep the Google Drive folder shared as **Anyone with the link can view**.
2. Deploy on Vercel or Netlify using their backend/serverless support.
3. Optional but recommended: create a Google Cloud API key with Google Drive API enabled and add this environment variable in the hosting dashboard:

```text
GOOGLE_DRIVE_API_KEY=your_google_drive_api_key
```

The backend can also read the current public Drive folder without an API key, but the API key is more reliable.

Optional override if the folder changes later:

```text
GOOGLE_DRIVE_FOLDER_ID=1VCnTDzoYmmCQ5nMUaIggYnOIyPfJ2h1R
```

After that, replace the PDF inside the Drive folder whenever you want. The portfolio will serve the newest modified PDF from the backend without code changes.

For GitHub Pages, use the local PDF fallback or add the included serverless deployment on Vercel/Netlify, because GitHub Pages does not run backend functions.

### Why `/api/cv` can show 404 locally

If you run only:

```bash
python3 -m http.server 8080
```

then `/api/cv` will not exist, because Python's static server cannot run Vercel/Netlify backend functions. The page now starts with the local PDF as a safe fallback and switches to `/api/cv` only when the deployed backend responds successfully.

For the real Google Drive backend, deploy on Vercel or Netlify with functions enabled.

## Free hosting options

### Option 1 — GitHub Pages

1. Create a new public GitHub repository, for example `portfolio`.
2. Upload the contents of this `portfolio` folder to the repository root.
3. Commit and push to the `main` branch.
4. Go to **Settings → Pages**.
5. Under **Build and deployment**, choose **GitHub Actions**.
6. The included workflow `.github/workflows/deploy-pages.yml` will deploy the site.

Your free URL will usually be:

```text
https://fozayelibnayaz.github.io/portfolio/
```

If you use a different repository name, update `sitemap.xml` with the final URL.

### Option 2 — Netlify — recommended for full project + CV backend

Best method: deploy through GitHub, not a plain drag-and-drop folder, because the Google Drive CV backend uses Netlify Functions.

1. Unzip `fozayel-portfolio.zip`.
2. Create a new GitHub repository.
3. Upload all unzipped files so `index.html`, `styles.css`, `app.js`, `netlify.toml`, and `netlify/functions/cv.js` are at the repository root.
4. In Netlify, choose **Add new site → Import an existing project**.
5. Select the GitHub repository.
6. Build settings:

```text
Base directory: blank
Build command: blank
Publish directory: .
Functions directory: netlify/functions
```

7. Deploy.

After deploy, test these URLs:

```text
https://your-site.netlify.app/styles.css
https://your-site.netlify.app/app.js
https://your-site.netlify.app/assets/avatar.jpg
https://your-site.netlify.app/api/cv
```

If CSS/JS is missing, the wrong folder was deployed. The folder containing `index.html` must be the publish root.

If `/api/cv` is 404, Netlify Functions were not deployed. Use GitHub import or Netlify CLI instead of basic drag-and-drop.

### Option 3 — Vercel — also good for the hidden CV backend

Use the contents of the `portfolio` folder as the Vercel project root. The deploy-ready ZIP in this workspace already places `index.html`, `styles.css`, `app.js`, and `api/` at the ZIP root.

If you push this inside a larger repository, set **Root Directory** in Vercel to:

```text
portfolio
```

Then deploy with default static settings. Do not set an output directory. Framework preset should be **Other**.

If CSS/JS looks missing after deployment, it means Vercel is serving the wrong folder. Confirm that these files are at the deployed project root:

```text
index.html
styles.css
app.js
api/cv.js
api/_drive-cv.js
```

## Automatic updates

### GitHub

The live website already fetches public GitHub data in the browser:

- Profile stats
- Recently updated repositories
- Repository language mix
- Latest update date

The included workflow also refreshes `data/github-snapshot.json` once per day. That snapshot is used when an API request is blocked or when the site is previewed offline.

### LinkedIn

LinkedIn does not allow open public-profile scraping from a static frontend. The site links to the LinkedIn profile and includes `data/linkedin.json` as an approved data source placeholder.

For true automatic LinkedIn updates, use one of these compliant options:

1. **Official LinkedIn API** with approved permissions and a server-side token.
2. **Manual export/update** by editing `data/linkedin.json` when profile content changes.
3. **CMS bridge** such as Notion, Airtable, Sanity, or Google Sheets, then fetch that public JSON from the portfolio.

Do not use unofficial LinkedIn scraping for a professional portfolio.

## Editing the portfolio

- Main page content: `index.html`
- Theme and animations: `styles.css`
- GitHub auto-update and slider logic: `app.js`
- CV/profile source data: `data/profile.json`
- LinkedIn source placeholder: `data/linkedin.json`

## Deployment note

The website has no build step. It is intentionally static for speed, free hosting, and reliability.
