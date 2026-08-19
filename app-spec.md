# Task Manager App Specification

## Overview
Build a personal task manager with core features: add tasks, mark them complete, and filter by status. The same feature set will be built twice using two different AI approaches.

## Required Features

### 1. Add a Task
- Input field for task title
- Button to add the task
- Tasks appear in the list immediately after being added
- Empty input validation (cannot add empty tasks)

### 2. Mark Task Complete
- Checkbox or toggle next to each task
- Visual indication when a task is completed (e.g., strikethrough, different color)
- State persists during the session

### 3. Filter by Status
Three filter options:
- **All** - Show all tasks
- **Active** - Show only incomplete tasks
- **Completed** - Show only completed tasks

Only one filter can be active at a time.

### 4. Clean, Usable UI
- Tasks displayed in a clear list format
- Filter buttons clearly visible and indicate which is active
- Responsive layout (works on desktop)
- No styling errors or broken elements

## Technical Requirements

### Vibe Version (/vibe-version)
- Built using a "vibe coding tool" (Lovable, v0, Google AI Studio Build, or similar)
- Natural language prompt generates the complete application
- Export includes all necessary files for deployment
- Document the prompt used and any modifications made

### Pair Version (/pair-version)
- Built using AI pair programming (GitHub Copilot, Cursor, or similar)
- File-by-file development with inline AI suggestions
- Iterate through your natural suggestions and acceptances
- Document the process and decisions made

## Testing Checklist
Both versions must pass:
- [ ] Can add a task with title
- [ ] Tasks appear in the list immediately
- [ ] Cannot add empty tasks (validation works)
- [ ] Checkbox/toggle marks tasks complete
- [ ] Completed tasks show visual indicator
- [ ] "All" filter shows all tasks
- [ ] "Active" filter shows only incomplete tasks
- [ ] "Completed" filter shows only completed tasks
- [ ] Filter state persists as you switch filters
- [ ] UI is clean and usable
- [ ] No console errors
- [ ] No broken elements

## Deployment
- Deploy both versions live (GitHub Pages, Vercel, Netlify, or similar)
- Provide working URLs in final comparison document

## Comparison Document
In the main README, compare across these five dimensions:

1. **Development Speed** - Time from start to working app
2. **Code Quality** - Readability, structure, maintainability
3. **Editability** - How easy is it to modify after generation?
4. **UI/UX Polish** - Aesthetics and usability without custom styling
5. **Scalability** - How well would each approach scale to more features?

## File Structure
```
project-1/
├── app-spec.md                 (this file)
├── README.md                   (final comparison and analysis)
├── comparison-notes.md         (detailed notes during development)
├── vibe-version/               (fully generated app)
│   ├── index.html
│   ├── style.css
│   ├── script.js
│   └── (other files as needed)
├── pair-version/               (pair-programmed app)
│   ├── index.html
│   ├── style.css
│   ├── script.js
│   └── (other files as needed)
└── videos/
    └── demo.mp4                (optional: demo video)
```

## Notes
- Focus on the exact feature set. Do not add features beyond what's specified.
- Both versions should look and function similarly at the end.
- Document your honest findings, including frustrations and pleasant surprises with each tool.
- This is not a competition — it's a genuine comparison of workflows.
