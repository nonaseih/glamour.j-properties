# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server (Vite HMR)
npm run build     # Production build → dist/
npm run preview   # Preview the production build locally
npm run lint      # Run ESLint across all .js/.jsx files
```

No test runner is configured yet.

## Stack

- **React 19** (JSX, no TypeScript — `.jsx` files throughout)
- **Vite 8** with `@vitejs/plugin-react` (Babel/Oxc transform)
- **ESLint** with `eslint-plugin-react-hooks` and `eslint-plugin-react-refresh`

## Architecture

The project is at its initial scaffold stage. Entry point is [src/main.jsx](src/main.jsx), which mounts `<App />` into `#root` in [index.html](index.html). [src/App.jsx](src/App.jsx) is currently empty — all feature work begins there.

Global styles live in [src/index.css](src/index.css) (imported in `main.jsx`) and component-scoped styles in [src/App.css](src/App.css) (imported in `App.jsx`). Static assets go in [public/](public/).

No routing, state management, or component library has been added yet.
