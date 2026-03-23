# Angular Component & Documentation Generation Prompt

You are an expert Angular engineer. Your task: create a **standalone Angular component** and a **standalone documentation page** following existing mono-repo conventions.

---

## Inputs

- **Component name** (required)
- **Figma link** (optional)

Rules:

- If Figma link provided → generate component and tokens from Figma.
- If no Figma link → **stop and ask for clarification about the component**.

---

## Step 1: Inspect Existing Structure

- Components: `angular-project/components` → study HTML, SCSS, TS, Inputs/Outputs, reuse of premade components.
- Documentation: `docs` project → use `datatable.page` as reference for page layout, sections, playground, and structure.

Do **not** invent new structures.

---

## Step 2: Component Creation

### Location & Naming

- Folder: `angular-project/components`
- Selector: `vd-componentName`
- Standalone Angular component
- Prefer premade components over custom implementations

### Template

- Follow **BEM class naming** if used in similar components
- Keep markup clean; no unnecessary wrappers

### SCSS

- Follow structure of existing similar components
- Use **nested SCSS** where applicable
- Local, component-scoped CSS variables
- Never use raw values; always use tokens

### Design Tokens (`@vroxal/vd-tokens`)

- Always use tokens.
- **Colors:**
  - If Figma provides tokens → use them
  - Else fallback: `vd-color-text-{{color_semantic}}-{role}`
    - `color_semantic` → default | primary | success | error | warning | info | neutral
    - `role` → primary | secondary | tertiary | on-primary | on-secondary | on-tertiary
  - Backgrounds: primary | secondary | tertiary + hover variants
- Other tokens (spacing, border width, radius, icons): use Figma if available; else reuse from existing components
- If no token found → best-effort fallback and **document assumption**

### Icons

- Always use `<vd-icon>` component
- Pattern: `<vd-icon name="vd-icon-iconName" size="md"></vd-icon>`
- `size` defaults to `md`; override only when needed
- Never inline SVGs

---

## Step 3: Documentation Creation

### Location & Structure

- `docs` project
- Documentation page must be **standalone**

### Page Structure (follow `datatable.page`)

1. Title & Description
2. Component Variations → include **all possible variants**
3. Usage Guidelines → when to use / not use, common cases
4. API Reference → follow existing table structure; include all `@Input()` and `@Output()` properties as per current docs
5. Component Playground → **fully interactive**, inputs/outputs bound

### Styling

- Use existing documentation classes only
- No page-specific styling

---

## Step 4: Post-Creation Registration (Required)

Once the component and its documentation page are created:

- Register the component in the component registry file:
  - `projects/angular-components/component-registry.json`
- Add/update the component entry in:
  - `projects/angular-components/COMPONENT_REGISTRY.md`
- Add/update the component usage section in:
  - `projects/angular-components/USAGE_GUIDELINES.md`

Do not skip these steps.

---

## General Rules

- Follow existing conventions strictly
- Be consistent in naming, spacing, and structure
- Do not invent patterns
- Output must be production-ready
- Document any assumptions (tokens, colors, variants)

---

## Output

- Component files (HTML, SCSS, TS) with proper paths
- Standalone documentation page content with path
- Updated `projects/angular-components/component-registry.json`
- Updated `projects/angular-components/COMPONENT_REGISTRY.md`
- Updated `projects/angular-components/USAGE_GUIDELINES.md`
- Documented assumptions
