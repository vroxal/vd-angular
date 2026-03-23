# @vroxal/vd-angular

Angular component library for the Vroxal design system.

## What This Package Includes

`@vroxal/vd-angular` provides Vroxal UI building blocks for Angular applications, including:

- actions and inputs
- date and time pickers
- dropdowns, tooltips, dialogs, drawers, and confirmation flows
- navigation and layout components
- data display and feedback states

The package is designed to be used together with:

- `@vroxal/vd-tokens`
- `@vroxal/vd-icons`

## Requirements

- Angular 21
- `@angular/cdk`
- `@vroxal/vd-tokens`
- `@vroxal/vd-icons`

## Installation

Install the package and its peer dependencies:

```bash
npm install @vroxal/vd-angular @vroxal/vd-tokens @vroxal/vd-icons @angular/cdk
```

## Required Global Styles

Add the Vroxal tokens, icons, and library stylesheet to your app's global styles.

Example `angular.json` configuration:

```json
{
  "projects": {
    "your-app": {
      "architect": {
        "build": {
          "options": {
            "styles": [
              "node_modules/@vroxal/vd-tokens/dist/index.css",
              "node_modules/@vroxal/vd-icons/dist/vd-icon.css",
              "node_modules/@vroxal/vd-angular/styles/style.css",
              "src/styles.css"
            ]
          }
        }
      }
    }
  }
}
```

Without these styles, tokens, icons, and some shared component styles will be missing.

## Quick Start

Import standalone components from the package root:

```ts
import { Component } from '@angular/core';
import { VdButton, VdInput } from '@vroxal/vd-angular';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [VdButton, VdInput],
  template: `
    <vd-input label="Email" placeholder="Enter your email"></vd-input>
    <vd-button label="Continue"></vd-button>
  `,
})
export class ExampleComponent {}
```

## NgModule Support

If your app still uses NgModules, import the bundled module:

```ts
import { NgModule } from '@angular/core';
import { VdAngularComponentsModule } from '@vroxal/vd-angular';

@NgModule({
  imports: [VdAngularComponentsModule],
})
export class SharedUiModule {}
```

## Overlay Services

Some library features are used through services instead of direct template composition.

### Toast

Add a single toast host near the app shell:

```html
<router-outlet></router-outlet>
<vd-toast></vd-toast>
```

Trigger toasts from any injected service consumer:

```ts
import { Component } from '@angular/core';
import { VdButton, VdToast, VdToastService } from '@vroxal/vd-angular';

@Component({
  selector: 'app-toast-example',
  standalone: true,
  imports: [VdButton, VdToast],
  template: `
    <vd-button label="Show toast" (click)="showToast()"></vd-button>
    <vd-toast></vd-toast>
  `,
})
export class ToastExampleComponent {
  constructor(private readonly toastService: VdToastService) {
    this.toastService.configure({ placement: 'bottom-right', maxStack: 3 });
  }

  showToast(): void {
    this.toastService.show({
      color: 'success',
      title: 'Saved',
      description: 'Your changes were saved successfully.',
    });
  }
}
```

### Dialog

`VdDialogService.open()` renders an Angular `TemplateRef` and resolves a promise with `'primary'`, `'secondary'`, or `'close'`.

```ts
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { VdButton, VdDialogService, VdInput } from '@vroxal/vd-angular';

@Component({
  selector: 'app-dialog-example',
  standalone: true,
  imports: [VdButton, VdInput],
  template: `
    <ng-template #dialogContent>
      <vd-input label="Name" placeholder="Enter name"></vd-input>
    </ng-template>

    <vd-button label="Open dialog" (click)="openDialog()"></vd-button>
  `,
})
export class DialogExampleComponent {
  @ViewChild('dialogContent', { static: true }) dialogContent!: TemplateRef<unknown>;

  constructor(private readonly dialogService: VdDialogService) {}

  openDialog(): void {
    this.dialogService
      .open({
        title: 'Edit Details',
        contentTemplate: this.dialogContent,
        primaryActionLabel: 'Save',
        secondaryActionLabel: 'Cancel',
      })
      .then((result) => {
        if (result === 'primary') {
          // persist changes
        }
      });
  }
}
```

### Drawer

`VdDrawerService.open()` also accepts a `TemplateRef` and resolves `'primary'`, `'secondary'`, or `'close'`.

```ts
this.drawerService.open({
  title: 'Customer Details',
  size: 'md',
  contentTemplate: this.drawerContent,
  primaryActionLabel: 'Save Changes',
  secondaryActionLabel: 'Cancel',
});
```

Available sizes:

- `'sm'`
- `'md'`
- `'lg'`

### Confirmation Dialog

Use `VdConfirmationDialogService` for confirm/cancel flows:

```ts
this.confirmationDialogService.confirm({
  title: 'Delete item?',
  description: 'This action cannot be undone.',
  color: 'error',
  confirmLabel: 'Delete',
  cancelLabel: 'Cancel',
});
```

The returned promise resolves to `'confirm'` or `'cancel'`.

## Import Rules

- Import from `@vroxal/vd-angular` only
- Do not deep-import files from `src/`, `fesm2022/`, or internal folders
- Prefer the standalone component exports unless your app is still module-based

## Available Component Areas

- Actions: button, icon button, icon, badge
- Inputs and selection: input, textarea, select, number input, file input, checkbox, checkbox group, radio button, radio group, switch, verification code input
- Date and time: single date, range date, inline date, date-time, time picker
- Overlays and feedback: tooltip, dropdown, dialog, drawer, confirmation dialog, toast, alert
- Navigation and layout: breadcrumb, navbar, sidebar, accordion, divider, tab
- Data and states: datatable, pagination, progress tracker, empty state, loading state

## Package References

The published package includes usage guidance and the exported API inventory:

- `node_modules/@vroxal/vd-angular/guidelines/COMPONENT_REGISTRY.md`
- `node_modules/@vroxal/vd-angular/guidelines/USAGE_GUIDELINES.md`
- `node_modules/@vroxal/vd-angular/guidelines/component-registry.json`

These files are useful if you want the full selector list and service/component reference beyond the quick-start examples above.

## Development

From the workspace root:

```bash
npm run build:lib
```

Or with Angular CLI:

```bash
ng build angular-components
```

The packaged output is generated in `dist/angular-components`.

## Testing

Run workspace unit tests from the repo root:

```bash
npm test
```

## Publishing

After building:

```bash
cd dist/angular-components
npm publish
```
