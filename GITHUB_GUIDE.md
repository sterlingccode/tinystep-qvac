# TinyStep — Complete Local + GitHub Guide

## 1. Open the project

Extract `tinystep-qvac.zip`, then open a terminal inside the `tinystep-qvac` folder.

Check Git and Node:

```bash
git --version
node --version
```

QVAC's current JavaScript quickstart uses Node.js with `@qvac/sdk`; the current release is 0.20.0. The QVAC quickstart uses `loadModel()` and `completion()` for local inference. See the official sources linked in README.md.

## 2. Run the app locally

```bash
npm install
npm start
```

Open:

```text
http://localhost:3000
```

The first AI request may download the model, so the first run can take longer.

Stop the server with `Ctrl + C`.

## 3. Initialize Git — do this once

```bash
git init
git branch -M main
git config user.name "YOUR NAME"
git config user.email "YOUR GITHUB EMAIL"
```

Do NOT run `git add .` and commit yet if you plan to use the four Claude Code prompts below. Let each prompt create its own meaningful commit.

## 4. Use these 4 prompts in order

Paste one prompt at a time into Claude Code from the project folder.

### COMMIT 1/4

```text
COMMIT 1/4 — Prepare the project.

Review the existing TinyStep app and make a small, meaningful foundation improvement: add a simple GET /api/health endpoint, improve startup/error messages, and add a Node.js version requirement to package.json. Do not change the app's core behavior.

Then run:
git add .
git commit -m "chore: prepare TinyStep project"
```

### COMMIT 2/4

```text
COMMIT 2/4 — Harden QVAC integration.

Review the existing QVAC implementation. Keep @qvac/sdk 0.20.0, loadModel(), and completion(). Improve the QVAC error handling and model-loading flow without replacing QVAC or adding any cloud AI API.

Then run:
git add .
git commit -m "feat: harden QVAC integration"
```

### COMMIT 3/4

```text
COMMIT 3/4 — Improve the interface.

Improve the TinyStep UI with a cleaner loading state, clearer results, better mobile spacing, and a reset/clear action. Keep the app simple and responsive.

Then run:
git add .
git commit -m "feat: improve TinyStep UI"
```

### COMMIT 4/4

```text
COMMIT 4/4 — Finalize for GitHub.

Update README.md so it clearly explains TinyStep, localhost setup, QVAC usage, and the project structure. Keep the MIT LICENSE and .gitignore. Add a short GitHub submission section. Do not change core functionality.

Then run:
git add .
git commit -m "docs: finalize GitHub submission"
```

## 5. Check that all 4 commits exist

Run:

```bash
git log --oneline -4
```

You should see four commits, newest first:

```text
docs: finalize GitHub submission
feat: improve TinyStep UI
feat: harden QVAC integration
chore: prepare TinyStep project
```

## 6. Create the GitHub repository

On GitHub:

1. Click **New repository**.
2. Repository name: `tinystep-qvac`
3. Select **Public**.
4. Do NOT add a README.
5. Do NOT add a .gitignore.
6. Do NOT add a license.
7. Click **Create repository**.

Those files already exist in the local project.

## 7. Connect the local folder to GitHub

Copy the HTTPS repository URL from GitHub. It should look like:

```text
https://github.com/YOUR_USERNAME/tinystep-qvac.git
```

Then run:

```bash
git remote add origin https://github.com/YOUR_USERNAME/tinystep-qvac.git
git push -u origin main
```

Replace `YOUR_USERNAME` with your real GitHub username.

## 8. Verify the push

Refresh the GitHub repository page. You should see:

- the TinyStep files
- the README
- the MIT license
- a public repository
- four commits in the history

You can also verify the remote with:

```bash
git remote -v
```

## 9. Common Git errors

### `Author identity unknown`

```bash
git config --global user.name "YOUR NAME"
git config --global user.email "YOUR GITHUB EMAIL"
```

Then repeat the commit.

### `remote origin already exists`

```bash
git remote set-url origin https://github.com/YOUR_USERNAME/tinystep-qvac.git
```

### `src refspec main does not match any`

You have no local commit yet. Check:

```bash
git log --oneline
```

Then complete the four commits before pushing.

### GitHub asks for authentication

Complete GitHub's normal sign-in flow or use a GitHub Personal Access Token when prompted. Never paste a token into source files.

### Claude creates an extra commit

Run:

```bash
git log --oneline -6
```

Do not delete commits blindly. Share the output before changing history.
