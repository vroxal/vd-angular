export interface NavItem {
  label: string;
  route?: string;
  matchMode?: 'exact' | 'prefix';
  icon?: string; // icon name (optional)
  children?: NavItem[]; // nested items
}

export interface NavSection {
  title?: string;
  items: NavItem[];
  showTitle?: boolean; // Optional: defaults to true if not specified
}

export const SIDEBAR_SECTIONS: NavSection[] = [
  {
    title: 'Introduction',
    showTitle: false,
    items: [
      {
        label: 'Introduction',
        route: '/',
      },
      {
        label: 'Getting Started',
        route: '/getting-started',
      },
    ],
  },
  {
    title: 'Foundations',
    items: [
      {
        label: 'Colors',
        route: '/foundations/colors',
      },
      {
        label: 'Typography',
        route: '/foundations/typography',
      },
      { label: 'Scale', route: '/foundations/scale' },
    ],
  },
  {
    title: 'Components',
    items: [
      {
        label: 'Accordion',
        route: '/components/accordion',
      },
      { label: 'Alert', route: '/components/alert' },
      { label: 'Badge', route: '/components/badge' },
      { label: 'Breadcrumb', route: '/components/breadcrumb' },
      {
        label: 'Button',
        route: '/components/button',
        children: [
          {
            label: 'Icon Button',
            route: '/components/icon-button',
          },
        ],
      },

      {
        label: 'Checkbox',
        route: '/components/checkbox',
        children: [
          {
            label: 'Checkbox Group',
            route: '/components/checkbox-group',
          },
        ],
      },
      {
        label: 'Datatable',
        route: '/components/datatable',
      },
      {
        label: 'Date Time Picker',
        route: '/components/date-time-picker',
        children: [
          {
            label: 'Single Date Picker',
            route: '/components/single-date-picker',
          },
          {
            label: 'Range Date Picker',
            route: '/components/range-date-picker',
          },
          { label: 'Time Picker', route: '/components/time-picker' },
        ],
      },
      {
        label: 'Divider',
        route: '/components/divider',
      },
      {
        label: 'Dropdown',
        route: '/components/dropdown',
      },
      {
        label: 'Dialog',
        route: '/components/dialog',
        children: [
          {
            label: 'Confirmation Dialog',
            route: '/components/confirmation-dialog',
          },
        ],
      },
      {
        label: 'Drawer',
        route: '/components/drawer',
      },
      {
        label: 'Empty State',
        route: '/components/empty-state',
      },

      { label: 'Icon', route: '/components/icon' },
      {
        label: 'Input',
        route: '/components/input',
        children: [
          {
            label: 'File Input',
            route: '/components/file-input',
          },
          { label: 'Number Input', route: '/components/number-input' },
          {
            label: 'Verification Code Input',
            route: '/components/verification-code-input',
          },
        ],
      },
      { label: 'Loading State', route: '/components/loading-state' },
      { label: 'Navbar', route: '/components/navbar' },
      {
        label: 'Pagination',
        route: '/components/pagination',
      },
      {
        label: 'Progress Tracker',
        route: '/components/progress-tracker',
      },
      {
        label: 'Radio Group',
        route: '/components/radio-group',
      },
      {
        label: 'Select',
        route: '/components/select',
      },

      {
        label: 'Sidebar',
        route: '/components/sidebar',
      },
      {
        label: 'Switch',
        route: '/components/switch',
      },
      {
        label: 'Tab',
        route: '/components/tab',
      },
      {
        label: 'Textarea',
        route: '/components/textarea',
      },

      { label: 'Toast', route: '/components/toast' },
      {
        label: 'Tooltip',
        route: '/components/tooltip',
      },
    ],
  },
];

// Sections for introduction page - excludes "Introduction" item
export const INTRODUCTION_PAGE_SECTIONS = [
  {
    items: [
      {
        label: 'Getting Started',
        route: '/getting-started',
        image: 'getting-started',
      },
    ],
  },
  {
    title: 'Foundations',
    items: [
      {
        label: 'Colors',
        route: '/foundations/colors',
        image: 'colors',
      },
      {
        label: 'Typography',
        route: '/foundations/typography',
        image: 'typography',
      },
      { label: 'Scale', route: '/foundations/scale', image: 'scale' },
    ],
  },
  {
    title: 'Components',
    items: [
      {
        label: 'Accordion',
        route: '/components/accordion',
        image: 'accordion',
      },
      { label: 'Alert', route: '/components/alert', image: 'alert' },
      { label: 'Badge', route: '/components/badge', image: 'badge' },
      { label: 'Breadcrumb', route: '/components/breadcrumb', image: 'breadcrumb' },
      {
        label: 'Button',
        route: '/components/button',
        image: 'button',
      },
      {
        label: 'Checkbox',
        route: '/components/checkbox',
        image: 'checkbox',
      },
      {
        label: 'Checkbox Group',
        route: '/components/checkbox-group',
        image: 'checkbox-group',
      },
      {
        label: 'Confirmation Dialog',
        route: '/components/confirmation-dialog',
        image: 'confirmation-dialog',
      },
      {
        label: 'Datatable',
        route: '/components/datatable',
        image: 'datatable',
      },
      {
        label: 'Date Time Picker',
        route: '/components/date-time-picker',
        image: 'date-time-picker',
      },
      {
        label: 'Divider',
        route: '/components/divider',
        image: 'divider',
      },
      {
        label: 'Dropdown',
        route: '/components/dropdown',
        image: 'dropdown',
      },
      {
        label: 'Dialog',
        route: '/components/dialog',
        image: 'dialog',
      },
      {
        label: 'Drawer',
        route: '/components/drawer',
        image: 'drawer',
      },
      {
        label: 'Empty State',
        route: '/components/empty-state',
        image: 'empty-state',
      },
      {
        label: 'File Input',
        route: '/components/file-input',
        image: 'file-input',
      },

      { label: 'Icon', route: '/components/icon', image: 'icon' },
      {
        label: 'Icon Button',
        route: '/components/icon-button',
        image: 'icon-button',
      },
      { label: 'Input', route: '/components/input', image: 'input' },
      { label: 'Loading State', route: '/components/loading-state', image: 'loading-state' },
      { label: 'Navbar', route: '/components/navbar', image: 'navbar' },
      { label: 'Number Input', route: '/components/number-input', image: 'number-input' },
      {
        label: 'Pagination',
        route: '/components/pagination',
        image: 'pagination',
      },
      {
        label: 'Progress Tracker',
        route: '/components/progress-tracker',
        image: 'progress-tracker',
      },
      {
        label: 'Radio Group',
        route: '/components/radio-group',
        image: 'radio-group',
      },
      {
        label: 'Select',
        route: '/components/select',
        image: 'select',
      },
      {
        label: 'Sidebar',
        route: '/components/sidebar',
        image: 'sidebar',
      },
      {
        label: 'Switch',
        route: '/components/switch',
        image: 'switch',
      },
      {
        label: 'Tab',
        route: '/components/tab',
        image: 'tab',
      },
      {
        label: 'Textarea',
        route: '/components/textarea',
        image: 'textarea',
      },
      { label: 'Toast', route: '/components/toast', image: 'toast' },
      {
        label: 'Tooltip',
        route: '/components/tooltip',
        image: 'tooltip',
      },
      {
        label: 'Verification Code Input',
        route: '/components/verification-code-input',
        image: 'verification-code-input',
      },
    ],
  },
];
