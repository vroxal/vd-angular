import { Component, TemplateRef, ViewChild, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  VdVerificationCodeInput,
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
  selector: 'app-input-code-page',
  standalone: true,
  imports: [
    VdVerificationCodeInput,
    VdDatatable,
    VdSelect,
    VdSwitch,
    VdBadge,
    FormsModule,
    CommonModule,
    DocPageHeader,
    CodeContainer,
  ],
  templateUrl: './verification-code-input.page.html',
  styleUrl: './verification-code-input.page.scss',
})
export default class VerificationCodeInputPage implements OnInit {
  // Playground state
  length: 4 | 6 = 6;
  value = '';
  disabled = false;
  state: 'error' | null = null;
  label = 'Verification Code';
  helperText = '';
  mask = false;
  autoFocus = false;

  @ViewChild('propertyBadge', { static: true }) propertyBadge!: TemplateRef<any>;

  // Code snippets
  importCodeSnippet = 'import { VdVerificationCodeInput } from "vd-angular";';

  basicImplementationSnippet = `<vd-verification-code-input
  label="Verification Code"
  [length]="6"
  [(value)]="code"
  (completed)="onCodeCompleted(\$event)"
></vd-verification-code-input>`;

  fourDigitSnippet = `<vd-verification-code-input
  label="PIN"
  [length]="4"
  [(value)]="pin"
  [mask]="true"
  (completed)="onPinCompleted(\$event)"
></vd-verification-code-input>`;

  eventsSnippet = `<vd-verification-code-input
  label="OTP"
  [length]="6"
  [(value)]="otp"
  (valueChange)="onOtpChange(\$event)"
  (completed)="onOtpCompleted(\$event)"
></vd-verification-code-input>`;

  eventsComponentSnippet = `export class MyComponent {
  otp = '';

  onOtpChange(value: string): void {
    console.log('Current value:', value);
  }

  onOtpCompleted(code: string): void {
    console.log('Completed code:', code);
    // Submit the code
  }
}`;

  errorStateSnippet = `<vd-verification-code-input
  label="Verification Code"
  [length]="6"
  state="error"
  helperText="Invalid code. Please try again."
  [(value)]="code"
></vd-verification-code-input>`;

  disabledSnippet = `<vd-verification-code-input
  label="Verification Code"
  [length]="6"
  [disabled]="true"
  value="123456"
></vd-verification-code-input>`;

  // API Reference data
  apiData = [
    {
      property: 'length',
      type: '4 | 6',
      default: '6',
      required: 'No',
      description: 'Number of input cells (4 or 6 digits)',
    },
    {
      property: 'value',
      type: 'string',
      default: "''",
      required: 'No',
      description: 'Current value of the code input',
    },
    {
      property: 'disabled',
      type: 'boolean',
      default: 'false',
      required: 'No',
      description: 'Whether the input is disabled',
    },
    {
      property: 'state',
      type: "'error' | null",
      default: 'null',
      required: 'No',
      description: 'Visual state of the input (error or default)',
    },
    {
      property: 'label',
      type: 'string',
      default: '-',
      required: 'No',
      description: 'Label text displayed above the input cells',
    },
    {
      property: 'helperText',
      type: 'string',
      default: '-',
      required: 'No',
      description: 'Helper text displayed below the input cells',
    },
    {
      property: 'autoFocus',
      type: 'boolean',
      default: 'false',
      required: 'No',
      description: 'Whether to auto-focus the first cell on initialization',
    },
    {
      property: 'mask',
      type: 'boolean',
      default: 'false',
      required: 'No',
      description: 'Whether to mask the entered digits (password mode)',
    },
  ];

  outputsData = [
    {
      property: 'valueChange',
      type: 'EventEmitter<string>',
      description: 'Emitted on every digit change',
    },
    {
      property: 'completed',
      type: 'EventEmitter<string>',
      description: 'Emitted when all cells are filled',
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

  lengthOptions: VdSelectOption<4 | 6>[] = [
    { label: '4 digits', value: 4 },
    { label: '6 digits', value: 6 },
  ];

  stateOptions: VdSelectOption<'error' | null>[] = [
    { label: 'None', value: null },
    { label: 'Error', value: 'error' },
  ];

  get codeSnippet(): string {
    const attrs: string[] = [];
    if (this.label) {
      attrs.push(`label="${this.label}"`);
    }
    attrs.push(`[length]="${this.length}"`);
    attrs.push(`[(value)]="code"`);
    if (this.disabled) {
      attrs.push(`[disabled]="true"`);
    }
    if (this.state) {
      attrs.push(`state="${this.state}"`);
    }
    if (this.helperText) {
      attrs.push(`helperText="${this.helperText}"`);
    }
    if (this.mask) {
      attrs.push(`[mask]="true"`);
    }
    if (this.autoFocus) {
      attrs.push(`[autoFocus]="true"`);
    }
    attrs.push(`(completed)="onCodeCompleted($event)"`);

    const attributes = attrs.length ? '\n  ' + attrs.join('\n  ') : '';
    return `<vd-verification-code-input${attributes}\n></vd-verification-code-input>`;
  }

  onChange(value: string): void {}
  onCompleted(code: string): void {
    // Submit the code
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
