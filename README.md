# Personal Portfolio — Quick Start

This repository contains a minimal static portfolio site you can customize and publish.

Local preview

Run a simple static server from the project root:

```bash
python -m http.server 8000
# then open http://localhost:8000 in your browser
```

Publish with GitHub Pages

1. Create a GitHub repository and push this project (all files) to the `main` branch.
2. In the repository settings -> Pages, select `main` branch and `/ (root)` or set `docs/` if you move files there.
3. After enabling, GitHub will publish at `https://<your-username>.github.io/<repo-name>/`.

Quick local git & push commands

Replace `<your-username>` and `<repo>` with your GitHub values, then run:

```bash
git init
git branch -M main
git add .
git commit -m "Initial portfolio"
git remote add origin git@github.com:<your-username>/<repo>.git
git push -u origin main
```

When you push, the included GitHub Actions workflow (`.github/workflows/gh-pages.yml`) will automatically deploy the `docs/` folder to GitHub Pages on pushes to `main`.

If you prefer publishing from the repository root instead, let me know and I will update the workflow or move files back.

Optional: automatic deployment

- Use a GitHub Action or the `gh-pages` branch to deploy automatically. For simple static sites, enabling Pages on `main` is easiest.

Next steps I can help with

- Personalize the content (name, bio, projects) and add images.
- Create a custom domain and configure DNS.
- Add a GitHub Actions workflow to deploy to `gh-pages` automatically.
