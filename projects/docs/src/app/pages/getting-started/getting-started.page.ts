import { Component } from '@angular/core';
import CodeContainer from '../../components/code-container/code-container.component';
import DocPageHeader from '../../components/doc-page-header/doc-page-header.component';

@Component({
  selector: 'app-getting-started',
  standalone: true,
  imports: [CodeContainer, DocPageHeader],
  templateUrl: './getting-started.page.html',
  styleUrl: './getting-started.page.scss',
})
export default class GettingStartedPage {
  installSnippet = `npm install @vroxal/vd-tokens @vroxal/vd-icons @vroxal/vd-angular @angular/cdk`;

  stylesSnippet = `
{
  "schematics": {
    "@schematics/angular:component": {
      "style": "scss"
    }
  },
  "projects": {
    "test-app": {
      "architect": {
        "build": {
          "options": {
            "styles": [
              "node_modules/@vroxal/vd-tokens/dist/index.css",
              "node_modules/@vroxal/vd-icons/dist/vd-icons.css",
              "node_modules/@vroxal/vd-angular/styles/style.css"
              "src/styles.css",
            ]
          },
        },
      }
    }
  }
}`;
  importSnippet = `import { VdIconButton } from '@vroxal/vd-angular';`;

  usageSnippet = `<vd-icon-button
  icon="vd-icon-placeholder"
  color="primary"
  variant="solid"
></vd-icon-button>`;

  // agenticAiGovernanceSnippet = `# VD Design System Governance\`
  agenticAiGovernanceSnippet = `# Vroxal Design System Governance

This project uses the **Vroxal Design System (VD)** as the single source of truth
for all UI decisions: components, tokens, typography, icons, and layout scales.

Primary component library:

- \`node_modules/@vroxal/vd-angular/\`

Supporting libraries:

- \`node_modules/@vroxal/vd-tokens/\`
- \`node_modules/@vroxal/vd-icons/\`

Authoritative documentation sources (must be consulted before implementation):

1. **Component usage rules**  
   \`node_modules/@vroxal/vd-angular/USAGE_GUIDELINES.md\`

2. **Component registry (human readable)**  
   \`node_modules/@vroxal/vd-angular/COMPONENT_REGISTRY.md\`

3. **Component registry (machine readable)**  
   \`node_modules/@vroxal/vd-angular/component-registry.json\`

4. **Typography rules**  
   \`node_modules/@vroxal/vd-tokens/TYPOGRAPHY_GUIDELINES.md\`

5. **Color rules**  
   \`node_modules/@vroxal/vd-tokens/COLOR_GUIDELINES.md\`

6. **Scale rules**  
   \`node_modules/@vroxal/vd-tokens/SCALE_GUIDELINES.md\`

## Mandatory UI Implementation Workflow

Before implementing **any** UI element:

1. **Identify the UI requirement**  
   Example: primary action button, form field, error toast, navigation tabs, filter chips, etc.

2. **Check the VD component registry**

   - Use \`COMPONENT_REGISTRY.md\` (for humans) or \`component-registry.json\` (for tooling).
   - Search by **semantic intent** (action, input, feedback, navigation, etc.), not by visual shape.

3. **Use an existing VD component if available**

   - If a suitable component exists, you **must** use it.
   - Follow the usage patterns defined in \`USAGE_GUIDELINES.md\` for that component.
   - Do not replicate the component with custom HTML/CSS.

4. **Rely on built-in tokens inside components**

   - Typography, color, spacing, borders, and icon sizing are already applied inside VD components.
   - You **do not** need to (and must not) override those styles unless explicitly allowed by the guidelines.

5. **Icon usage inside components**

   - If a component (e.g., button, input, tab) exposes an icon input/prop, pass the icon via that API.
   - Do **not** add a separate \`VdIcon\` alongside that component just to show an icon.

6. **If no VD component exists**

   - Explicitly record: \`No VD component available for this requirement.\`
   - Implement a **custom solution** using:
     - VD typography rules for all text.
     - VD color tokens for text, backgrounds, borders, and icons.
     - VD scale tokens for spacing, border radius, border widths, and icon sizes.
   - Document why existing components are not sufficient and which registry entries were checked.

## Strict Prohibitions

Do **not**:

- Create custom Angular components that duplicate existing VD component behavior.
- Style raw HTML elements to mimic VD components when an VD component exists.
- Use external UI libraries if an VD equivalent exists.
- Hardcode any design values:
  - Colors (including brand colors, black, white).
  - Spacing (margin, padding, gaps).
  - Typography (font-size, line-height, font-weight, letter-spacing).
  - Border radius, border width, shadows.
- Introduce custom typography scales or ad-hoc UI style systems.
- Use custom SVG icons when an equivalent VD icon exists.

If you hit a limitation, propose an extension to VD instead of bypassing it.

## Decision Checklist

When UI is required, follow this checklist:

1. **Check component registry**  
   - Confirm whether an VD component exists for your requirement.

2. **Match use case and intent**  
   - Pick the component whose documented intent matches your use case (e.g., actions, inputs, feedback, overlays).

3. **Follow documented usage**  
   - Use the examples and API guidance in \`USAGE_GUIDELINES.md\`.
   - Preserve built-in accessibility, keyboard handling, and ARIA semantics.

4. **Apply tokens for custom layouts only where needed**

   - Typography: from \`TYPOGRAPHY_GUIDELINES.md\`.
   - Colors: from \`COLOR_GUIDELINES.md\`.
   - Scale (spacing, borders, radii, icon sizes): from \`SCALE_GUIDELINES.md\`.

5. **Use VD icons if needed**

   - Use the VD icon library and \`VdIcon\` component (see icon section below).

6. **Document decisions**

   - Component chosen (or that none exists).
   - Reason for selection.
   - Guideline references.
   - Tokens used (typography, color, scale).
   - Icon usage (if any).

## Priority Order

When making any UI decision, follow this priority:

1. **VD component rules** (registry + \`USAGE_GUIDELINES.md\`)
2. **VD tokens** (typography, colors, scale)
3. **VD icons** (\`@vroxal/vd-icons\`)
4. **Project-specific conventions**  
   - Only when VD does not cover the requirement and the deviation is explicitly documented.

## Typography Governance

Typography is controlled exclusively by the \`@vroxal/vd-tokens\` package using the VD typography scale.[web:2][web:3]

Authoritative source:

- \`node_modules/@vroxal/vd-tokens/TYPOGRAPHY_GUIDELINES.md\`

### Mandatory Typography Workflow

When rendering **any** text:

1. **Identify the semantic meaning of the text**
2. **Select the correct typography level from the VD scale**
3. **Apply semantic HTML element OR typography utility class**
4. **Use VD token-driven styles only**

### Typography Strict Prohibitions

Do **not**:

- Hardcode \`font-size\`, \`line-height\`, \`font-weight\`, or \`letter-spacing\`.
- Use inline typography styling (e.g. \`style="font-size: 14px"\`).
- Create custom text scales or additional “heading levels”.
- Use arbitrary heading sizes or skip hierarchy arbitrarily.
- Use multiple \`h1\` elements per page hero context.

### Typography Selection Priority

1. Semantic HTML mapping (preferred).
2. Typography utility class.
3. Token-based styling (only if required, and still aligned with the defined scale).

### Required Typography Declaration

When rendering non-trivial or structural text (page layout, major sections), record:

- **Typography level selected**  
- **Semantic role**  
- **Reason for selection**

## Color and Scale Governance

- Colors, spacing, border widths, radii, and icon sizes **must always use VD tokens**.
- Authoritative sources:
  - \`COLOR_GUIDELINES.md\` for color tokens.
  - \`SCALE_GUIDELINES.md\` for spacing, border radius, border width, and icon sizes.
Never use raw numbers (e.g. \`8px\`, \`1rem\`) where a token exists.

## Icon Governance

- All icons must come from \`@vroxal/vd-icons\`.
- Rendering is handled via CSS and font/icon infrastructure under the hood.

**Usage:**

- Icons must be rendered via the \`VdIcon\` component (or equivalent) from the VD component library.
- Authoritative usage guide:
  - \`node_modules/@vroxal/vd-angular/USAGE_GUIDELINES.md\` → **VdIcon** section.
- Typography, color, and other design tokens are already applied within \`VdIcon\`.
  - You **do not** need to override or re-apply tokens for standard icon usage.

**Icons inside other components:**

- If a component (e.g., button, input, tab) has an icon input/prop:
  - Pass the icon via that property.
  - Do **not** wrap or pair it with a separate \`VdIcon\` next to the component.

**Missing icons:**

- If an icon does not exist in \`@vroxal/vd-icons\`, explicitly record:  
  \`Icon not found in @vroxal/vd-icons: "<concept>"\`
- Coordinate with design/system maintainers before introducing new icons or fonts.

## Required Implementation Declaration

For each **significant** UI element or feature, record:

- **Selected component** (from VD) or “No VD component available”.
- **Reason for selection** (why this component or why custom).
- **Guideline reference** (files/sections used, e.g. USAGE, TYPOGRAPHY, COLOR, SCALE).
- **Tokens used**:
  - Typography levels/classes.
  - Color tokens.
  - Scale tokens (spacing, borders, radii, icon sizes).
- **Icon usage** (if any):
  - Icon name from \`@vroxal/vd-icons\`.
  - Where used (standalone \`VdIcon\` or via component icon prop).
`;
}
