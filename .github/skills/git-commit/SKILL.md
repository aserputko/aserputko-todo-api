---
name: git-commit
description: 'Write Git commit messages in Semantic Commit / Conventional Commits format with feat, fix, docs, style, refactor, test, ci or chore types. Use when committing changes, generating or suggesting a commit message, amending a message, squashing commits, naming a PR title, or when the user mentions commit, git message, semantic commit, conventional commits, feat, fix, docs, style, refactor, test, ci, or chore.'
---

# Git commit messages

Format: `<type>(<scope>): <subject>` — scope is optional. Based on Semantic Commit Messages / Conventional Commits.

```
feat: add hat wobble
^--^  ^------------^
|     |
|     +-> Summary in present tense.
|
+-------> Type
```

Full form:

```
<type>(<optional scope>): <subject>

<optional body>

<optional footer>
```

## Types

| Type       | Use for                                                                                              |
| ---------- | ---------------------------------------------------------------------------------------------------- |
| `feat`     | New feature for the user, not for a build script                                                     |
| `fix`      | Bug fix for the user, not a fix to a build script                                                    |
| `docs`     | Documentation changes only                                                                           |
| `style`    | Formatting, missing semicolons, etc.; no production code change                                      |
| `refactor` | Refactoring production code, e.g. renaming a variable or moving files; no behavior change            |
| `test`     | Adding missing tests or refactoring tests; no production code change                                 |
| `ci`       | CI/CD config: pipelines, GitHub Actions, build/deploy workflows                                      |
| `chore`    | Maintenance with no production code change: deps, tooling/config, build scripts, skills/instructions |

If a change mixes types, pick the one matching the primary intent. Prefer suggesting separate commits when the changes are unrelated.

References: https://www.conventionalcommits.org/ and https://seesparkbox.com/foundry/semantic_commit_messages

## Rules

- Subject: imperative mood ("add", not "added"), lowercase, no trailing period, max 72 chars.
- Scope (optional): FSD layer or slice name, e.g. `app`, `shared`, `todo-list`. Omit if the change spans many areas.
- Body (optional): explain why, not what; wrap at 100 chars; separate from subject with a blank line.
- Breaking change: add `!` after type/scope (`feat(shared)!: ...`) and a `BREAKING CHANGE:` footer.
- Issue refs go in the footer (`Refs: #123`).
- Output only the commit message, no code fences or commentary, when generating one for the Source Control box.

## Process

1. Inspect the staged diff (`git diff --staged`); if nothing is staged, use the working tree diff.
2. Determine the primary intent and map it to a type.
3. Write the subject summarizing the intent in the fewest words.
4. Add a body only when the reason is not obvious from the subject.

## Examples

```
feat(todo-list): add todo list page
fix(shared): prevent button from losing focus ring in dark mode
docs: document fsd layer rules in readme
style(app): format files with prettier
refactor(shared): move shadcn ui components to shared/ui
test(todo-list): add tests for empty state
ci: run lint and build on pull requests
chore: update eslint override path for shared ui
```
