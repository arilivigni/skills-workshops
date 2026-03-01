## Step 1: Mona's Dev Den 🐱‍💻

> _Welcome to **Mona's Dev Den!** Mona has been coding all night and her repo is a glorious mess of ideas. She needs YOUR help to organize the adventure. Put on your hoodie, grab your laptop, and let's crack the code together!_

<img width="400" alt="Mona's Dev Den – Mona the purple-hoodie coder sitting at her laptop" src="https://github.com/user-attachments/assets/cd1e15fb-0efa-48a2-a567-cd772e5d255e" />

---

### 📖 Theory: Repositories, Branches, and Commits

Every great adventure starts with a **repository** — a project folder that Git tracks over time. Inside every repo, work happens on **branches**. Think of branches as parallel story timelines: you write your changes on a branch without disturbing the main storyline.

When you're happy with your changes, you capture them in a **commit** — a snapshot with a message describing what you did. Good commit messages are like breadcrumbs that help future you (and Mona!) retrace the path.

> [!TIP]
> Short, descriptive commit messages win the game. `"fix bug"` loses; `"fix typo in README heading"` wins! 🏆

Key concepts:
- **Repository**: Where your project lives, tracked by Git.
- **Branch**: An isolated workspace for your changes.
- **Commit**: A saved snapshot of changes with a message.

---

### ⌨️ Activity 1: Unlock Mona's Vault — Create a New Branch

Mona has locked her Dev Den behind a secret branch. To enter, you must create a new branch. This is your first quest!

1. Navigate to the **Code** tab of this repository.

1. Click the branch selector dropdown (it shows **main** by default).

1. Type `mona-dev-den` in the search box.

1. Select **Create branch: mona-dev-den from main**.

1. You are now inside Mona's vault! 🎉

<details>
<summary>Having trouble? 🤷</summary><br/>

- Make sure you are on the repository's **Code** tab, not Issues or Pull Requests.
- The branch dropdown is in the upper-left corner near the file list.
- If the branch already exists, Mona may have been here before — just select it.

</details>

---

### ⌨️ Activity 2: Crack the Code — Commit a New File

Mona left a challenge: add a file to her Dev Den that proves you were here. Leave your mark!

1. While on the `mona-dev-den` branch, click **Add file** → **Create new file**.

1. Name the file `ADVENTURERS.md`.

1. In the file body, type the following (replace `<your-github-username>` with your actual username):

   ```markdown
   # Adventurers of Mona's Dev Den

   - @<your-github-username> — Cracked the code! 🐱‍💻
   ```

1. Scroll down to **Commit changes**.

1. Set the commit message to: `feat: add my name to ADVENTURERS.md`

1. Choose **Commit directly to the `mona-dev-den` branch**.

1. Click **Commit changes**. Mona cheers — you're in! 🎊

<details>
<summary>Having trouble? 🤷</summary><br/>

- The **Add file** button is on the repository's **Code** tab when viewing a branch.
- Make sure you have the `mona-dev-den` branch selected before creating the file.
- Commit messages should be short and in present tense (e.g. `feat: ...`).

</details>

---

### ⌨️ Activity 3: Open the Portal — Create a Pull Request

Mona can only merge your contribution into the main story once you open a Pull Request (PR). PRs are how adventurers share their work for review!

1. Click the **Pull requests** tab.

1. Click **New pull request**.

1. Set **base** to `main` and **compare** to `mona-dev-den`.

1. Click **Create pull request**.

1. Title it: `🐱‍💻 Mona's Dev Den — I cracked the code!`

1. In the description, tell Mona what you discovered in her Den. Then click **Create pull request**.

1. Mona is preparing the next level... give her about **20 seconds**, then check back here!

<details>
<summary>Having trouble? 🤷</summary><br/>

- Both the **base** and **compare** dropdowns appear on the "Compare changes" page.
- If you don't see your branch in the compare dropdown, make sure you committed the file to `mona-dev-den`.
- Check the [Actions](../../actions) tab if Mona takes longer than expected.

</details>
