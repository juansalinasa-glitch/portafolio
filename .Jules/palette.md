## 2026-09-05 - Icon-Only Button Accessibility
**Learning:** Icon-only buttons across this codebase (like close buttons in modals and submit buttons in terminal views) frequently lack proper ARIA labels and clear focus states, making them challenging for screen reader and keyboard-only users.
**Action:** Always verify icon-only buttons have `aria-label`, `title` for mouse users, and explicit `focus-visible` classes to ensure proper interaction for all users without breaking standard hover states.
