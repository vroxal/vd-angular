import { Component, TemplateRef, ViewChild, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  VdNumberInput,
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
  selector: 'app-number-input-page',
  standalone: true,
  imports: [
    VdNumberInput,
    VdDatatable,
    VdSelect,
    VdSwitch,
    VdBadge,
    FormsModule,
    CommonModule,
    DocPageHeader,
    CodeContainer,
  ],
  templateUrl: './number-input.page.html',
  styleUrl: './number-input.page.scss',
})
export default class NumberInputPage implements OnInit {
  label = 'Amount';
  placeholder = 'Enter amount...';
  value: number | null = null;
  optional = false;
  disabled = false;
  state: 'success' | 'error' | 'warning' | null = null;
  helperText = 'Helper text';
  hintText = 'Hint text';
  leadingIcon = '';
  trailingActionIcon = '';
  min: number | null = null;
  max: number | null = null;
  step: number | null = null;

  @ViewChild('propertyBadge', { static: true }) propertyBadge!: TemplateRef<any>;

  // Code snippets
  importCodeSnippet = 'import { VdNumberInput } from "vd-angular";';

  basicImplementationSnippet = `<vd-number-input
  label="Amount"
  placeholder="Enter amount..."
  [(value)]="inputValue"
></vd-number-input>`;

  allImplementationSnippet = `<vd-number-input
  label="Amount"
  placeholder="Enter amount..."
  [(value)]="inputValue"
  [optional]="false"
  [disabled]="false"
  state="success"
  helperText="Helper text"
  hintText="Hint text"
  leadingIcon="vd-icon-rupee"
  trailingActionIcon="vd-icon-close"
  [min]="0"
  [max]="10000"
  [step]="0.01"
></vd-number-input>`;

  eventsSnippet = `<vd-number-input
  label="Phone Number"
  placeholder="Enter phone number"
  [(value)]="phone"
  (valueChange)="onPhoneChange($event)"
  (valueCommit)="onPhoneCommit($event)"
  (trailingActionClick)="onClearClick()"
  trailingActionIcon="vd-icon-close"
></vd-number-input>`;

  eventsComponentSnippet = `export class MyComponent {
  phone: number | null = null;

  onPhoneChange(value: number | null): void {
    console.log('Live value', value);
  }

  onPhoneCommit(value: number | null): void {
    console.log('Committed value', value);
  }

  onClearClick(): void {
    this.phone = null;
  }
}`;

  // API Reference data
  apiData = [
    {
      property: 'label',
      type: 'string',
      default: '-',
      required: 'No',
      description: 'Label text displayed above the input',
    },
    {
      property: 'placeholder',
      type: 'string',
      default: "''",
      required: 'No',
      description: 'Placeholder text shown when input is empty',
    },
    {
      property: 'value',
      type: 'number | null',
      default: 'null',
      required: 'No',
      description: 'Current logical numeric value of the input',
    },
    {
      property: 'optional',
      type: 'boolean',
      default: 'false',
      required: 'No',
      description: 'Whether the input is optional',
    },
    {
      property: 'disabled',
      type: 'boolean',
      default: 'false',
      required: 'No',
      description: 'Whether the input is disabled',
    },
    {
      property: 'readOnly',
      type: 'boolean',
      default: 'false',
      required: 'No',
      description: 'Whether the input is read-only',
    },
    {
      property: 'state',
      type: "'success' | 'error' | 'warning' | null",
      default: 'null',
      required: 'No',
      description: 'Visual state of the input',
    },
    {
      property: 'helperText',
      type: 'string',
      default: '-',
      required: 'No',
      description: 'Helper text displayed below the input',
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
      description: 'Icon displayed before the input value',
    },
    {
      property: 'trailingActionIcon',
      type: 'string',
      default: '-',
      required: 'No',
      description: 'Icon button displayed after the input value',
    },
    {
      property: 'min',
      type: 'number',
      default: '-',
      required: 'No',
      description: 'Minimum allowed value for the input',
    },
    {
      property: 'max',
      type: 'number',
      default: '-',
      required: 'No',
      description: 'Maximum allowed value for the input',
    },
    {
      property: 'step',
      type: "number | 'any'",
      default: '-',
      required: 'No',
      description: 'Step increment for the input',
    },
  ];

  outputsData = [
    {
      property: 'valueChange',
      type: 'EventEmitter<number | null>',
      description: 'Emitted on every input change',
    },
    {
      property: 'valueCommit',
      type: 'EventEmitter<number | null>',
      description: 'Emitted when the input loses focus',
    },
    {
      property: 'trailingActionClick',
      type: 'EventEmitter<void>',
      description: 'Emitted when the trailing action icon is clicked',
    },
    {
      property: 'inputFocus',
      type: 'EventEmitter<void>',
      description: 'Emitted when the input receives focus',
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

  numberOptions: VdSelectOption<number | null>[] = [
    { label: 'None', value: null },
    { label: '0', value: 0 },
    { label: '10', value: 10 },
    { label: '100', value: 100 },
  ];

  stepOptions: VdSelectOption<number | null>[] = [
    { label: 'None', value: null },
    { label: '1', value: 1 },
    { label: '0.1', value: 0.1 },
    { label: '0.01', value: 0.01 },
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
    attrs.push(`[(value)]="inputValue"`);
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
    if (this.min !== null && this.min !== undefined) {
      attrs.push(`[min]="${this.min}"`);
    }
    if (this.max !== null && this.max !== undefined) {
      attrs.push(`[max]="${this.max}"`);
    }
    if (this.step !== null && this.step !== undefined) {
      attrs.push(`[step]="${this.step}"`);
    }
    const attributes = attrs.length ? '\n  ' + attrs.join('\n  ') : '';

    return `<vd-number-input${attributes}
></vd-number-input>`;
  }

  onTrailingActionClick(): void {
    console.log('Trailing action clicked');
  }

  ngOnInit(): void {
    this.apiColumnsWithTemplate = this.apiColumns.map((col) =>
      col.key === 'property' ? { ...col, template: this.propertyBadge } : col,
    );
    this.eventsColumnsWithTemplate = this.eventsColumns.map((col) =>
      col.key === 'property' ? { ...col, template: this.propertyBadge } : col,
    );
  }
}
