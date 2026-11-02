# GradeMate — Fictional Academic Demo & SPI Calculator

A standalone browser application with fictional academic data and an illustrative 10-point SPI calculator. All student, institution, programme, course and result details in the default dataset are synthetic; they do not describe a real academic record.

## Demo dataset

`public/academic-data.js` contains five invented courses for Demo Student at Sample Institute (fictional), B.Sc. Computer Applications (demo). The courses total 16 credits and 133 weighted grade points: SPI = 133/16 = 8.3125, displayed as 8.31. Because this example contains only one semester, its example CPI equals SPI.

There is no affiliation with a real institution and no claim that the default grades belong to any person.

## Illustrative grading

AA=10, AB=9, BB=8, BC=7, CC=6, CD=5, DD=4, F=0.

- SPI = sum(course credits × grade points) / total credits taken.
- F earns zero credits and zero points; its attempted credits remain in the denominator.
- Pending/unknown grades are rejected rather than treated as failed courses.
- No percentage cutoffs, numerical marks or SPI-to-percentage conversion are assumed.
- Institutions can use different policies; adapt `public/grades.js` when using the tool with your own grading system.

## Features

- Responsive dashboard and fictional course/result tables
- Editable letter-grade and credit-based planning calculator
- Separate fixed demo record and editable scenarios
- Browser-local scenario history with restore/removal
- CSV exports explicitly labeled fictional or planning scenario
- Browser print / Save as PDF
- No accounts, server storage, external scripts or API keys

## Run locally

With Python 3:

```sh
python3 -m http.server 8080 --bind 127.0.0.1 --directory public
```

Open http://localhost:8080. Stop with Ctrl+C. Serve through HTTP; do not open the module-based app through file://.

## Test and build

With Node.js 20 or newer:

```sh
npm test
npm run build
```

There are no npm dependencies to install. The build copies the browser app into `dist/`.

## Deploy

### GitHub Pages

The included `.github/workflows/static.yml` publishes `public/` on pushes to `main`. In Settings → Pages, choose GitHub Actions. Relative asset paths support repository project URLs.

### Netlify / Vercel / Cloudflare Pages

Use the repository root as the project/base directory, `npm run build` as the build command, and `dist` as the output/publish directory. No environment variables are required. Netlify configuration and security headers are provided.

### Static hosting

Upload the contents of `public/` or `dist/` to the web root, keeping `index.html` alongside the JS/CSS files. Enable HTTPS through your host.

### Docker

```sh
docker build -t grademate .
docker run --rm -p 8080:80 grademate
```

Nginx serves the app at http://localhost:8080. The Docker image is provided but was not built during this update.

## Storage and privacy

Scenarios are stored on the current browser and origin under `grademate.fictional-demo.v3`. They are not sent to a server or added to the repository. Previous browser datasets remain separate. A different storage key prevents earlier personal or sample entries from appearing in the public demo by default.

Up to 100 scenarios are retained. Clearing browser data removes them. CSV exports are local downloads. The repository contains no personal academic document, birth date, identifier, verification code or QR image.

## Files

- `public/academic-data.js`: fictional default dataset
- `public/grades.js`: grade conversion and SPI formulas
- `public/app.js`: dashboard, results, calculator, history and exports
- `public/index.html`, `public/styles.css`, `public/icon.svg`: responsive interface
- `tests/grades.test.js`: synthetic-data reconciliation and grading tests
- `build.mjs`, `netlify.toml`, `Dockerfile`: build/hosting support
