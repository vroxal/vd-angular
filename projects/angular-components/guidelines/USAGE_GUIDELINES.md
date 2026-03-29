# Vroxal Design Usage Guidelines

This guide is for agentic AI and developers using `@vroxal/vd-angular`.

## Source of Truth

- Package import path: `@vroxal/vd-angular`
- Full selector inventory with all the available inputs and outputs: `projects/angular-components/component-registry.json`

## Required Rules

1. If a component exists in the registry, use it instead of building custom UI.
2. Import only from the package root (`@vroxal/vd-angular`).
3. Do not override the styles of the components.
4. Preserve built-in accessibility behavior. Do not override focus handling, keyboard semantics, or ARIA semantics provided by components.
5. For overlays and transient feedback, prefer service-driven APIs where provided:
   - `VdToastService` with `<vd-toast>`
   - `VdDialogService`
   - `VdDrawerService`
   - `VdConfirmationDialogService`

## Selection Guide By Intent

- Actions: `vd-button`, `vd-icon-button`
- Form input: `vd-input`, `vd-search`, `vd-textarea`, `vd-select`, `vd-number-input`, `vd-file-input`, `vd-verification-code-input`
- Choice controls: `vd-checkbox`, `vd-checkbox-group`, `vd-radio-button`, `vd-radio-group`, `vd-selection-card`, `vd-selection-card-group`, `vd-switch`, `vd-tab`
- Date and time: `vd-date-time-picker`, `vd-single-date-picker`, `vd-range-date-picker`, `vd-time-picker`, `vd-single-date-inline`, `vd-range-date-inline`
- Navigation: `vd-breadcrumb`, `vd-navbar`, `vd-sidebar`, `vd-pagination`
- Data display and structure: `vd-datatable`, `vd-accordion`, `vd-divider`, `vd-icon`
- Feedback and status: `vd-alert`, `vd-toast`, `vd-badge`, `vd-progress-tracker`, `vd-empty-state`, `vd-loading-state`
- Menus, hints, and overlays: `vd-dropdown`, `vd-dropdown-item`, `vd-dropdown-item-link`, `vd-dropdown-item-divider`, `vd-dropdown-item-group`, `vd-tooltip`, `[vdTooltip]`, `vd-dialog`, `vd-drawer`, `vd-confirmation-dialog`

## Feedback Component Notes

- `vd-empty-state`
  - Use for empty data views, first-use screens, or when guiding users to a next step.
  - Do not use for loading flows or transient progress.
- `vd-loading-state`
  - Use while async content is being fetched or prepared.
  - Keep messaging concise (`title` required, optional `description`).
  - Do not use for empty-result or error messaging.

## Import Patterns

Preferred (standalone imports):

```ts
import { VdButton, VdInput } from '@vroxal/vd-angular';
```

NgModule bulk import option:

```ts
import { AngularComponentsModule } from '@vroxal/vd-angular';
```

## When No Component Exists

When no suitable Vroxal Design component exists, state this explicitly:

`No Vroxal Design component available for this requirement.`

Then build a custom solution using Vroxal Design tokens and document why the existing component set was insufficient.

## Pre-Output Checklist

- Selector/API exists in `component-registry.json`
- Imports come from `@vroxal/vd-angular`
- No deep imports
- Service APIs used for modal/drawer/toast flows when applicable
