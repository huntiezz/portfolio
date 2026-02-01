# Personal Website

[![Views](https://komarev.com/ghpvc/?username=huntiezz&repo=portfolio&label=Views&color=blueviolet&style=flat-square)](https://github.com/huntiezz/portfolio)
[![Stars](https://img.shields.io/github/stars/huntiezz/portfolio?style=flat-square&color=gold)](https://github.com/huntiezz/portfolio/stargazers)
[![Commits](https://img.shields.io/github/commit-activity/t/huntiezz/portfolio?style=flat-square)](https://github.com/huntiezz/portfolio/commits)
[![Contributors](https://img.shields.io/github/contributors/huntiezz/portfolio?style=flat-square)](https://github.com/huntiezz/portfolio/graphs/contributors)  
[![Language](https://img.shields.io/github/languages/top/huntiezz/portfolio?style=flat-square)](https://github.com/huntiezz/portfolio)


Personal website and online presence.  
Built with Node.js, optimized for fast iteration locally and simple deployment.

---

## About

This project powers my personal site, including public-facing pages and live presence data.
It is designed to be minimal, readable, and easy to maintain without unnecessary abstraction.

---

## Requirements

You must have the following installed:

### Node.js
Download from:
https://nodejs.org/en

Recommended version: **18.x or newer**

Verify:
```bash
node -v
npm -v
````

### Git

Download from:
[https://git-scm.com/downloads](https://git-scm.com/downloads)

Verify:

```bash
git --version
```

---

## Local Development

1. Clone the repository

   ```bash
   git clone https://github.com/huntiezz/portfolio.git
   ```

2. Enter the project directory

   ```bash
   cd YOUR_REPO_NAME
   ```

3. Install dependencies

   ```bash
   npm install
   ```

4. Start the development server

   ```bash
   npm run dev
   ```

5. Open your browser and navigate to:

   ```
   http://localhost:3070
   ```

---

## Build and Run (Production)

1. Build the project

   ```bash
   npm run build
   ```

2. Start the production server

   ```bash
   npm run start
   ```

---

## Deployment

1. Initialize a git repository (if not already initialized)

   ```bash
   git init
   ```

2. Commit the source

   ```bash
   git add .
   git commit -m "Initial commit"
   ```

3. Push to your hosting provider
   Compatible with platforms such as Vercel, Railway, or a VPS.

## Notes

* Node.js must be installed before running `npm install`
* If dependencies break, delete `node_modules` and reinstall
* Designed to stay simple and extensible
