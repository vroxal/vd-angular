import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/introduction/introduction.page').then((m) => m.default),
  },
  {
    path: 'getting-started',
    loadComponent: () =>
      import('./pages/getting-started/getting-started.page').then((m) => m.default),
  },
  // Foundations
  {
    path: 'foundations/colors',
    loadComponent: () => import('./pages/foundations/colors/colors.page').then((m) => m.default),
  },
  {
    path: 'foundations/typography',
    loadComponent: () =>
      import('./pages/foundations/typography/typography.page').then((m) => m.default),
  },
  {
    path: 'foundations/scale',
    loadComponent: () => import('./pages/foundations/scale/scale.page').then((m) => m.default),
  },
  {
    path: 'components/input',
    loadComponent: () => import('./pages/components/input/input.page').then((m) => m.default),
  },
  {
    path: 'components/number-input',
    loadComponent: () =>
      import('./pages/components/number-input/number-input.page').then((m) => m.default),
  },
  {
    path: 'components/navbar',
    loadComponent: () => import('./pages/components/navbar/navbar.page').then((m) => m.default),
  },
  {
    path: 'components/verification-code-input',
    loadComponent: () =>
      import('./pages/components/verification-code-input/verification-code-input.page').then(
        (m) => m.default,
      ),
  },
  {
    path: 'components/icon',
    loadComponent: () => import('./pages/components/icon/icon.page').then((m) => m.default),
  },
  {
    path: 'components/icon-button',
    loadComponent: () =>
      import('./pages/components/icon-button/icon-button.page').then((m) => m.default),
  },

  {
    path: 'components/button',
    loadComponent: () => import('./pages/components/button/button.page').then((m) => m.default),
  },
  {
    path: 'components/checkbox',
    loadComponent: () => import('./pages/components/checkbox/checkbox.page').then((m) => m.default),
  },
  {
    path: 'components/checkbox-group',
    loadComponent: () =>
      import('./pages/components/checkbox-group/checkbox-group.page').then((m) => m.default),
  },
  {
    path: 'components/radio-group',
    loadComponent: () =>
      import('./pages/components/radio-group/radio-group.page').then((m) => m.default),
  },
  {
    path: 'components/toast',
    loadComponent: () => import('./pages/components/toast/toast.page').then((m) => m.default),
  },
  {
    path: 'components/badge',
    loadComponent: () => import('./pages/components/badge/badge.page').then((m) => m.default),
  },
  {
    path: 'components/breadcrumb',
    loadComponent: () =>
      import('./pages/components/breadcrumb/breadcrumb.page').then((m) => m.default),
  },
  {
    path: 'components/alert',
    loadComponent: () => import('./pages/components/alert/alert.page').then((m) => m.default),
  },
  {
    path: 'components/confirmation-dialog',
    loadComponent: () =>
      import('./pages/components/confirmation-dialog/confirmation-dialog.page').then(
        (m) => m.default,
      ),
  },
  {
    path: 'components/accordion',
    loadComponent: () =>
      import('./pages/components/accordion/accordion.page').then((m) => m.default),
  },
  {
    path: 'components/divider',
    loadComponent: () => import('./pages/components/divider/divider.page').then((m) => m.default),
  },
  {
    path: 'components/dropdown',
    loadComponent: () => import('./pages/components/dropdown/dropdown.page').then((m) => m.default),
  },
  {
    path: 'components/dialog',
    loadComponent: () => import('./pages/components/dialog/dialog.page').then((m) => m.default),
  },
  {
    path: 'components/drawer',
    loadComponent: () => import('./pages/components/drawer/drawer.page').then((m) => m.default),
  },
  {
    path: 'components/pagination',
    loadComponent: () =>
      import('./pages/components/pagination/pagination.page').then((m) => m.default),
  },
  {
    path: 'components/select',
    loadComponent: () => import('./pages/components/select/select.page').then((m) => m.default),
  },
  {
    path: 'components/textarea',
    loadComponent: () => import('./pages/components/textarea/textarea.page').then((m) => m.default),
  },
  {
    path: 'components/datatable',
    loadComponent: () =>
      import('./pages/components/datatable/datatable.page').then((m) => m.default),
  },
  {
    path: 'components/tooltip',
    loadComponent: () => import('./pages/components/tooltip/tooltip.page').then((m) => m.default),
  },
  {
    path: 'components/progress-tracker',
    loadComponent: () =>
      import('./pages/components/progress-tracker/progress-tracker.page').then((m) => m.default),
  },
  {
    path: 'components/switch',
    loadComponent: () => import('./pages/components/switch/switch.page').then((m) => m.default),
  },
  {
    path: 'components/sidebar',
    loadComponent: () => import('./pages/components/sidebar/sidebar.page').then((m) => m.default),
  },
  {
    path: 'components/date-time-picker',
    loadComponent: () =>
      import('./pages/components/date-time-picker/date-time-picker.page').then((m) => m.default),
  },
  {
    path: 'components/single-date-picker',
    loadComponent: () =>
      import('./pages/components/date-time-picker/single-date-picker/single-date-picker.page').then(
        (m) => m.default,
      ),
  },
  {
    path: 'components/range-date-picker',
    loadComponent: () =>
      import('./pages/components/date-time-picker/range-date-picker/range-date-picker.page').then(
        (m) => m.default,
      ),
  },
  {
    path: 'components/time-picker',
    loadComponent: () =>
      import('./pages/components/date-time-picker/time-picker/time-picker.page').then(
        (m) => m.default,
      ),
  },
  {
    path: 'components/tab',
    loadComponent: () => import('./pages/components/tab/tab.page').then((m) => m.default),
  },
  {
    path: 'components/file-input',
    loadComponent: () =>
      import('./pages/components/file-input/file-input.page').then((m) => m.default),
  },
  {
    path: 'components/empty-state',
    loadComponent: () =>
      import('./pages/components/empty-state/empty-state.page').then((m) => m.default),
  },
  {
    path: 'components/loading-state',
    loadComponent: () =>
      import('./pages/components/loading-state/loading-state.page').then((m) => m.default),
  },
];
