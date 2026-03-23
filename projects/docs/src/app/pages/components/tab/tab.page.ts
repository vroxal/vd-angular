import { Component, TemplateRef, ViewChild, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  VdTab,
  VdTabConfig,
  VdDatatable,
  VdDatatableColumn,
  VdSelect,
  VdSelectOption,
  VdSwitch,
  VdBadge,
} from 'vd-angular';

import DocPageHeader from '../../../components/doc-page-header/doc-page-header.component';
import CodeContainer from '../../../components/code-container/code-container.component';

@Component({
  selector: 'app-tab-page',
  standalone: true,
  imports: [
    VdTab,
    VdDatatable,
    VdSelect,
    VdSwitch,
    VdBadge,
    FormsModule,
    CommonModule,
    DocPageHeader,
    CodeContainer,
  ],
  templateUrl: './tab.page.html',
  styleUrl: './tab.page.scss',
})
export default class TabPage implements OnInit {
  // Playground state
  type: 'default' | 'boxed' = 'default';
  direction: 'horizontal' | 'vertical' = 'horizontal';
  activeTab = 'tab1';
  contentDemoTab = 'tab1';
  showIcons = true;

  @ViewChild('propertyBadge', { static: true }) propertyBadge!: TemplateRef<any>;

  // Demo tabs
  demoTabs: VdTabConfig[] = [
    { label: 'Overview', value: 'tab1', icon: 'vd-icon-placeholder' },
    { label: 'Settings', value: 'tab2', icon: 'vd-icon-settings' },
    { label: 'Profile', value: 'tab3', icon: 'vd-icon-user' },
    { label: 'Reports', value: 'tab4', icon: 'vd-icon-refresh' },
  ];

  demoTabsNoIcons: VdTabConfig[] = [
    { label: 'Overview', value: 'tab1' },
    { label: 'Settings', value: 'tab2' },
    { label: 'Profile', value: 'tab3' },
    { label: 'Reports', value: 'tab4' },
  ];

  demoTabsWithDisabled: VdTabConfig[] = [
    { label: 'Overview', value: 'tab1', icon: 'vd-icon-placeholder' },
    { label: 'Settings', value: 'tab2', icon: 'vd-icon-settings' },
    { label: 'Disabled', value: 'tab3', icon: 'vd-icon-warning', disabled: true },
    { label: 'Reports', value: 'tab4', icon: 'vd-icon-refresh' },
  ];

  // Code snippets
  importCodeSnippet = 'import { VdTab, VdTabConfig } from "vd-angular";';

  basicImplementationSnippet = `<vd-tab
  [tabs]="tabs"
  [(value)]="activeTab"
></vd-tab>`;

  basicComponentSnippet = `export class MyComponent {
  activeTab = 'tab1';

  tabs: VdTabConfig[] = [
    { label: 'Overview', value: 'tab1', icon: 'vd-icon-home' },
    { label: 'Settings', value: 'tab2', icon: 'vd-icon-settings' },
    { label: 'Profile', value: 'tab3', icon: 'vd-icon-user' },
  ];
}`;

  boxedImplementationSnippet = `<vd-tab
  [tabs]="tabs"
  [(value)]="activeTab"
  type="boxed"
></vd-tab>`;

  verticalImplementationSnippet = `<vd-tab
  [tabs]="tabs"
  [(value)]="activeTab"
  direction="vertical"
></vd-tab>`;

  eventsSnippet = `<vd-tab
  [tabs]="tabs"
  [(value)]="activeTab"
  (tabChange)="onTabChange(\$event)"
></vd-tab>`;

  eventsComponentSnippet = `export class MyComponent {
  activeTab = 'tab1';

  tabs: VdTabConfig[] = [
    { label: 'Overview', value: 'tab1' },
    { label: 'Settings', value: 'tab2' },
    { label: 'Profile', value: 'tab3' },
  ];

  onTabChange(tab: VdTabConfig): void {
    console.log('Tab changed to:', tab.label);
  }
}`;

  disabledSnippet = `tabs: VdTabConfig[] = [
  { label: 'Overview', value: 'tab1' },
  { label: 'Settings', value: 'tab2' },
  { label: 'Locked', value: 'tab3', disabled: true },
];`;
  tabContentTemplateSnippet = `<vd-tab
  [tabs]="tabs"
  [(value)]="activeTab"
></vd-tab>

@if (activeTab === 'tab1') {
  <div class="tab-panel">
    <h3>Overview</h3>
    <p>This is the overview content.</p>
  </div>
}
@if (activeTab === 'tab2') {
  <div class="tab-panel">
    <h3>Settings</h3>
    <p>This is the settings content.</p>
  </div>
}
@if (activeTab === 'tab3') {
  <div class="tab-panel">
    <h3>Profile</h3>
    <p>This is the profile content.</p>
  </div>
}`;

  tabContentComponentSnippet = `export class MyComponent {
  activeTab = 'tab1';

  tabs: VdTabConfig[] = [
    { label: 'Overview', value: 'tab1', icon: 'vd-icon-home' },
    { label: 'Settings', value: 'tab2', icon: 'vd-icon-settings' },
    { label: 'Profile', value: 'tab3', icon: 'vd-icon-user' },
  ];
}`;
  // API Reference data
  apiData = [
    {
      property: 'tabs',
      type: 'VdTabConfig[]',
      default: '[]',
      required: 'Yes',
      description: 'Array of tab configuration objects',
    },
    {
      property: 'value',
      type: 'string',
      default: "''",
      required: 'No',
      description: 'The value of the currently active tab. Defaults to the first tab if not set.',
    },
    {
      property: 'type',
      type: "'default' | 'boxed'",
      default: "'default'",
      required: 'No',
      description:
        "Visual style — 'default' shows an underline indicator, 'boxed' shows a filled background.",
    },
    {
      property: 'direction',
      type: "'horizontal' | 'vertical'",
      default: "'horizontal'",
      required: 'No',
      description: 'Layout direction of the tabs',
    },
  ];

  tabConfigData = [
    {
      property: 'label',
      type: 'string',
      required: 'Yes',
      description: 'Display text for the tab',
    },
    {
      property: 'value',
      type: 'string',
      required: 'Yes',
      description: 'Unique value identifier for the tab',
    },
    {
      property: 'icon',
      type: 'string',
      required: 'No',
      description: 'Icon name displayed before the label (e.g., vd-icon-home)',
    },
    {
      property: 'disabled',
      type: 'boolean',
      required: 'No',
      description: 'Whether the tab is disabled',
    },
  ];

  outputsData = [
    {
      property: 'valueChange',
      type: 'EventEmitter<string>',
      description: 'Emitted when the active tab value changes',
    },
    {
      property: 'tabChange',
      type: 'EventEmitter<VdTabConfig>',
      description: 'Emitted when a tab is selected, with the full tab config object',
    },
  ];

  apiColumns: VdDatatableColumn[] = [
    { key: 'property', title: 'Property' },
    { key: 'type', title: 'Type' },
    { key: 'default', title: 'Default' },
    { key: 'required', title: 'Required' },
    { key: 'description', title: 'Description' },
  ];

  tabConfigColumns: VdDatatableColumn[] = [
    { key: 'property', title: 'Property' },
    { key: 'type', title: 'Type' },
    { key: 'required', title: 'Required' },
    { key: 'description', title: 'Description' },
  ];

  eventsColumns: VdDatatableColumn[] = [
    { key: 'property', title: 'Event' },
    { key: 'type', title: 'Type' },
    { key: 'description', title: 'Description' },
  ];

  apiColumnsWithTemplate: VdDatatableColumn[] = [];
  tabConfigColumnsWithTemplate: VdDatatableColumn[] = [];
  eventsColumnsWithTemplate: VdDatatableColumn[] = [];

  typeOptions: VdSelectOption<'default' | 'boxed'>[] = [
    { label: 'Default', value: 'default' },
    { label: 'Boxed', value: 'boxed' },
  ];

  directionOptions: VdSelectOption<'horizontal' | 'vertical'>[] = [
    { label: 'Horizontal', value: 'horizontal' },
    { label: 'Vertical', value: 'vertical' },
  ];

  get playgroundTabs(): VdTabConfig[] {
    return this.showIcons ? this.demoTabs : this.demoTabsNoIcons;
  }

  get codeSnippet(): string {
    const attrs: string[] = [];
    attrs.push(`[tabs]="tabs"`);
    attrs.push(`[(value)]="activeTab"`);
    if (this.type !== 'default') {
      attrs.push(`type="${this.type}"`);
    }
    if (this.direction !== 'horizontal') {
      attrs.push(`direction="${this.direction}"`);
    }
    const attributes = attrs.length ? '\n  ' + attrs.join('\n  ') : '';
    return `<vd-tab${attributes}\n></vd-tab>`;
  }

  ngOnInit(): void {
    this.apiColumnsWithTemplate = this.apiColumns.map((col) =>
      col.key === 'property' ? { ...col, template: this.propertyBadge } : col,
    );
    this.tabConfigColumnsWithTemplate = this.tabConfigColumns.map((col) =>
      col.key === 'property' ? { ...col, template: this.propertyBadge } : col,
    );
    this.eventsColumnsWithTemplate = this.eventsColumns.map((col) =>
      col.key === 'property' ? { ...col, template: this.propertyBadge } : col,
    );
  }
}
