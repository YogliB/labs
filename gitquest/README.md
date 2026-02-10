# GitQuest

GitQuest is a small, terminal-style web game that lets you:

1. Pick from the current top-starred GitHub repositories (5 or 10).
2. Traverse the repository’s commit history **one commit at a time**, starting from the **first** (oldest) commit.

It uses the GitHub REST API directly from the browser.

## Running locally

Open `gitquest/index.html` in a browser.

If you want a local web server (recommended so modules work in all browsers):

```bash
python3 -m http.server 5173
```

Then visit `http://localhost:5173/gitquest/`.

## Rate limits

Unauthenticated GitHub API requests are limited (typically 60 requests/hour per IP).

You can provide a GitHub token in the UI (stored in `localStorage`) to raise the limit.

## Deployment

This repo includes a GitHub Actions workflow that deploys the `gitquest/` directory to GitHub Pages.

After enabling GitHub Pages for the repository (Settings → Pages), the game will be served under the project pages path (for example):

- `https://<org-or-user>.github.io/<repo>/gitquest/`
