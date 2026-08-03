import { Component, TemplateRef, ViewChild, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  VdSidebar,
  VdSidebarNavSection,
  VdSidebarNavItem,
  VdBadge,
  VdDatatable,
  VdDatatableColumn,
  VdSwitch,
} from 'vd-angular';
import DocPageHeader from '../../../components/doc-page-header/doc-page-header.component';
import CodeContainer from '../../../components/code-container/code-container.component';

@Component({
  selector: 'app-sidebar-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    VdSidebar,
    VdBadge,
    VdDatatable,
    VdSwitch,
    DocPageHeader,
    CodeContainer,
  ],
  templateUrl: './sidebar.page.html',
  styleUrl: './sidebar.page.scss',
})
export default class SidebarPage implements OnInit {
  // Playground controls
  showBrand = false;
  showIcons = true;
  showSectionTitles = true;
  hasNestedItems = true;

  @ViewChild('propertyBadge', { static: true }) propertyBadge!: TemplateRef<any>;

  // Code snippets
  importCodeSnippet = `import { VdSidebar, VdSidebarNavSection, VdSidebarNavItem } from "vd-angular";`;

  interfaceSnippet = `export interface VdSidebarNavItem {
  label: string;
  route?: string;
  matchMode?: 'exact' | 'prefix';
  icon?: string;       // icon name (optional)
  children?: VdSidebarNavItem[];  // nested items
}

export interface VdSidebarNavSection {
  title?: string;
  items: VdSidebarNavItem[];
  showTitle?: boolean; // defaults to true if not specified
}`;

  basicImplementationTypescriptSnippet = `import { Component } from '@angular/core';
import { VdSidebar, VdSidebarNavSection } from 'vd-angular';

@Component({
  selector: 'app-my-component',
  imports: [VdSidebar],
  template: '<vd-sidebar [sections]="sections"></vd-sidebar>',
})
export class MyComponent {
  sections: VdSidebarNavSection[] = [
    {
      title: 'Navigation',
      items: [
        { label: 'Dashboard', route: '/dashboard', icon: 'vd-icon-home' },
        { label: 'Settings', route: '/settings', icon: 'vd-icon-settings' },
        { label: 'Profile', route: '/profile', icon: 'vd-icon-user' },
      ],
    },
  ];
}`;

  basicImplementationTemplateSnippet = `<vd-sidebar [sections]="sections"></vd-sidebar>`;

  nestedImplementationTypescriptSnippet = `sections: VdSidebarNavSection[] = [
  {
    title: 'Main Navigation',
    items: [
      { 
        label: 'Dashboard', 
        route: '/dashboard',
        icon: 'vd-icon-home'
      },
      {
        label: 'Components',
        route: '/components',
        matchMode: 'prefix',
        icon: 'vd-icon-components',
        children: [
          { label: 'Button', route: '/components/button' },
          { label: 'Input', route: '/components/input' },
          { label: 'Select', route: '/components/select' },
        ],
      },
    ],
  },
];`;

  withoutIconsSnippet = `sections: VdSidebarNavSection[] = [
  {
    title: 'Menu',
    items: [
      { label: 'Home', route: '/home' },
      { label: 'About', route: '/about' },
      { label: 'Contact', route: '/contact' },
    ],
  },
];`;

  brandSlotSnippet = `<vd-sidebar [sections]="sections" [showBrand]="true">
  <div vdSidebarBrand>
    <img src="assets/logo.png" alt="Brand logo" />
  </div>
</vd-sidebar>`;

  noSectionTitlesSnippet = `sections: VdSidebarNavSection[] = [
  {
    showTitle: false,  // Hide section title
    items: [
      { label: 'Dashboard', route: '/dashboard' },
      { label: 'Settings', route: '/settings' },
    ],
  },
];`;

  // Sample data for variations
  basicSections: VdSidebarNavSection[] = [
    {
      title: 'Main Menu',
      items: [
        { label: 'Dashboard', route: '/dashboard', icon: 'vd-icon-placeholder' },
        { label: 'Analytics', route: '/analytics', icon: 'vd-icon-placeholder' },
        { label: 'Reports', route: '/reports', icon: 'vd-icon-placeholder' },
      ],
    },
  ];

  nestedSections: VdSidebarNavSection[] = [
  {
    title: 'Navigation',
    items: [
      { label: 'Home', route: '/home', icon: 'vd-icon-placeholder' },
      {
        label: 'Products',
        route: '/products',
        matchMode: 'prefix',
        icon: 'vd-icon-placeholder',
        children: [
          { label: 'All Products', route: '/products/all', matchMode: 'prefix' },
          { label: 'Categories', route: '/products/categories' },
          { label: 'New Arrivals', route: '/products/new' },
        ],
      },
        {
          label: 'Orders',
          route: '/orders',
          icon: 'vd-icon-placeholder',
          children: [
            { label: 'Active Orders', route: '/orders/active' },
            { label: 'Completed', route: '/orders/completed' },
          ],
        },
      ],
    },
  ];

  multiSectionNav: VdSidebarNavSection[] = [
    {
      title: 'Main',
      items: [
        { label: 'Dashboard', route: '/dashboard', icon: 'vd-icon-placeholder' },
        { label: 'Analytics', route: '/analytics', icon: 'vd-icon-placeholder' },
      ],
    },
    {
      title: 'Management',
      items: [
        { label: 'Users', route: '/users', icon: 'vd-icon-placeholder' },
        { label: 'Settings', route: '/settings', icon: 'vd-icon-placeholder' },
      ],
    },
  ];

  // API Reference data
  apiData = [
    {
      property: 'sections',
      type: 'VdSidebarNavSection[]',
      default: '[]',
      required: 'Yes',
      description: 'Array of navigation sections to display in the sidebar',
    },
    {
      property: 'showBrand',
      type: 'boolean',
      default: 'false',
      required: 'No',
      description:
        'Controls visibility of the brand/logo slot at the top of the sidebar. Project content into it using the vdSidebarBrand attribute',
    },
  ];

  apiColumns: VdDatatableColumn[] = [
    { key: 'property', title: 'Property' },
    { key: 'type', title: 'Type' },
    { key: 'default', title: 'Default' },
    { key: 'required', title: 'Required' },
    { key: 'description', title: 'Description' },
  ];

  apiColumnsWithTemplate: VdDatatableColumn[] = [];

  interfaceData = [
    {
      property: 'label',
      type: 'string',
      required: 'Yes',
      description: 'Display text for the navigation item',
    },
    {
      property: 'route',
      type: 'string',
      required: 'No',
      description: 'Route path for navigation (optional)',
    },
    {
      property: 'matchMode',
      type: "'exact' | 'prefix'",
      required: 'No',
      description: 'Route matching mode. Defaults to exact when not provided',
    },
    {
      property: 'icon',
      type: 'string',
      required: 'No',
      description: 'Icon name to display before label (optional)',
    },
    {
      property: 'children',
      type: 'VdSidebarNavItem[]',
      required: 'No',
      description: 'Nested navigation items (optional)',
    },
  ];

  sectionInterfaceData = [
    {
      property: 'title',
      type: 'string',
      required: 'No',
      description: 'Section title to display',
    },
    {
      property: 'items',
      type: 'VdSidebarNavItem[]',
      required: 'Yes',
      description: 'Array of navigation items in this section',
    },
    {
      property: 'showTitle',
      type: 'boolean',
      required: 'No',
      description: 'Whether to show the section title. Defaults to true',
    },
  ];

  interfaceColumns: VdDatatableColumn[] = [
    { key: 'property', title: 'Property' },
    { key: 'type', title: 'Type' },
    { key: 'required', title: 'Required' },
    { key: 'description', title: 'Description' },
  ];

  interfaceColumnsWithTemplate: VdDatatableColumn[] = [];

  ngOnInit(): void {
    this.apiColumnsWithTemplate = this.apiColumns.map((col) => {
      if (col.key === 'property') {
        return { ...col, template: this.propertyBadge };
      }
      return col;
    });

    this.interfaceColumnsWithTemplate = this.interfaceColumns.map((col) => {
      if (col.key === 'property') {
        return { ...col, template: this.propertyBadge };
      }
      return col;
    });
  }

  // Playground sections
  get playgroundSections(): VdSidebarNavSection[] {
    const sections: VdSidebarNavSection[] = [
      {
        title: this.showSectionTitles ? 'Main Navigation' : undefined,
        showTitle: this.showSectionTitles,
        items: [
          {
            label: 'Dashboard',
            route: '/playground/dashboard',
            icon: this.showIcons ? 'vd-icon-placeholder' : undefined,
          },
          {
            label: 'Analytics',
            route: '/playground/analytics',
            icon: this.showIcons ? 'vd-icon-placeholder' : undefined,
          },
        ],
      },
    ];

    if (this.hasNestedItems) {
      sections[0].items.push({
        label: 'Products',
        route: '/playground/products',
        matchMode: 'prefix',
        icon: this.showIcons ? 'vd-icon-placeholder' : undefined,
        children: [
          {
            label: 'All Products',
            route: '/playground/products/all',
            matchMode: 'prefix',
          },
          { label: 'Categories', route: '/playground/products/categories' },
        ],
      });
    }

    return sections;
  }

  get codeSnippet(): string {
    let code = this.showBrand
      ? `<vd-sidebar [sections]="sections" [showBrand]="true">\n  <div vdSidebarBrand>\n    <img src="assets/logo.png" alt="Brand logo" />\n  </div>\n</vd-sidebar>\n\n`
      : `<vd-sidebar [sections]="sections"></vd-sidebar>\n\n`;
    code += `// TypeScript\nsections: VdSidebarNavSection[] = [\n`;
    code += `  {\n`;

    if (this.showSectionTitles) {
      code += `    title: 'Main Navigation',\n`;
    } else {
      code += `    showTitle: false,\n`;
    }

    code += `    items: [\n`;
    code += `      {\n`;
    code += `        label: 'Dashboard',\n`;
    code += `        route: '/dashboard'`;

    if (this.showIcons) {
      code += `,\n        icon: 'vd-icon-home'`;
    }

    code += `\n      },\n`;

    if (this.hasNestedItems) {
      code += `      {\n`;
      code += `        label: 'Products',\n`;
      code += `        route: '/products',\n`;
      code += `        matchMode: 'prefix'`;
      if (this.showIcons) {
        code += `,\n        icon: 'vd-icon-box'`;
      }
      code += `,\n        children: [\n`;
      code += `          { label: 'All Products', route: '/products/all', matchMode: 'prefix' },\n`;
      code += `          { label: 'Categories', route: '/products/categories' }\n`;
      code += `        ]\n`;
      code += `      },\n`;
    }

    code += `    ],\n`;
    code += `  },\n`;
    code += `];`;

    return code;
  }
}
