# TinyStep

TinyStep is a simple localhost app that turns an overwhelming task into one tiny next action, three quick checks, and a rough time estimate.

## Built with

- QVAC SDK 0.20.0 for local AI inference
- Node.js + Express
- Plain HTML, CSS, and JavaScript

QVAC's current JavaScript quickstart uses `@qvac/sdk`, `loadModel()`, and `completion()` for local inference. QVAC is designed for local-first inference without a cloud AI API.

## Run locally

1. Install Node.js 22+.
2. Open this folder in a terminal.
3. Run:

```bash
npm install
npm start
```

4. Open:

`http://localhost:3000`

The first AI request can download the model and may take longer than later requests.

## How it works

1. The browser sends the task text to `/api/analyze`.
2. The Node server loads a local QVAC model.
3. QVAC generates a JSON task breakdown.
4. The result is shown in the browser.

No OpenAI, Gemini, or Anthropic API key is required.

## GitHub

Recommended repository name: `tinystep-qvac`

Use four meaningful commits:

1. `feat: initialize TinyStep project`
2. `feat: integrate QVAC local inference`
3. `feat: improve TinyStep UI`
4. `docs: prepare GitHub submission`

After the four commits, push `main` to your public GitHub repository.
