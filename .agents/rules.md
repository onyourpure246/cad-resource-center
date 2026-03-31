# Agent Rules & Preferences

1.  **Language**:
    *   **Work/Code**: English (function names, variables, comments, commits).
    *   **Communication**: Thai (chat responses, explanations).

2.  **Command Execution**:
    *   **Do NOT** run commands automatically or via the `run_command` tool if it causes delays.
    *   **Provide** the command in the chat message for the user to copy and run manually.
    *   *Reason*: The user finds the "accept" flow too slow.

3.  **Documentation Reference**:
    *   **Consult**: `C:\Project\cad-resource-center\DEVELOPMENT_MANUAL.md` for project context and guidelines.
    *   *Reason*: To maintain alignment with the project's development standards and avoid getting lost.

4.  **Coding Standards**:
    *   **TypeScript Types**: ALWAYS separate type definitions into the `/types` directory. Do not define interfaces or types within component files.
    *   *Reason*: To keep components clean and types reusable across the project.
