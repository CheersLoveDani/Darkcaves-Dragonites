# Copilot Custom Instructions for Darkcaves & Dragonites

## Terminal and Dev Server Practices

- Always check if the Tauri dev environment is already running in the current terminal before starting it.
- Never open a new terminal for `pnpm run tauri dev`—always use the current terminal session.
- Always `cd` into the project root before running any commands.

## Project Structure and Pathing

- All scripts, configs, and commands should assume the project root is `E:/development/Darkcaves-Dragonites`.
- Do not use any `tauri-app/` prefix in paths, imports, or documentation.
- All config and import paths should be relative to the root, e.g., `src/components`, `src-tauri/src`.

## Coding Practices

- Use instruction files (`.github/copilot-instructions.md` and `.instructions.md`) to define and follow custom project rules.
- If both types of instruction files exist, follow all instructions and avoid conflicts.
- Never replace an existing file with a new file—always edit and override the existing file content instead.

## README and Progress Tracking

- Always refer back to the README.md when working on features or tasks.
- Update the README.md progress markers whenever you complete a task or feature.
- Progress marker conventions:
  - `[x]` means the task is complete
  - `[~]` means the task is in progress
  - `[ ]` means the task is not started
- When completing a phase or major milestone, update the README to reflect current status and next steps.

## Version Management

- Update the package.json version number when completing significant milestones or phases:
  - Patch version (0.1.0 → 0.1.1) for bug fixes and small improvements
  - Minor version (0.1.0 → 0.2.0) for new features and completed phases
  - Major version (0.1.0 → 1.0.0) for breaking changes or major releases
- When the VersionDisplay component is implemented, ensure it shows the current version from package.json
- Update both package.json and any on-screen version displays simultaneously to keep them in sync

## Communication

- If the user provides a new instruction or coding preference, update this file or create a relevant `.instructions.md` as needed.

---

_Last updated: 2025-05-28_
