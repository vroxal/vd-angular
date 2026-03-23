import { Component, TemplateRef, ViewChild, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  VdSelect,
  VdSelectOption,
  VdDatatable,
  VdDatatableColumn,
  VdSwitch,
  VdBadge,
} from 'vd-angular';

import DocPageHeader from '../../../components/doc-page-header/doc-page-header.component';
import CodeContainer from '../../../components/code-container/code-container.component';
import iconsJson from '@vroxal/vd-icons/dist/vd-icon.json';

@Component({
  selector: 'app-select-page',
  standalone: true,
  imports: [
    VdSelect,
    VdDatatable,
    VdSwitch,
    VdBadge,
    FormsModule,
    CommonModule,
    DocPageHeader,
    CodeContainer,
  ],
  templateUrl: './select.page.html',
  styleUrl: './select.page.scss',
})
export default class SelectPage implements OnInit {
  label = 'Select Label';
  placeholder = 'Choose an option...';
  value: string | null = null;
  optional = false;
  disabled = false;
  state: 'success' | 'error' | 'warning' | null = null;
  helperText = 'Helper text';
  hintText = 'Hint text';
  leadingIcon = '';
  trailingActionIcon = '';

  @ViewChild('propertyBadge', { static: true }) propertyBadge!: TemplateRef<any>;

  // Sample options
  fruitOptions: VdSelectOption<string>[] = [
    { label: 'Apple', value: 'apple' },
    { label: 'Banana', value: 'banana' },
    { label: 'Cherry', value: 'cherry' },
    { label: 'Durian', value: 'durian' },
    { label: 'Elderberry', value: 'elderberry' },
  ];

  countryOptions: VdSelectOption<string>[] = [
    { label: 'United States', value: 'us' },
    { label: 'United Kingdom', value: 'uk' },
    { label: 'Canada', value: 'ca' },
    { label: 'Australia', value: 'au' },
  ];

  disabledOptions: VdSelectOption<string>[] = [
    { label: 'Option 1', value: 'opt1' },
    { label: 'Option 2 (Disabled)', value: 'opt2', disabled: true },
    { label: 'Option 3', value: 'opt3' },
    { label: 'Option 4 (Disabled)', value: 'opt4', disabled: true },
  ];

  // Code snippets
  importCodeSnippet = `import { VdSelect, VdSelectOption } from "vd-angular";`;

  basicImplementationSnippet = `<vd-select
  label="Select a fruit"
  placeholder="Choose..."
  [(value)]="selectedFruit"
  [options]="fruitOptions"
></vd-select>

export class MyComponent {
  selectedFruit: string | null = null;
  fruitOptions: VdSelectOption<string>[] = [
    { label: 'Apple', value: 'apple' },
    { label: 'Banana', value: 'banana' },
    { label: 'Cherry', value: 'cherry' },
  ];
}`;

  allImplementationSnippet = `<vd-select
  label="Select Label"
  placeholder="Choose an option..."
  [(value)]="selectedValue"
  [options]="options"
  [optional]="false"
  [disabled]="false"
  state="success"
  helperText="Helper text"
  hintText="Hint text"
  leadingIcon="vd-icon-globe"
></vd-select>`;

  eventsSnippet = `<vd-select
  label="Select Country"
  placeholder="Choose..."
  [(value)]="selectedCountry"
  [options]="countryOptions"
  (valueChange)="onCountryChange($event)"
  (valueCommit)="onCountryCommit($event)"
></vd-select>`;

  eventsComponentSnippet = `export class MyComponent {
  selectedCountry: string | null = null;
  countryOptions: VdSelectOption<string>[] = [
    { label: 'United States', value: 'us' },
    { label: 'Canada', value: 'ca' },
  ];

  onCountryChange(value: string | null): void {
    console.log('Live value changed:', value);
  }

  onCountryCommit(value: string | null): void {
    console.log('Final committed value:', value);
    // Trigger actions like data fetching
  }
}`;

  disabledOptionsSnippet = `<vd-select
  label="Select with Disabled Options"
  placeholder="Some options are disabled..."
  [(value)]="selectedValue"
  [options]="disabledOptions"
></vd-select>

export class MyComponent {
  disabledOptions: VdSelectOption<string>[] = [
    { label: 'Option 1', value: 'opt1' },
    { label: 'Option 2 (Disabled)', value: 'opt2', disabled: true },
    { label: 'Option 3', value: 'opt3' },
  ];
}`;

  // API Reference data
  apiData = [
    {
      property: 'label',
      type: 'string',
      default: '-',
      required: 'No',
      description: 'Label text displayed above the select',
    },
    {
      property: 'placeholder',
      type: 'string',
      default: "''",
      required: 'No',
      description: 'Placeholder text shown when no option is selected',
    },
    {
      property: 'value',
      type: 'T | null',
      default: 'null',
      required: 'No',
      description: 'Currently selected value',
    },
    {
      property: 'options',
      type: 'VdSelectOption<T>[]',
      default: '[]',
      required: 'No',
      description: 'Array of options to display in the dropdown',
    },
    {
      property: 'optional',
      type: 'boolean',
      default: 'false',
      required: 'No',
      description: 'Whether the select is optional',
    },
    {
      property: 'disabled',
      type: 'boolean',
      default: 'false',
      required: 'No',
      description: 'Whether the select is disabled',
    },
    {
      property: 'state',
      type: "'success' | 'error' | 'warning' | null",
      default: 'null',
      required: 'No',
      description: 'Visual state of the select',
    },
    {
      property: 'helperText',
      type: 'string',
      default: '-',
      required: 'No',
      description: 'Helper text displayed below the select',
    },
    {
      property: 'hintText',
      type: 'string',
      default: '-',
      required: 'No',
      description: 'Hint text shown in tooltip',
    },
    {
      property: 'leadingIcon',
      type: 'string',
      default: '-',
      required: 'No',
      description: 'Icon displayed before the select value',
    },
    {
      property: 'trailingActionIcon',
      type: 'string',
      default: '-',
      required: 'No',
      description: 'Icon button displayed after the select value',
    },
  ];

  selectOptionInterfaceData = [
    {
      property: 'label',
      type: 'string',
      default: '-',
      required: 'Yes',
      description: 'Text displayed for this option',
    },
    {
      property: 'value',
      type: 'T',
      default: '-',
      required: 'Yes',
      description: 'The value associated with this option',
    },
    {
      property: 'disabled',
      type: 'boolean',
      default: 'false',
      required: 'No',
      description: 'Whether this option is disabled',
    },
  ];

  outputsData = [
    {
      property: 'valueChange',
      type: 'EventEmitter<T | null>',
      description: 'Emitted whenever a new option is selected',
    },
    {
      property: 'valueCommit',
      type: 'EventEmitter<T | null>',
      description: 'Emitted when the select loses focus',
    },
    {
      property: 'inputFocus',
      type: 'EventEmitter<void>',
      description: 'Emitted when the select receives focus',
    },
  ];

  apiColumns: VdDatatableColumn[] = [
    { key: 'property', title: 'Property' },
    { key: 'type', title: 'Type' },
    { key: 'default', title: 'Default' },
    { key: 'required', title: 'Required' },
    { key: 'description', title: 'Description' },
  ];

  eventsColumns: VdDatatableColumn[] = [
    { key: 'property', title: 'Event' },
    { key: 'type', title: 'Type' },
    { key: 'description', title: 'Description' },
  ];

  apiColumnsWithTemplate: VdDatatableColumn[] = [];
  eventsColumnsWithTemplate: VdDatatableColumn[] = [];

  stateOptions: VdSelectOption<'success' | 'error' | 'warning' | null>[] = [
    { label: 'None', value: null },
    { label: 'Success', value: 'success' },
    { label: 'Error', value: 'error' },
    { label: 'Warning', value: 'warning' },
  ];

  icons: VdSelectOption<string>[] = [
    { label: 'None', value: '' },
    ...Object.keys(iconsJson).map((key) => ({
      label: this.toLabel(key),
      value: `vd-icon-${key}`,
    })),
  ];

  private toLabel(key: string): string {
    return key
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  get codeSnippet(): string {
    const attrs: string[] = [];
    if (this.label) {
      attrs.push(`label="${this.label}"`);
    }
    if (this.placeholder) {
      attrs.push(`placeholder="${this.placeholder}"`);
    }
    attrs.push(`[(value)]="selectedValue"`);
    attrs.push(`[options]="options"`);
    if (this.optional) {
      attrs.push(`[optional]="true"`);
    }
    if (this.disabled) {
      attrs.push(`[disabled]="true"`);
    }
    if (this.state) {
      attrs.push(`state="${this.state}"`);
    }
    if (this.helperText) {
      attrs.push(`helperText="${this.helperText}"`);
    }
    if (this.hintText) {
      attrs.push(`hintText="${this.hintText}"`);
    }
    if (this.leadingIcon) {
      attrs.push(`leadingIcon="${this.leadingIcon}"`);
    }
    if (this.trailingActionIcon) {
      attrs.push(`trailingActionIcon="${this.trailingActionIcon}"`);
    }
    const attributes = attrs.length ? '\n  ' + attrs.join('\n  ') : '';

    return `<vd-select${attributes}
></vd-select>`;
  }

  onValueChange(value: string | null): void {}

  ngOnInit(): void {
    this.apiColumnsWithTemplate = this.apiColumns.map((col) =>
      col.key === 'property' ? { ...col, template: this.propertyBadge } : col,
    );
    this.eventsColumnsWithTemplate = this.eventsColumns.map((col) =>
      col.key === 'property' ? { ...col, template: this.propertyBadge } : col,
    );
  }
}
