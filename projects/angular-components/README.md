# @vroxal/vd-angular

Angular component library for the Vroxal Design.

## Package Scope

This package contains reusable UI primitives, form controls, overlays, navigation components, and feedback patterns used across Vroxal Angular applications.

The source of truth for exported components and services lives in:

- `src/public-api.ts`
- `guidelines/COMPONENT_REGISTRY.md`
- `guidelines/USAGE_GUIDELINES.md`

## Installation

```bash
npm install @vroxal/vd-angular @vroxal/vd-tokens @vroxal/vd-icons
```

Required Angular peer dependencies:

- `@angular/core`
- `@angular/common`
- `@angular/cdk`

## Usage

Import standalone components from the package root:

```ts
import { Component } from '@angular/core';
import { VdButton, VdInput } from '@vroxal/vd-angular';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [VdButton, VdInput],
  template: `
    <vd-input label="Email"></vd-input>
    <vd-button label="Continue"></vd-button>
  `,
})
export class ExampleComponent {}
```

If your application still uses NgModules, use the bundled module:

```ts
import { NgModule } from '@angular/core';
import { VdAngularComponentsModule } from '@vroxal/vd-angular';

@NgModule({
  imports: [VdAngularComponentsModule],
})
export class ExampleModule {}
```

## Available Component Areas

- Actions: button, icon button, icon, badge
- Inputs and selection: input, textarea, select, number input, file input, checkbox, radio, switch, verification code input
- Date and time: single date, range date, inline date, date-time, time picker
- Overlays and feedback: tooltip, dropdown, dialog, drawer, confirmation dialog, toast, alert
- Navigation and layout: breadcrumb, navbar, sidebar, accordion, divider, tab
- Data and states: datatable, pagination, progress tracker, empty state, loading state

For the full selector and symbol inventory, read `guidelines/COMPONENT_REGISTRY.md`.

## Development

From the workspace root, build the library with:

```bash
npm run build:lib
```

Or directly with Angular CLI:

```bash
ng build angular-components
```

The packaged output is generated in `dist/angular-components`.

## Testing

Run the workspace unit tests from the repo root:

```bash
npm test
```

## Publishing

After building, publish from the generated package directory:

```bash
cd dist/angular-components
npm publish
```

## Guidance

- Import only from `@vroxal/vd-angular`
- Prefer library components over building custom UI when an equivalent component already exists
- Use the provided service APIs for toast, dialog, drawer, and confirmation flows
- Avoid deep imports and style overrides
