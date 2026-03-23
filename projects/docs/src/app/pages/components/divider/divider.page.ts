import { Component, TemplateRef, ViewChild, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  VdDivider,
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
  selector: 'app-divider-page',
  imports: [
    VdDivider,
    VdDatatable,
    VdSelect,
    VdSwitch,
    VdBadge,
    FormsModule,
    CommonModule,
    DocPageHeader,
    CodeContainer,
  ],
  templateUrl: './divider.page.html',
  styleUrl: './divider.page.scss',
})
export default class DividerPage implements OnInit {
  dashed = false;
  color: string = 'primary';
  direction: string = 'horizontal';
  inset = false;

  @ViewChild('propertyBadge', { static: true }) propertyBadge!: TemplateRef<any>;

  // Code snippets
  importCodeSnippet = 'import { VdDivider } from "vd-angular";';

  basicImplementationSnippet = `<vd-divider></vd-divider>`;

  allImplementationSnippet = `<vd-divider
  [dashed]="false"
  color="primary"
  direction="horizontal"
  [inset]="false"
></vd-divider>`;

  // API Reference data
  apiData = [
    {
      property: 'dashed',
      type: 'boolean',
      default: 'false',
      required: 'No',
      description: 'Whether the divider line should be dashed',
    },
    {
      property: 'color',
      type: 'string',
      default: "'primary'",
      required: 'No',
      description: 'Color of the divider',
    },
    {
      property: 'direction',
      type: 'string',
      default: "'horizontal'",
      required: 'No',
      description: 'Direction of the divider (horizontal or vertical)',
    },
    {
      property: 'inset',
      type: 'boolean',
      default: 'false',
      required: 'No',
      description: 'Whether the divider should be inset',
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

  directionOptions: VdSelectOption<string>[] = [
    { label: 'Horizontal', value: 'horizontal' },
    { label: 'Vertical', value: 'vertical' },
  ];

  colorOptions: VdSelectOption<string>[] = [
    { label: 'Primary', value: 'primary' },
    { label: 'Secondary', value: 'secondary' },
  ];

  // Icon controls
  get codeSnippet(): string {
    const attrs: string[] = [];
    if (this.dashed) {
      attrs.push(`[dashed]="true"`);
    }
    if (this.color !== 'primary') {
      attrs.push(`color="${this.color}"`);
    }
    if (this.direction !== 'horizontal') {
      attrs.push(`direction="${this.direction}"`);
    }
    if (this.inset) {
      attrs.push(`[inset]="true"`);
    }
    const attributes = attrs.length ? '\n  ' + attrs.join('\n  ') : '';

    return `<vd-divider${attributes}
></vd-divider>`;
  }

  ngOnInit(): void {
    this.apiColumnsWithTemplate = this.apiColumns.map((col) =>
      col.key === 'property' ? { ...col, template: this.propertyBadge } : col,
    );
  }
}
