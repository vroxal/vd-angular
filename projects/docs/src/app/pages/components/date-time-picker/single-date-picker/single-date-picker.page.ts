import { Component, TemplateRef, ViewChild, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  VdSingleDatePicker,
  VdDatatable,
  VdDatatableColumn,
  VdSelect,
  VdSelectOption,
  VdSwitch,
  VdBadge,
} from 'vd-angular';

import DocPageHeader from '../../../../components/doc-page-header/doc-page-header.component';
import CodeContainer from '../../../../components/code-container/code-container.component';

@Component({
  selector: 'app-single-date-picker-page',
  imports: [
    VdSingleDatePicker,
    VdDatatable,
    VdSelect,
    VdSwitch,
    VdBadge,
    FormsModule,
    CommonModule,
    DocPageHeader,
    CodeContainer,
  ],
  templateUrl: './single-date-picker.page.html',
  styleUrl: './single-date-picker.page.scss',
})
export default class SingleDatePickerPage implements OnInit {
  // Single Date Picker
  singleDateValue: Date | null = null;
  singleDateLabel = 'Select Date';
  singleDatePlaceholder = 'Select date...';
  singleDateOptional = false;
  singleDateDisabled = false;
  singleDateState: 'success' | 'error' | 'warning' | null = null;
  singleDateShowMonthYearSelector = false;
  singleDateDropdownPosition:
    | 'bottom-left'
    | 'bottom-center'
    | 'bottom-right'
    | 'top-left'
    | 'top-center'
    | 'top-right' = 'bottom-left';

  @ViewChild('propertyBadge', { static: true }) propertyBadge!: TemplateRef<any>;

  // Code snippets
  importCodeSnippet = `import { VdSingleDatePicker } from "vd-angular";`;

  basicUsageSnippet = `<vd-single-date-picker
  label="Select Date"
  placeholder="Choose a date..."
  [(value)]="selectedDate"
></vd-single-date-picker>

// TypeScript
selectedDate: Date | null = null;`;

  withMonthYearSelectorSnippet = `<vd-single-date-picker
  label="Select Date"
  placeholder="Select date..."
  [(value)]="selectedDate"
  [showMonthYearSelector]="true"
></vd-single-date-picker>

// TypeScript
selectedDate: Date | null = null;`;

  dropdownPositionSnippet = `<!-- Bottom Positions -->\n<vd-single-date-picker
  label="Bottom Left (Default)"
  dropdownPosition="bottom-left"
  [(value)]="date1"
></vd-single-date-picker>

<vd-single-date-picker
  label="Bottom Center"
  dropdownPosition="bottom-center"
  [(value)]="date2"
></vd-single-date-picker>

<vd-single-date-picker
  label="Bottom Right"
  dropdownPosition="bottom-right"
  [(value)]="date3"
></vd-single-date-picker>

<!-- Top Positions -->
<vd-single-date-picker
  label="Top Left"
  dropdownPosition="top-left"
  [(value)]="date4"
></vd-single-date-picker>

<vd-single-date-picker
  label="Top Center"
  dropdownPosition="top-center"
  [(value)]="date5"
></vd-single-date-picker>

<vd-single-date-picker
  label="Top Right"
  dropdownPosition="top-right"
  [(value)]="date6"
></vd-single-date-picker>`;

  allApiSnippet = `<vd-single-date-picker
  label="Select Date"
  hintText="Choose your preferred date"
  helperText="Select a date from the calendar"
  placeholder="Select date..."
  [(value)]="selectedDate"
  [optional]="true"
  [disabled]="false"
  leadingIcon="vd-icon-calendar"
  state="success"
  [showMonthYearSelector]="true"
  dropdownPosition="bottom-left"
  [minDate]="minDate"
  [maxDate]="maxDate"
  (valueChange)="onDateChange($event)"
  (inputFocus)="onFocus()"
  (inputBlur)="onBlur()"
></vd-single-date-picker>

// TypeScript
selectedDate: Date | null = null;
minDate = new Date('2024-01-01');
maxDate = new Date('2026-12-31');

onDateChange(value: Date | null) {
  console.log('Date changed:', value);
}

onFocus() {
  console.log('Input focused');
}

onBlur() {
  console.log('Input blurred');
}`;

  // API Reference data
  apiData = [
    {
      property: 'label',
      type: 'string',
      default: '-',
      required: 'No',
      description: 'Label text displayed above the date picker',
    },
    {
      property: 'placeholder',
      type: 'string',
      default: "'Select date'",
      required: 'No',
      description: 'Placeholder text shown when no date is selected',
    },
    {
      property: 'value',
      type: 'Date | null',
      default: 'null',
      required: 'No',
      description: 'Currently selected date',
    },
    {
      property: 'disabled',
      type: 'boolean',
      default: 'false',
      required: 'No',
      description: 'Whether the date picker is disabled',
    },
    {
      property: 'optional',
      type: 'boolean',
      default: 'false',
      required: 'No',
      description: 'Whether the date picker is optional',
    },
    {
      property: 'state',
      type: "'success' | 'error' | 'warning' | null",
      default: 'null',
      required: 'No',
      description: 'Visual state of the date picker',
    },
    {
      property: 'helperText',
      type: 'string',
      default: '-',
      required: 'No',
      description: 'Helper text displayed below the date picker',
    },
    {
      property: 'hintText',
      type: 'string',
      default: '-',
      required: 'No',
      description: 'Hint text displayed in tooltip on ? icon next to label',
    },
    {
      property: 'showMonthYearSelector',
      type: 'boolean',
      default: 'false',
      required: 'No',
      description: 'Whether to show month and year selectors',
    },
    {
      property: 'dropdownPosition',
      type: "'bottom-left' | 'bottom-center' | 'bottom-right' | 'top-left' | 'top-center' | 'top-right'",
      default: "'bottom-left'",
      required: 'No',
      description: 'Position of the dropdown calendar relative to the input field',
    },
    {
      property: 'minDate',
      type: 'Date',
      default: '-',
      required: 'No',
      description: 'Minimum selectable date',
    },
    {
      property: 'maxDate',
      type: 'Date',
      default: '-',
      required: 'No',
      description: 'Maximum selectable date',
    },
    {
      property: 'leadingIcon',
      type: 'string',
      default: '-',
      required: 'No',
      description: 'Icon displayed at the start of the input',
    },
  ];

  // Output API Reference data
  outputApiData = [
    {
      property: 'valueChange',
      type: 'EventEmitter<Date | null>',
      description: 'Emitted when the selected date changes',
      format: 'Date object or null',
    },
    {
      property: 'inputFocus',
      type: 'EventEmitter<void>',
      description: 'Emitted when the input receives focus',
      format: 'No payload',
    },
    {
      property: 'inputBlur',
      type: 'EventEmitter<void>',
      description: 'Emitted when the input loses focus',
      format: 'No payload',
    },
  ];

  apiColumns: VdDatatableColumn[] = [
    { key: 'property', title: 'Property' },
    { key: 'type', title: 'Type' },
    { key: 'default', title: 'Default' },
    { key: 'required', title: 'Required' },
    { key: 'description', title: 'Description' },
  ];

  outputApiColumns: VdDatatableColumn[] = [
    { key: 'property', title: 'Property' },
    { key: 'type', title: 'Type' },
    { key: 'description', title: 'Description' },
    { key: 'format', title: 'Format' },
  ];

  apiColumnsWithTemplate: VdDatatableColumn[] = [];
  outputApiColumnsWithTemplate: VdDatatableColumn[] = [];

  stateOptions: VdSelectOption<'success' | 'error' | 'warning' | null>[] = [
    { label: 'None', value: null },
    { label: 'Success', value: 'success' },
    { label: 'Error', value: 'error' },
    { label: 'Warning', value: 'warning' },
  ];

  dropdownPositionOptions: VdSelectOption<
    'bottom-left' | 'bottom-center' | 'bottom-right' | 'top-left' | 'top-center' | 'top-right'
  >[] = [
    { label: 'Bottom Left', value: 'bottom-left' },
    { label: 'Bottom Center', value: 'bottom-center' },
    { label: 'Bottom Right', value: 'bottom-right' },
    { label: 'Top Left', value: 'top-left' },
    { label: 'Top Center', value: 'top-center' },
    { label: 'Top Right', value: 'top-right' },
  ];

  get codeSnippet(): string {
    const attrs: string[] = [];
    if (this.singleDateLabel) {
      attrs.push(`label="${this.singleDateLabel}"`);
    }
    if (this.singleDatePlaceholder) {
      attrs.push(`placeholder="${this.singleDatePlaceholder}"`);
    }
    attrs.push(`[(value)]="selectedDate"`);
    if (this.singleDateOptional) {
      attrs.push(`[optional]="true"`);
    }
    if (this.singleDateDisabled) {
      attrs.push(`[disabled]="true"`);
    }
    if (this.singleDateState) {
      attrs.push(`state="${this.singleDateState}"`);
    }
    if (this.singleDateShowMonthYearSelector) {
      attrs.push(`[showMonthYearSelector]="true"`);
    }
    if (this.singleDateDropdownPosition !== 'bottom-left') {
      attrs.push(`dropdownPosition="${this.singleDateDropdownPosition}"`);
    }
    const attributes = attrs.length ? '\n  ' + attrs.join('\n  ') : '';

    return `<vd-single-date-picker${attributes}
></vd-single-date-picker>`;
  }

  ngOnInit(): void {
    this.apiColumnsWithTemplate = this.apiColumns.map((col) =>
      col.key === 'property' ? { ...col, template: this.propertyBadge } : col,
    );
    this.outputApiColumnsWithTemplate = this.outputApiColumns.map((col) =>
      col.key === 'property' ? { ...col, template: this.propertyBadge } : col,
    );
  }
}
