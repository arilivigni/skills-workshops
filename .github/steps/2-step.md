## Step 2: Ducky's Deployment Dock 🐥

> _QUACK! You've made it to **Ducky's Deployment Dock!** Ducky lives by one rule: "If it isn't automated, it isn't deployed." She's wearing her GitHub t-shirt and her merge button is glowing green. Your mission? Help Ducky launch the rocket by setting up a GitHub Actions workflow — before the countdown hits zero!_

<img width="400" alt="Ducky's Deployment Dock – the rubber duck mascot in a GitHub t-shirt with a merge button" src="https://github.com/user-attachments/assets/cd1e15fb-0efa-48a2-a567-cd772e5d255e" />

---

### 📖 Theory: GitHub Actions and Automation

**GitHub Actions** is GitHub's built-in automation platform. You describe what should happen — and when — using YAML workflow files stored in `.github/workflows/`.

A workflow has three key ingredients:

| Ingredient | What it does |
|------------|-------------|
| **Trigger** (`on:`) | Defines when the workflow runs (e.g. on push, pull request, schedule) |
| **Job** | A group of steps that run on a virtual machine (runner) |
| **Step** | A single task — running a script or using a pre-built Action |

> [!NOTE]
> Ducky insists every change goes through CI before it merges. "No green check, no merge!" she quacks loudly.

---

### ⌨️ Activity 1: Fire Up the Engine — Create a Workflow File

Ducky needs a CI workflow to run on every pull request. Help her build it!

1. Make sure you are on the `mona-dev-den` branch (from Step 1) or create a new branch called `ducky-dock`.

1. Navigate to `.github/workflows/` in the file tree (create the folder path if it doesn't exist yet).

1. Click **Add file** → **Create new file**.

1. Name the file `.github/workflows/ducky-ci.yml`.

1. Paste the following workflow:

   ```yaml
   name: 🐥 Ducky's CI Check

   on:
     pull_request:
       branches:
         - main

   jobs:
     ducky-check:
       name: Ducky's Quality Quack
       runs-on: ubuntu-latest
       steps:
         - name: Checkout code
           uses: actions/checkout@v4

         - name: 🐥 Ducky says hello
           run: echo "QUACK! All systems go. Prepare for launch! 🚀"

         - name: Check ADVENTURERS file exists
           run: |
             if [ -f "ADVENTURERS.md" ]; then
               echo "✅ ADVENTURERS.md found. Ducky approves!"
             else
               echo "❌ ADVENTURERS.md not found. Ducky is sad. 🐥"
               exit 1
             fi
   ```

1. Commit the file with the message: `ci: add Ducky's CI workflow`

1. Ducky's engines are warming up... 🔥

<details>
<summary>Having trouble? 🤷</summary><br/>

- YAML indentation matters! Use spaces, not tabs.
- If you're creating the `.github/workflows/` path via the file name field, type the full path including the file name: `.github/workflows/ducky-ci.yml`.
- If the workflow file has syntax errors, the Actions tab will show a failed run with details.

</details>

---

### ⌨️ Activity 2: T-Minus Zero — Trigger the Workflow

Ducky's countdown has begun! The workflow triggers on pull requests. Let's see it run.

1. Open the pull request you created in Step 1 (or open a new PR from your current branch to `main`).

1. Scroll down to the **Checks** section at the bottom of the PR.

1. Wait for **🐥 Ducky's CI Check** to appear and run.

1. Click on the check to see Ducky's log output. Look for her famous message: `QUACK! All systems go. Prepare for launch! 🚀`

1. Once all checks are **green** ✅, Ducky gives the thumbs-up (or wing-up?) to merge!

<details>
<summary>Having trouble? 🤷</summary><br/>

- If you don't see any checks, make sure the workflow file was committed to the correct branch and the PR targets `main`.
- If the workflow fails, click **Details** next to the failing check to read the error logs.
- You can also go to the **Actions** tab to see all workflow runs.

</details>

---

### ⌨️ Activity 3: Merge! — Land Your Code on Main

The rocket is fueled, checks are green — it's time to merge!

1. On the pull request page, scroll to the **Merge pull request** button.

1. Click **Merge pull request**, then **Confirm merge**.

1. The `mona-dev-den` branch has successfully docked! 🐥🎉

1. Give Ducky about **20 seconds** to quack up the next challenge, then refresh this page.

<details>
<summary>Having trouble? 🤷</summary><br/>

- The merge button will be green if all required checks pass.
- If the merge button is disabled, check whether there are any failing checks or merge conflicts.
- After merging, you can safely delete the branch — Ducky keeps a tidy dock!

</details>
