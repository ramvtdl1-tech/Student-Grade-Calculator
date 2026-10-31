# GradeMate — Student Grade Calculator

Complete standalone implementation of the academic portal referenced by the QR code:
https://stitch.withgoogle.com/preview/869079966551211960?node-id=2890aa43ce66476198c244501ea8fb08

This is newly written source based on the visible preview, with working application behavior. It is not an export of the private original Stitch project. See `ANALYSIS.md` for findings and differences.

## Included

- Responsive dashboard and desktop/mobile navigation
- Editable student profile and semester
- Add/remove subjects, credit hours, obtained marks and maximum marks
- Live, validated credit-weighted GPA and percentage calculations
- Final exam target calculator
- Results with subject breakdown and pass/fail status
- Up to 100 saved scenarios with restore, details and removal
- CSV report download and print / Save as PDF
- Browser-local persistence, with no API keys, paid services, external scripts or runtime dependencies
- Unit tests, static build script, Netlify configuration and Dockerfile

## Run

From this directory, with Python 3 installed:

```sh
python3 -m http.server 8080 --bind 127.0.0.1 --directory public
```

Open http://localhost:8080. Serve through HTTP; do not double-click the HTML file, because JavaScript modules need an HTTP origin. Stop the server with Ctrl+C.

With Node.js installed, `npm start` runs the same server. There are no npm dependencies to install.

## Validate and build

Use Node.js 20 or newer:

```sh
npm test
npm run build
```

The build copies the complete site to `dist/`. It requires no secrets or environment variables. You can alternatively publish `public/` directly; its contents are identical to the built site.

## Deployment

### Any static host, cPanel, GitHub Pages, or object storage website

Upload the **contents** of `dist/` to your website document root. `index.html` must sit at that root, beside `styles.css`, `app.js`, `grades.js` and `icon.svg`. Hash-based routes do not need server rewrites. Relative asset paths also support project subdirectories.

The separate `student-grade-portal-static.zip` contains those deployable files at the archive root. Extract it into your host's public directory. Configure HTTPS on the host for normal production use.

### Netlify repository deployment

Use `student-grade-portal` as the project/base directory if uploading the entire parent repository. The included `netlify.toml` defines:

- Build command: `npm run build`
- Publish directory: `dist`
- Content security and response headers

For a new repository containing only this folder's contents, use the repository root as the base directory. A drag-and-drop deployment can instead use the built `dist/` directory.

### Vercel or Cloudflare Pages

Deploy as a plain/static project. Set the project root to this directory, build command to `npm run build`, and output directory to `dist`. No framework, server function or environment variable is required.

### Docker

```sh
docker build -t grademate .
docker run --rm -p 8080:80 grademate
```

Open http://localhost:8080. The image serves `public/` through Nginx. For production, place it behind your HTTPS reverse proxy. The Docker image was supplied but was not built during this task.

## Formulas and customization

Change `public/grades.js` to use your institution's grading thresholds. The supplied scale follows the preview calculator's illustrated A ≥90% (4.0), A− ≥85% (3.7), etc., and uses a 50% course pass threshold. It is an illustrative policy, not a universal university standard.

- Course percent = obtained / maximum × 100.
- Semester GPA = sum(course grade points × credits) / sum(attempted credits).
- Weighted percent = sum(course percent × credits) / sum(attempted credits).
- Raw percent = sum(obtained marks) / sum(maximum marks) × 100.
- Required final score = (target − current coursework average × (1 − final weight)) / final weight.

The target calculator assumes coursework is complete and the final exam is the only remaining component. Requirements above 100% are reported as unattainable. Failed subjects remain in the GPA denominator. Thresholds use full precision, and results are rounded only for presentation.

Profile defaults and sample courses are in `public/app.js`. Branding and theme are in `public/index.html`, `public/styles.css` and `public/icon.svg`.

## Storage and scope

State is stored under `grademate.v1` in localStorage for the current browser and origin. It is not synchronized between users, browsers, devices, ports or hosting domains. Clearing browser data removes it. Export CSV reports before changing origins if needed. Removing a saved calculation is immediate; there is no history trash. The 100-entry limit discards the oldest entry when saving a new one.

There is no backend, login, institutional integration, cumulative academic record, or cloud backup. Add authenticated server storage if those capabilities are required. The initial sample semester is Fall 2024 to match the supplied design; edit it through the avatar/profile dialog.

## Verification performed

- Six Node tests: unequal credits/maxima, grade boundaries, invalid inputs, fractional/zero marks, target scenarios and sample arithmetic
- Build and JavaScript syntax check
- Browser: live result updates; target final score; save, reload and restore history; results navigation; CSV download
- Visual QA at 1440px and 390px; no page-level horizontal overflow
- Docker and external hosting were not executed; no live deployment URL is included

## Files

- `public/`: complete browser application
- `tests/grades.test.js`: formula regression tests
- `build.mjs`, `package.json`: optional Node commands
- `netlify.toml`: static hosting configuration
- `Dockerfile`, `.dockerignore`: Nginx container packaging
- `ANALYSIS.md`: reference review and implementation decisions
