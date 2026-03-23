# Vroxal Component Registry

Human-readable registry of the exported API in `@vroxal/vd-angular`.

## Source of Truth

- Package: `@vroxal/vd-angular`

## Actions and Display

| Component   | Selector         | Angular Symbol | Primary Usage                        |
| ----------- | ---------------- | -------------- | ------------------------------------ |
| Button      | `vd-button`      | `VdButton`     | Primary and secondary actions        |
| Icon Button | `vd-icon-button` | `VdIconButton` | Icon-only actions                    |
| Icon        | `vd-icon`        | `VdIcon`       | Contextual/decorative icon rendering |
| Badge       | `vd-badge`       | `VdBadge`      | Compact status labels and counts     |

## Inputs and Selection

| Component               | Selector                     | Angular Symbol            | Primary Usage                     |
| ----------------------- | ---------------------------- | ------------------------- | --------------------------------- |
| Input                   | `vd-input`                   | `VdInput`                 | Single-line text input            |
| Textarea                | `vd-textarea`                | `VdTextarea`              | Multi-line text input             |
| Select                  | `vd-select`                  | `VdSelect`                | Single-option selection from list |
| Number Input            | `vd-number-input`            | `VdNumberInput`           | Numeric entry                     |
| File Input              | `vd-file-input`              | `VdFileInput`             | File selection/upload input       |
| Verification Code Input | `vd-verification-code-input` | `VdVerificationCodeInput` | OTP/verification code entry       |
| Checkbox                | `vd-checkbox`                | `VdCheckbox`              | Independent true/false choice     |
| Checkbox Group          | `vd-checkbox-group`          | `VdCheckboxGroup`         | Grouped multi-select options      |
| Radio Button            | `vd-radio-button`            | `VdRadioButton`           | Single option item in radio sets  |
| Radio Group             | `vd-radio-group`             | `VdRadioGroup`            | Exclusive single-choice selection |
| Switch                  | `vd-switch`                  | `VdSwitch`                | On/off settings toggles           |
| Tab                     | `vd-tab`                     | `VdTab`                   | Switching sibling content views   |

## Date and Time

| Component          | Selector                | Angular Symbol       | Primary Usage                              |
| ------------------ | ----------------------- | -------------------- | ------------------------------------------ |
| Date Time Picker   | `vd-date-time-picker`   | `VdDateTimePicker`   | Unified date/date-range with optional time |
| Single Date Picker | `vd-single-date-picker` | `VdSingleDatePicker` | Single date selection                      |
| Range Date Picker  | `vd-range-date-picker`  | `VdRangeDatePicker`  | Start/end date selection                   |
| Time Picker        | `vd-time-picker`        | `VdTimePicker`       | Time-only selection                        |
| Single Date Inline | `vd-single-date-inline` | `VdSingleDateInline` | Inline always-visible single calendar      |
| Range Date Inline  | `vd-range-date-inline`  | `VdRangeDateInline`  | Inline always-visible range calendar       |

## Overlay and Menus

| Component             | Selector                   | Angular Symbol          | Primary Usage                           |
| --------------------- | -------------------------- | ----------------------- | --------------------------------------- |
| Dropdown              | `vd-dropdown`              | `VdDropdown`            | Context/action menu container           |
| Dropdown Item         | `vd-dropdown-item`         | `VdDropdownItem`        | Action row in dropdown                  |
| Dropdown Item Link    | `vd-dropdown-item-link`    | `VdDropdownItemLink`    | Link row in dropdown                    |
| Dropdown Item Divider | `vd-dropdown-item-divider` | `VdDropdownItemDivider` | Visual separator in dropdown            |
| Dropdown Item Group   | `vd-dropdown-item-group`   | `VdDropdownItemGroup`   | Section grouping in dropdown            |
| Tooltip               | `vd-tooltip`               | `VdTooltip`             | Tooltip host/content rendering          |
| Tooltip Directive     | `[vdTooltip]`              | `VdTooltipDirective`    | Attach tooltip to existing element      |
| Dialog                | `vd-dialog`                | `VdDialog`              | Generic modal dialog                    |
| Drawer                | `vd-drawer`                | `VdDrawer`              | Side-panel workflows                    |
| Confirmation Dialog   | `vd-confirmation-dialog`   | `VdConfirmationDialog`  | Confirm destructive/high-impact actions |

## Navigation and Layout

| Component  | Selector        | Angular Symbol | Primary Usage                      |
| ---------- | --------------- | -------------- | ---------------------------------- |
| Breadcrumb | `vd-breadcrumb` | `VdBreadcrumb` | Hierarchical path navigation       |
| Navbar     | `vd-navbar`     | `VdNavbar`     | Top-level app/page navigation bar  |
| Sidebar    | `vd-sidebar`    | `VdSidebar`    | Persistent side navigation         |
| Accordion  | `vd-accordion`  | `VdAccordion`  | Collapsible sections               |
| Divider    | `vd-divider`    | `VdDivider`    | Visual separation between sections |

## Data and Feedback

| Component        | Selector              | Angular Symbol      | Primary Usage                |
| ---------------- | --------------------- | ------------------- | ---------------------------- |
| Datatable        | `vd-datatable`        | `VdDatatable`       | Structured tabular data      |
| Pagination       | `vd-pagination`       | `VdPagination`      | Page navigation for datasets |
| Alert            | `vd-alert`            | `VdAlert`           | Inline status messaging      |
| Toast            | `vd-toast`            | `VdToast`           | Transient notification host  |
| Progress Tracker | `vd-progress-tracker` | `VdProgressTracker` | Multi-step progress state    |
| Empty State      | `vd-empty-state`      | `VdEmptyState`      | No-content and first-use UX  |
| Loading State    | `vd-loading-state`    | `VdLoadingState`    | In-progress loading feedback |

## Non-Component Exports

### Modules

- `VdAngularComponentsModule`

### Services

- `VdToastService` (`configure`, `setMaxToasts`, `show`, `dismiss`, `pause`, `resume`)
- `VdDialogService` (`open`)
- `VdDrawerService` (`open`)
- `VdConfirmationDialogService` (`confirm`)
