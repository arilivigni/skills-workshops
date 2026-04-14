# Example skill and plugin workflow

## Local skill already in this repo

This repository already includes:

- `.github/skills/write-a-prd/`

That means you can start in the repo root, run:

```text
/skills list
```

and then invoke the skill directly in a prompt:

```text
Use /write-a-prd to draft a PRD in the chat for a follow-up workshop on Copilot CLI code review workflows. Do not create a GitHub issue.
```

## Shared plugin from `github/awesome-copilot`

The plugin marketplace flow is:

```text
/plugin marketplace browse awesome-copilot
```

If the marketplace is not already registered:

```bash
copilot plugin marketplace add github/awesome-copilot
```

Then install a concrete plugin. Two good workshop examples are:

- `project-planning@awesome-copilot`
- `structured-autonomy@awesome-copilot`

Example install:

```bash
copilot plugin install project-planning@awesome-copilot
```

After installation, confirm what loaded:

```text
/plugin list
/env
```

Then run one of the plugin-provided commands:

```text
/project-planning:create-implementation-plan
```

## Talking point

The important pattern is:

1. use a local skill for one focused capability
2. use `/plugin` to discover a larger shared bundle
3. install the plugin from `awesome-copilot`
4. verify what was added with `/plugin list` or `/env`
5. run the new plugin-provided command or agent
