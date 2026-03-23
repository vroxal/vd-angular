import { Component, ChangeDetectorRef, TemplateRef, ViewChild, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  VdIconButton,
  VdDatatable,
  VdDatatableColumn,
  VdSelect,
  VdSelectOption,
  VdSwitch,
  VdBadge,
} from 'vd-angular';
import DocPageHeader from '../../../components/doc-page-header/doc-page-header.component';
import CodeContainer from '../../../components/code-container/code-container.component';
import iconsJson from '@vroxal/vd-icons/dist/vd-icon.json';

@Component({
  selector: 'app-icon-button-page',
  imports: [
    VdIconButton,
    VdDatatable,
    VdSelect,
    VdSwitch,
    VdBadge,
    CommonModule,
    FormsModule,
    DocPageHeader,
    CodeContainer,
  ],
  templateUrl: './icon-button.page.html',
  styleUrl: './icon-button.page.scss',
})
export default class IconButtonPage implements OnInit {
  variant: 'solid' | 'outline' | 'subtle' | 'transparent' = 'solid';
  color: 'primary' | 'neutral' | 'error' = 'primary';
  size: 'sm' | 'md' | 'lg' = 'md';
  rounded = false;
  loading = false;
  disabled = false;
  icon: string = 'vd-icon-plus';

  @ViewChild('propertyBadge', { static: true }) propertyBadge!: TemplateRef<any>;

  // Code snippets
  importCodeSnippet = 'import { VdIconButton } from "vd-angular";';

  basicImplementationSnippet = `<vd-icon-button 
  icon="vd-icon-plus" 
  ariaLabel="Add item"
></vd-icon-button>`;

  allImplementationSnippet = `<vd-icon-button 
  icon="vd-icon-plus"
  ariaLabel="Add item"
  color="primary"
  variant="solid"
  size="md"
  [rounded]="false"
  [loading]="false"
  [disabled]="false"
></vd-icon-button>`;

  // API Reference data
  apiData = [
    {
      property: 'icon',
      type: 'string',
      default: '-',
      required: 'Yes',
      description: 'Icon name to display (e.g., "vd-icon-plus")',
    },
    {
      property: 'ariaLabel',
      type: 'string',
      default: '-',
      required: 'Yes',
      description: 'Accessible label for screen readers',
    },
    {
      property: 'variant',
      type: "'solid' | 'outline' | 'subtle' | 'transparent'",
      default: "'solid'",
      required: 'No',
      description: 'Visual style of the button',
    },
    {
      property: 'color',
      type: "'primary' | 'neutral' | 'error'",
      default: "'primary'",
      required: 'No',
      description: 'Color token for the button',
    },
    {
      property: 'size',
      type: "'sm' | 'md' | 'lg'",
      default: "'md'",
      required: 'No',
      description: 'Size of the button',
    },
    {
      property: 'rounded',
      type: 'boolean',
      default: 'false',
      required: 'No',
      description: 'Whether the button has fully rounded (circular) corners',
    },
    {
      property: 'disabled',
      type: 'boolean',
      default: 'false',
      required: 'No',
      description: 'Whether the button is disabled',
    },
    {
      property: 'loading',
      type: 'boolean',
      default: 'false',
      required: 'No',
      description: 'Whether the button is in loading state',
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

  variantOptions: VdSelectOption<'solid' | 'outline' | 'subtle' | 'transparent'>[] = [
    { label: 'Solid', value: 'solid' },
    { label: 'Outline', value: 'outline' },
    { label: 'Subtle', value: 'subtle' },
    { label: 'Transparent', value: 'transparent' },
  ];

  colorOptions: VdSelectOption<'primary' | 'neutral' | 'error'>[] = [
    { label: 'Primary', value: 'primary' },
    { label: 'Neutral', value: 'neutral' },
    { label: 'Error', value: 'error' },
  ];

  sizeOptions: VdSelectOption<'sm' | 'md' | 'lg'>[] = [
    { label: 'Small', value: 'sm' },
    { label: 'Medium', value: 'md' },
    { label: 'Large', value: 'lg' },
  ];

  // List of available icons
  icons: VdSelectOption<string>[] = Object.keys(iconsJson).map((key) => ({
    label: this.toLabel(key),
    value: `vd-icon-${key}`,
  }));

  private toLabel(key: string): string {
    return key
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  get codeSnippet(): string {
    const attrs: string[] = [];
    if (this.variant !== 'solid') {
      attrs.push(`variant="${this.variant}"`);
    }
    if (this.color !== 'primary') {
      attrs.push(`color="${this.color}"`);
    }
    if (this.size !== 'md') {
      attrs.push(`size="${this.size}"`);
    }
    if (this.rounded) {
      attrs.push(`[rounded]="true"`);
    }
    if (this.loading) {
      attrs.push(`[loading]="true"`);
    }
    if (this.disabled) {
      attrs.push(`[disabled]="true"`);
    }
    const attributes = attrs.length ? '\n  ' + attrs.join('\n  ') : '';

    return `<vd-icon-button
  icon="${this.icon}"
  ariaLabel="Icon Button"${attributes}
></vd-icon-button>`;
  }

  ngOnInit(): void {
    this.apiColumnsWithTemplate = this.apiColumns.map((col) =>
      col.key === 'property' ? { ...col, template: this.propertyBadge } : col,
    );
  }
}
