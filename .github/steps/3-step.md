## Step 3: Copilot's AI Forge ⚡

> _ZAP! You've entered the **Copilot's AI Forge** — a crackling chamber of electricity and code where ideas become reality in seconds. Copilot (the purple robot) hovers before a holographic terminal, goggles glowing, ready to amplify your skills. Here, you don't just write code — you **co-create** it with an AI partner. Charge up and forge something amazing!_

<img width="400" alt="Copilot's AI Forge – the purple robot Copilot surrounded by electric arcs at a holographic terminal" src="https://github.com/user-attachments/assets/94c61bed-f731-4bc3-b63f-ad6772379848" />

---

### 📖 Theory: GitHub Copilot — Your AI Pair Programmer

**GitHub Copilot** is an AI coding assistant trained on billions of lines of public code. It lives right inside your editor and helps you:

- **Autocomplete** entire functions from a comment or a few characters.
- **Chat** about your code: "Explain this function", "Refactor this loop", "Write tests for this".
- **Fix bugs** faster by describing the problem in plain English.

> [!IMPORTANT]
> Copilot is a **suggestion engine**, not a decision engine. Always review its output — you are the pilot, it is the co-pilot! ✈️

Think of Copilot as forging a sword: the AI heats the metal and shapes it, but **you** decide the final design and swing it.

---

### ⌨️ Activity 1: Ignite the Forge — Write Code with Copilot Suggestions

Copilot works best when you give it clear context. Let's forge a utility function!

1. Create a new branch called `copilot-forge`.

1. Create a new file called `forge/utils.py` (create the `forge/` folder through the file path).

1. At the top of the file, add this comment and press **Enter/Return** to invite Copilot's suggestion:

   ```python
   # Function that takes a list of numbers and returns only the even ones
   ```

   > [!NOTE]
   > If you are using GitHub.com's web editor, Copilot suggestions appear as you type. If you are using VS Code with the Copilot extension, press `Tab` to accept a suggestion.

1. Accept or adapt Copilot's suggestion so your file contains a working `filter_evens` function.

1. Below the function, add another comment:

   ```python
   # Function that greets a developer by name with an emoji
   ```

1. Accept Copilot's greeting function suggestion.

1. Commit the file with message: `feat: forge utility functions with Copilot`

<details>
<summary>Having trouble? 🤷</summary><br/>

- Copilot on GitHub.com works in the web-based code editor (press `.` on any repo to open it).
- If suggestions don't appear automatically, try typing the first few characters of a function definition after the comment.
- You can always write the functions yourself if Copilot isn't available — the goal is to practice the workflow!

Example implementation if needed:
```python
def filter_evens(numbers):
    return [n for n in numbers if n % 2 == 0]

def greet_developer(name):
    return f"⚡ Hello, {name}! Welcome to Copilot's AI Forge!"
```

</details>

---

### ⌨️ Activity 2: Power Up — Use Copilot Chat to Add Tests

Every forged weapon needs to be tested before battle. Use **Copilot Chat** to generate unit tests for your new functions!

1. Open the `forge/utils.py` file in the GitHub web editor (press `.` on the repo page to open VS Code for the Web).

1. Open **Copilot Chat** (the chat icon in the sidebar, or press `Ctrl+Shift+I` / `Cmd+Shift+I`).

1. Type the following prompt in the chat:

   ```
   Write pytest unit tests for the filter_evens and greet_developer functions in this file. Include edge cases.
   ```

1. Review Copilot's suggested test file, then create a new file at `forge/test_utils.py` with the tests.

1. Commit with message: `test: add Copilot-generated unit tests for forge utils`

<details>
<summary>Having trouble? 🤷</summary><br/>

- Copilot Chat is available in VS Code, VS Code for the Web (github.dev), and JetBrains IDEs with the Copilot extension.
- If Copilot Chat isn't available, write simple tests manually and commit them.

Example test file:
```python
from forge.utils import filter_evens, greet_developer

def test_filter_evens_basic():
    assert filter_evens([1, 2, 3, 4, 5, 6]) == [2, 4, 6]

def test_filter_evens_empty():
    assert filter_evens([]) == []

def test_filter_evens_all_odd():
    assert filter_evens([1, 3, 5]) == []

def test_greet_developer():
    result = greet_developer("Mona")
    assert "Mona" in result
```

</details>

---

### ⌨️ Activity 3: Final Forging — Open Your PR and Complete the Workshop

The forge is complete. Your code is sharp, tested, and ready!

1. Open a **Pull Request** from `copilot-forge` to `main`.

1. Title it: `⚡ Copilot's AI Forge — Utility functions forged!`

1. In the description, answer these questions:
   - What did Copilot suggest that surprised you?
   - Would you change anything about the generated code?

1. Click **Create pull request**.

1. Copilot is running the final energy scan... give it about **20 seconds**, then refresh to see the final results! ⚡🎉

<details>
<summary>Having trouble? 🤷</summary><br/>

- Make sure both files (`forge/utils.py` and `forge/test_utils.py`) are committed to the `copilot-forge` branch before opening the PR.
- If the `copilot-forge` branch doesn't appear in the dropdown, confirm the branch was created and has at least one commit.
- Check the [Actions](../../actions) tab if the review takes longer than expected.

</details>
