# Vroxal Design - Angular Components

## Project Architecture

This is an **Angular 21** monorepo with two projects:

- **`projects/angular-components/`** - Standalone component library (published to npm as `vd-angular`)
- **`projects/docs/`** - Documentation site showcasing the components

All components are **standalone** (no NgModules required for consumers). The library also exports a legacy `AngularComponentsModule` for backward compatibility.

## Component Development Patterns

### Component Structure

All Vroxal components follow this structure:

```typescript
@Component({
  selector: 'vd-[name]',           // Always prefixed with 'vd-'
  standalone: true,                  // REQUIRED - all components are standalone
  imports: [CommonModule, ...],      // Import dependencies directly
  templateUrl: './vd-[name].component.html',
  styleUrls: ['./vd-[name].component.scss']
})
export class Vd[Name] { }          // PascalCase class name without 'Component' suffix
```

### Design Token Integration

- **Never hardcode colors, spacing, or font sizes**
- Use CSS custom properties from `@vroxal/vd-tokens`:
  ```scss
  color: var(--vd-color-text-primary-primary);
  padding: var(--vd-scale-spacing-400);
  border-radius: var(--vd-scale-border-radius-md);
  ```
- Design tokens adapt to theme (`data-theme="light|dark"`) and brand (`data-brand="consumer|business|corporate"`) automatically

### Icon System

Icons use **JSON-driven rendering** from `@vroxal/vd-icons`:

- Import `iconsJson` and map codepoints to unicode characters
- Icons render via `data-icon` attribute + `attr()` in CSS
- Icon names follow pattern: `vd-icon-[name]` (e.g., `vd-icon-settings`)
- Always include `vd-icon` base class using `[ngClass]` instead of `[class]` to preserve base styles

### Component Actions & Event Binding

When defining action arrays with callbacks (e.g., `VdDatatableAction[]`):

- **Initialize in `ngOnInit()`** - not at class declaration
- **Use `.bind(this)`** for method references to preserve component context
- Example:

  ```typescript
  actions: VdDatatableAction[] = [];

  ngOnInit() {
    this.actions = [{
      title: 'Edit',
      action: this.onEdit.bind(this),
      visible: this.isVisible.bind(this)
    }];
  }
  ```

## Key Commands

```bash
npm run start:docs       # Dev server for documentation site (port 4200)
npm run build:lib        # Build component library (outputs to dist/)
npm run build:docs       # Build documentation site
ng test                  # Run Vitest unit tests
```

## Documentation Page Pattern

Doc pages follow this structure:

- Located in `projects/docs/src/app/pages/[category]/[component-name]/`
- Use `default export` for lazy-loaded routes
- Import from `vd-angular` (not relative paths)
- Code snippets stored as string properties for `CodeContainer` component
- Use `@ViewChild` with templates for custom table cells in examples

## Critical Files

- **`projects/angular-components/src/public-api.ts`** - Library exports (update when adding components)
- **`projects/docs/src/app/app.routes.ts`** - Route definitions with lazy loading
- **`projects/docs/src/app/shared/navigation/navigation.config.ts`** - Sidebar navigation
- **`angular.json`** - Multi-project config with shared design token/icon dependencies
- **`tsconfig.lib.json`** - Must have `resolveJsonModule: true` for icon JSON imports

## Theming & Branding

Theme and brand switching is handled via HTML attributes:

```html
<html data-theme="light|dark" data-brand="consumer|business|corporate"></html>
```

- Semantic color tokens automatically adapt (e.g., `--vd-color-background-default-primary`)
- Brand changes font family: Consumer→Poppins, Business→Avenir Next, Corporate→Inter
- Toggle logic in `projects/docs/src/app/core/navbar/navbar.component.ts`

## Common Pitfalls

1. **Icon rendering issues** - Ensure `[ngClass]="[name, sizeClass]"` to preserve `vd-icon` base class
2. **Action buttons not visible** - Initialize action arrays in `ngOnInit()` with proper `.bind(this)`
3. **Missing design tokens** - Check `angular.json` styles array includes token/icon CSS
4. **Import errors** - Use `vd-angular-components` package name, not relative paths to library
5. **JSON imports failing** - Ensure `tsconfig.lib.json` has `resolveJsonModule: true`

## Dependencies

Core design system packages (must be installed together):

- `@vroxal/vd-tokens` - Design tokens (colors, spacing, typography)
- `@vroxal/vd-icons` - Icon font with JSON codepoint mapping
- `@vroxal/vd-angular` - This component library
