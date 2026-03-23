import { Component, signal, ChangeDetectorRef, TemplateRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import DocPageHeader from '../../../components/doc-page-header/doc-page-header.component';
import iconsJson from '@vroxal/vd-icons/dist/vd-icon.json';
import CodeContainer from '../../../components/code-container/code-container.component';
import {
  VdIcon,
  VdBadge,
  VdDatatable,
  VdDatatableColumn,
  VdSelect,
  VdSelectOption,
} from 'vd-angular';

@Component({
  selector: 'app-icon-page',
  imports: [
    CommonModule,
    FormsModule,
    DocPageHeader,
    CodeContainer,
    VdIcon,
    VdBadge,
    VdDatatable,
    VdSelect,
  ],
  templateUrl: './icon.page.html',
  styleUrl: './icon.page.scss',
})
export default class IconPage {
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'md';
  icon: string = 'vd-icon-placeholder';
  color: string = '';
  search = '';
  copiedIcon: string | null = null;

  @ViewChild('propertyBadge', { static: true }) propertyBadge!: TemplateRef<any>;

  icons = Object.keys(iconsJson).map((key) => ({
    key,
    label: this.toLabel(key),
    value: `vd-icon-${key}`,
  }));

  sizeOptions: VdSelectOption<'xs' | 'sm' | 'md' | 'lg' | 'xl'>[] = [
    { label: 'Extra Small', value: 'xs' },
    { label: 'Small', value: 'sm' },
    { label: 'Medium', value: 'md' },
    { label: 'Large', value: 'lg' },
    { label: 'Extra Large', value: 'xl' },
  ];

  colorOptions: VdSelectOption<string>[] = [
    { label: 'Default (inherit)', value: '' },
    { label: 'Primary', value: 'primary' },
    { label: 'Neutral', value: 'neutral' },
    { label: 'Success', value: 'success' },
    { label: 'Error', value: 'error' },
    { label: 'Info', value: 'info' },
    { label: 'Warning', value: 'warning' },
  ];

  // Code snippets
  importCodeSnippet = 'import { VdIcon } from "vd-angular";';

  basicImplementationSnippet = `<vd-icon name="vd-icon-placeholder"></vd-icon>`;

  allImplementationSnippet = `<vd-icon 
  name="vd-icon-placeholder"
  size="md"
  color="primary"
></vd-icon>`;

  // API Reference data
  apiData = [
    {
      property: 'name',
      type: 'string',
      default: '-',
      required: 'Yes',
      description: 'CSS class for the icon (e.g., "vd-icon-save")',
    },
    {
      property: 'size',
      type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'",
      default: "'md'",
      required: 'No',
      description: 'Size of the icon',
    },
    {
      property: 'color',
      type: "'primary' | 'neutral' | 'success' | 'error' | 'info' | 'warning'",
      default: 'inherit',
      required: 'No',
      description: 'Color token for the icon. Defaults to inheriting from parent.',
    },
    {
      property: 'hiddenWhenLoading',
      type: 'boolean',
      default: 'false',
      required: 'No',
      description: 'Whether to hide the icon during loading states',
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

  ngOnInit() {
    this.apiColumnsWithTemplate = this.apiColumns.map((col) =>
      col.key === 'property' ? { ...col, template: this.propertyBadge } : col,
    );
  }

  get filteredIcons() {
    if (!this.search) return this.icons;

    const query = this.search.toLowerCase();
    return this.icons.filter(
      (icon) => icon.key.includes(query) || icon.label.toLowerCase().includes(query),
    );
  }

  private toLabel(key: string): string {
    return key
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  copyIconName(name: string) {
    navigator.clipboard.writeText(name).then(() => {
      this.copiedIcon = name;

      setTimeout(() => {
        this.copiedIcon = null;
      }, 1500);
    });
  }

  get codeSnippet(): string {
    const attrs: string[] = [];

    if (this.size !== 'md') {
      attrs.push(`size="${this.size}"`);
    }

    if (this.color) {
      attrs.push(`color="${this.color}"`);
    }

    const attributes = attrs.length ? '\n  ' + attrs.join('\n  ') : '';

    return `<vd-icon
  name="${this.icon}"${attributes}
></vd-icon>`;
  }
}
