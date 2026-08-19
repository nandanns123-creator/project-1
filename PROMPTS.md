# PROMPTS.md — AI Coding Assistant Interaction Log

## Vibe Version Development

| Prompt / Context | Copilot Suggestion | Decision | Reasoning |
|---|---|---|---|
| Initial specification: "Build a complete task manager app with HTML, CSS, and vanilla JavaScript. Features: add task, mark complete, filter by All/Active/Completed, delete task, error validation, responsive design, gradient UI" | Generated complete working application with all files in one shot — HTML with form inputs, CSS with gradient backgrounds and animations, JS with functional approach using global tasks array | Accepted | Complete feature parity achieved on first generation — faster iteration than traditional development, suitable for prototype validation |
| Prompt for enhancement: "Add XSS protection to the task display function in JavaScript" | Suggested escapeHtml() function using textContent on div to sanitize user input before displaying in DOM | Accepted | Prevents injection attacks, aligns with security best practices, simple and effective implementation |
| Prompt: "Add input validation for task title — check length and empty state, show error message to user" | Suggested validation checking for empty string and length > 100 characters, displaying error in red text element, clearing error on successful add | Accepted | Handles both edge cases appropriately, error messaging is clear, validation length of 100 chars is reasonable for task titles |
| Prompt: "The checkbox toggle is clunky, make it use a custom styled div instead to look more modern" | Suggested keeping native input but styling with CSS appearance: none and custom background colors on :checked state | Modified | Used custom div element instead for better visual control — native input styling is browser-dependent, custom div allows gradient and animation effects |
| Prompt: "Add a statistics footer showing total tasks and completed count" | Suggested updateStats() function calculating and displaying task counts in a formatted string at the bottom | Accepted | Calculation logic is correct, string formatting is readable, provides useful user feedback without cluttering main UI |

## Pair Version Development

| Prompt / Context | Copilot Suggestion | Decision | Reasoning |
|---|---|---|---|
| Context: "React-free vanilla JavaScript, semantic HTML, class-based architecture for maintainability. Create TaskManager class with constructor that initializes DOM references" | Suggested class with constructor method caching DOM elements into instance properties using getElementById, then attaching event listeners | Accepted | Encapsulation pattern is sound, centralizing DOM references prevents global variables, event listener attachment in constructor keeps initialization logic together |
| Prompt: "// Add task form submission — validate empty, reject if title missing, create task object with id/title/completed status, add to this.tasks array, clear input" | Suggested form submission handler with validation, creating object with Date.now() as ID, pushing to array, resetting input value, calling this.render() | Modified | Accepted validation and ID generation, but added additional length check (150 char limit) for better UX, modified to clear error state explicitly before rendering |
| Prompt: "// Render tasks based on currentFilter state — filter array, map to DOM elements, handle empty state display" | Suggested getFilteredTasks() helper method, conditional rendering of empty message, mapping tasks to li elements using createTaskElement() | Accepted | Clean separation of concerns — filtering logic isolated from rendering, empty state handling is appropriate, helper method makes render() more readable |
| Prompt: "// Create task list item with checkbox, label, and delete button — use programmatic DOM creation instead of innerHTML for safety" | Suggested createElement chain: li, input[type=checkbox], label, button — each element configured with attributes and event listeners | Rejected | Initial suggestion used inline HTML strings; switched to programmatic creation for XSS prevention, better maintainability, and consistent event binding pattern |
| Prompt: "// Toggle task completion and update completed property, ensure render updates visual state with class toggle and strikethrough" | Suggested toggleTaskComplete() method modifying task.completed boolean, calling render() which adds/removes 'completed' class affecting CSS styling via text-decoration | Accepted | State mutation is explicit and predictable, re-render pattern ensures UI stays synchronized, CSS class toggle keeps display logic in stylesheet where it belongs |
| Prompt: "// Add ARIA labels and semantic HTML attributes for accessibility — focus management, screen reader support, keyboard navigation" | Suggested role attributes (list/listitem), aria-label on interactive elements, semantic form with proper label association | Modified | Accepted ARIA labels and semantic structure, enhanced focus management with outline-offset in CSS for keyboard users, added explicit focus restoration in input after task add |

---

## Summary of Decisions

### Acceptance Patterns
- **Vibe Version:** 4 Accepted, 1 Modified (80% acceptance rate)
  - Vibe coding generates complete, functional code quickly
  - Modifications were minor tweaks to visual design
  - Each acceptance required understanding the full feature set

- **Pair Version:** 4 Accepted, 2 Modified/Rejected (67% acceptance rate)
  - More critical evaluation during line-by-line development
  - Focused on architectural decisions and security patterns
  - Modifications improved code structure and accessibility

### Key Insight
The pair version required more active decision-making because suggestions came incrementally, one function at a time. The vibe version's bulk generation meant accepting or rejecting the entire feature set, but once accepted, individual components could not be tweaked without regenerating.

**Development Approach Impact:**
- **Vibe:** Fast validation of complete features, harder to improve parts
- **Pair:** Slower but more deliberate architecture, easier to refine incrementally
