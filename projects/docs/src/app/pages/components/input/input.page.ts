import { Component, TemplateRef, ViewChild, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  VdInput,
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
  selector: 'app-input-page',
  standalone: true,
  imports: [
    VdInput,
    VdDatatable,
    VdSelect,
    VdSwitch,
    VdBadge,
    FormsModule,
    CommonModule,
    DocPageHeader,
    CodeContainer,
  ],
  templateUrl: './input.page.html',
  styleUrl: './input.page.scss',
})
export default class InputPage implements OnInit {
  label = 'Input Label';
  placeholder = 'Enter text...';
  value = '';
  optional = false;
  disabled = false;
  state: 'success' | 'error' | 'warning' | null = null;
  helperText = 'Helper text';
  hintText = 'Hint text';
  type: 'text' | 'password' = 'text';
  leadingIcon = '';
  trailingActionIcon = '';
  maxInputCount: number | null = null;

  @ViewChild('propertyBadge', { static: true }) propertyBadge!: TemplateRef<any>;

  // Code snippets
  importCodeSnippet = 'import { VdInput } from "vd-angular";';

  basicImplementationSnippet = `<vd-input
	label="Input Label"
	placeholder="Enter text..."
	[(value)]="inputValue"
></vd-input>`;

  allImplementationSnippet = `<vd-input
	label="Input Label"
	placeholder="Enter text..."
	[(value)]="inputValue"
	[optional]="false"
	[disabled]="false"
	state="success"
	helperText="Helper text"
	hintText="Hint text"
	leadingIcon="vd-icon-user"
	trailingActionIcon="vd-icon-eye"
	type="text"
	[maxInputCount]="40"
></vd-input>`;

  eventsSnippet = `<vd-input
	label="Email"
	placeholder="Enter email"
	[(value)]="email"
	(valueChange)="onEmailChange($event)"
	(valueCommit)="onEmailCommit($event)"
	(trailingActionClick)="onClearClick()"
	trailingActionIcon="vd-icon-close"
></vd-input>`;

  eventsComponentSnippet = `export class MyComponent {
	email = '';

	onEmailChange(value: string): void {
		console.log('Live value', value);
	}

	onEmailCommit(value: string): void {
		console.log('Committed value', value);
	}

	onClearClick(): void {
		this.email = '';
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
      type: 'string',
      default: "''",
      required: 'No',
      description: 'Current value of the input',
    },
    {
      property: 'type',
      type: "'text' | 'password'",
      default: "'text'",
      required: 'No',
      description: 'Input type',
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
      property: 'maxInputCount',
      type: 'number',
      default: '-',
      required: 'No',
      description: 'Maximum character count and counter display',
    },
  ];

  outputsData = [
    {
      property: 'valueChange',
      type: 'EventEmitter<string>',
      description: 'Emitted on every input change',
    },
    {
      property: 'valueCommit',
      type: 'EventEmitter<string>',
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

  typeOptions: VdSelectOption<'text' | 'password'>[] = [
    { label: 'Text', value: 'text' },
    { label: 'Password', value: 'password' },
  ];

  maxInputOptions: VdSelectOption<number | null>[] = [
    { label: 'None', value: null },
    { label: '20', value: 20 },
    { label: '40', value: 40 },
    { label: '80', value: 80 },
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
    if (this.type !== 'text') {
      attrs.push(`type="${this.type}"`);
    }
    if (this.maxInputCount !== null && this.maxInputCount !== undefined) {
      attrs.push(`[maxInputCount]="${this.maxInputCount}"`);
    }
    const attributes = attrs.length ? '\n  ' + attrs.join('\n  ') : '';

    return `<vd-input${attributes}
></vd-input>`;
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
