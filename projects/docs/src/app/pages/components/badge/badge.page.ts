import { Component, ChangeDetectorRef, TemplateRef, ViewChild, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  VdBadge,
  VdDatatable,
  VdDatatableColumn,
  VdSelect,
  VdSelectOption,
  VdSwitch,
} from 'vd-angular';

import DocPageHeader from '../../../components/doc-page-header/doc-page-header.component';
import CodeContainer from '../../../components/code-container/code-container.component';

@Component({
  selector: 'app-badge-page',
  imports: [
    VdBadge,
    VdDatatable,
    VdSelect,
    VdSwitch,
    FormsModule,
    CommonModule,
    DocPageHeader,
    CodeContainer,
  ],
  templateUrl: './badge.page.html',
  styleUrl: './badge.page.scss',
})
export default class BadgePage implements OnInit {
  variant: 'solid' | 'subtle' = 'solid';
  color: 'primary' | 'neutral' | 'error' | 'success' | 'info' | 'warning' = 'primary';
  size: 'sm' | 'md' = 'md';
  rounded = false;
  loading = false;

  @ViewChild('propertyBadge', { static: true }) propertyBadge!: TemplateRef<any>;

  // Code snippets
  importCodeSnippet = 'import { VdBadge } from "vd-angular";';

  basicImplementationSnippet = `<vd-badge label="Badge"></vd-badge>`;
  allImplementationSnippet = `<vd-badge
  label="Badge"
  variant="subtle"
  color="primary"
  size="md"
  [rounded]="true"
></vd-badge>`;

  // API Reference data
  apiData = [
    {
      property: 'label',
      type: 'string',
      default: '-',
      required: 'Yes',
      description: 'Text displayed inside the badge',
    },
    {
      property: 'variant',
      type: "'solid' | 'subtle'",
      default: "'solid'",
      required: 'No',
      description: 'Visual style of the badge',
    },
    {
      property: 'color',
      type: "'primary' | 'neutral' | 'error' | 'success' | 'info' | 'warning'",
      default: "'primary'",
      required: 'No',
      description: 'Color token for the badge',
    },
    {
      property: 'size',
      type: "'sm' | 'md'",
      default: "'md'",
      required: 'No',
      description: 'Size of the badge',
    },
    {
      property: 'rounded',
      type: 'boolean',
      default: 'false',
      required: 'No',
      description: 'Whether the badge has fully rounded corners',
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

  variantOptions: VdSelectOption<'solid' | 'subtle'>[] = [
    { label: 'Solid', value: 'solid' },
    { label: 'Subtle', value: 'subtle' },
  ];

  colorOptions: VdSelectOption<
    'primary' | 'neutral' | 'error' | 'success' | 'info' | 'warning'
  >[] = [
    { label: 'Primary', value: 'primary' },
    { label: 'Neutral', value: 'neutral' },
    { label: 'Error', value: 'error' },
    { label: 'Success', value: 'success' },
    { label: 'Info', value: 'info' },
    { label: 'Warning', value: 'warning' },
  ];

  sizeOptions: VdSelectOption<'sm' | 'md'>[] = [
    { label: 'Small', value: 'sm' },
    { label: 'Medium', value: 'md' },
  ];

  // Icon controls
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
    const attributes = attrs.length ? '\n  ' + attrs.join('\n  ') : '';

    return `<vd-badge
  label="Badge"${attributes}
></vd-badge>`;
  }

  // constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.apiColumnsWithTemplate = this.apiColumns.map((col) =>
      col.key === 'property' ? { ...col, template: this.propertyBadge } : col,
    );
  }
}
