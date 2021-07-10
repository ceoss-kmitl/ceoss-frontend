# CEOSS Frontend

## Stack used
```
# React.js
# Typescript
# Axios
```

## Development setup first time
1. Install extension `ESLint`, `Prettier`, `CSS Var Complete`, `SCSS Formatter`
2. Run command `yarn`
3. Run command `yarn dev`

## Project structure
**NOTE :** use absolute path only
```bash
src/
 |- components/ # Global component
 |   |- SomeComponent/
 |       |- index.tsx
 |       |- style.module.css
 |       |- helper.ts (optional)
 |
 |- pages/ # All pages
 |   |- SomePage/
 |       |- index.tsx
 |       |- style.module.css
 |       |- helpter.ts (optional)
 |       |- SomeLocalComponent.tsx (optional)
 |
 |- services/ # Business logic
 |   |- something.ts
 |
 |- styles/ # Global style
 |- App.tsx # Routing and Context here
```