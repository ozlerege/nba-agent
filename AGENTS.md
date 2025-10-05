# Repository Guidelines

## Project Structure & Module Organization

- `app/`: Next.js App Router pages; global styles live in `globals.css`.
- `components/`: shared UI primitives; `components/ui/` mirrors shadcn PascalCase exports.
- `lib/`: API clients (`lib/api`), enums, formatters, and helpers; keep shared network logic here.
- `hooks/`: framework-agnostic reusable hooks such as `use-mobile`.
- `backend/`: FastAPI service with routers in `backend/routers/` and models in `backend/routers/models.py`.
- `public/`: static assets served by Next.js; exclude generated bundles.

### Key Directories

- `lib/formatters.ts`: All utility functions for data formatting
- `lib/enums.ts`: Single source of truth for constants, enums, and team metadata
- `components/ui/`: Reusable UI components following shadcn patterns

## Build, Test, and Development Commands

- `pnpm install`: sync web dependencies (use pnpm to respect the lockfile).
- `pnpm dev`: start Next.js with Turbopack on `http://localhost:3000`.
- `pnpm build` then `pnpm start`: build and serve the production bundle before release.
- `pnpm lint`: run ESLint across app, components, hooks, and lib.
- `python -m venv .venv && pip install -r backend/requirements.txt`: install backend dependencies inside a virtualenv.
- `uvicorn backend.main:app --reload --port 8000`: run FastAPI locally; adjust `NBA_API_ALLOWED_ORIGINS` as needed.

## Coding Style & Naming Conventions

- TypeScript uses 2-space indentation, PascalCase component files, and camelCase functions or hooks (`useExample`).
- Keep Tailwind classes beside the JSX they style; avoid inline style objects.
- Prefer named exports and absolute imports via the `@/` alias.
- Backend modules follow PEP 8 with 4-space indentation, snake_case functions, and PascalCase Pydantic models.
- Run `pnpm lint` before commits and accept ESLint autofix output instead of manual overrides.

### Code Quality Standards

- **DRY Principle**: Extract reusable components to `components/ui/` when patterns repeat
- **Single Source of Truth**: Keep team metadata in `lib/enums.ts`, not duplicated in backend
- **Consistent API Format**: Backend returns camelCase to match frontend TypeScript interfaces
- **Component Composition**: Use `DataCard`, `HeadshotImage`, `EmptyState` for consistent UI patterns
- **Type Safety**: Always define proper TypeScript interfaces, avoid `any` types

## Testing Guidelines

- No automated suite is committed yet; linting and manual review are the current checks.
- Add frontend specs with Vitest + React Testing Library under `__tests__/` beside the component.
- Add backend Pytest cases under `backend/tests/` using `TestClient`; aim for ≥80% coverage on new modules and document fixtures briefly in the PR.

## Commit & Pull Request Guidelines

- Use imperative, present-tense commit subjects (`Add players table`) with optional scopes (`feat:`).
- Reference related issues (`#42`) in commits or PR descriptions when relevant.
- PRs must summarize changes, call out schema or API updates, and attach screenshots or curl snippets for UI or API work.
- Verify `pnpm build`, `pnpm lint`, and backend startup locally before review; note any skipped steps.

## Security & Configuration Tips

- Keep secrets in an untracked `.env`; never check in credentials or long-lived tokens.
- Align `NBA_API_ALLOWED_ORIGINS` across frontend and backend deployments and redact env values when sharing logs.

## AI Assistant Guidelines

### Code Quality Focus Areas

1. **Identify Duplication**: Look for repeated patterns in UI components, API calls, or data formatting
2. **Extract Reusable Components**: Create components in `components/ui/` when patterns appear 2+ times
3. **Maintain Consistency**: Ensure backend API responses match frontend TypeScript interfaces
4. **Follow Established Patterns**: Use existing components like `DataCard`, `SeasonFilter`, `HeadshotImage`

### Common Refactoring Opportunities

- **Table Components**: Extract common table patterns with consistent styling
- **Filter Components**: Create reusable filters for seasons, months, etc.
- **Data Display**: Use `DataCard` for consistent loading/error states
- **Empty States**: Use `EmptyState` component for consistent messaging

### File Organization Rules

- **Utility Functions**: Place in `lib/formatters.ts` (not `components/functions.ts`)
- **Constants**: Keep in `lib/enums.ts` as single source of truth
- **API Types**: Define in `lib/api/types.ts` with camelCase properties
- **Reusable UI**: Create in `components/ui/` following shadcn patterns

### Code Review Checklist

- [ ] No duplicated code patterns
- [ ] Consistent API response format (camelCase)
- [ ] Proper TypeScript interfaces defined
- [ ] Reusable components extracted to `components/ui/`
- [ ] Team metadata sourced from `lib/enums.ts` only
- [ ] ESLint passes without errors
