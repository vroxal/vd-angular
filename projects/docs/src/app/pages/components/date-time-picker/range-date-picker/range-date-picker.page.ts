import { Component, TemplateRef, ViewChild, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  VdRangeDatePicker,
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
  selector: 'app-range-date-picker-page',
  imports: [
    VdRangeDatePicker,
    VdDatatable,
    VdSelect,
    VdSwitch,
    VdBadge,
    FormsModule,
    CommonModule,
    DocPageHeader,
    CodeContainer,
  ],
  templateUrl: './range-date-picker.page.html',
  styleUrl: './range-date-picker.page.scss',
})
export default class RangeDatePickerPage implements OnInit {
  // Range Date Picker
  rangeDateValue: { start: Date | null; end: Date | null } | null = null;
  rangeDateLabel = 'Select Date Range';
  rangeDatePlaceholder = 'Select date range...';
  rangeDateOptional = false;
  rangeDateDisabled = false;
  rangeDateState: 'success' | 'error' | 'warning' | null = null;
  rangeDateDropdownPosition:
    | 'bottom-left'
    | 'bottom-center'
    | 'bottom-right'
    | 'top-left'
    | 'top-center'
    | 'top-right' = 'bottom-left';

  @ViewChild('propertyBadge', { static: true }) propertyBadge!: TemplateRef<any>;

  // Code snippets
  importCodeSnippet = `import { VdRangeDatePicker } from "vd-angular";`;

  basicUsageSnippet = `<vd-range-date-picker
  label="Select Date Range"
  placeholder="Choose a date range..."
  [(value)]="selectedDateRange"
></vd-range-date-picker>

// TypeScript
selectedDateRange: { start: Date | null; end: Date | null } | null = null;`;

  dropdownPositionSnippet = `<!-- Bottom Positions -->\n<vd-range-date-picker
  label="Bottom Left (Default)"
  dropdownPosition="bottom-left"
  [(value)]="dateRange1"
></vd-range-date-picker>

<vd-range-date-picker
  label="Bottom Center"
  dropdownPosition="bottom-center"
  [(value)]="dateRange2"
></vd-range-date-picker>

<vd-range-date-picker
  label="Bottom Right"
  dropdownPosition="bottom-right"
  [(value)]="dateRange3"
></vd-range-date-picker>

<!-- Top Positions -->
<vd-range-date-picker
  label="Top Left"
  dropdownPosition="top-left"
  [(value)]="dateRange4"
></vd-range-date-picker>

<vd-range-date-picker
  label="Top Center"
  dropdownPosition="top-center"
  [(value)]="dateRange5"
></vd-range-date-picker>

<vd-range-date-picker
  label="Top Right"
  dropdownPosition="top-right"
  [(value)]="dateRange6"
></vd-range-date-picker>`;

  allApiSnippet = `<vd-range-date-picker
  label="Select Date Range"
  hintText="Choose your preferred date range"
  helperText="Select a date range from the calendar"
  placeholder="Select date range..."
  [(value)]="selectedDateRange"
  [optional]="true"
  [disabled]="false"
  leadingIcon="vd-icon-calendar"
  state="success"
  dropdownPosition="bottom-left"
  [minDate]="minDate"
  [maxDate]="maxDate"
  (valueChange)="onDateRangeChange($event)"
  (inputFocus)="onFocus()"
  (inputBlur)="onBlur()"
></vd-range-date-picker>

// TypeScript
selectedDateRange: { start: Date | null; end: Date | null } | null = null;
minDate = new Date('2024-01-01');
maxDate = new Date('2026-12-31');

onDateRangeChange(value: { start: Date | null; end: Date | null } | null) {
  console.log('Date range changed:', value);
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
      description: 'Label text displayed above the date range picker',
    },
    {
      property: 'placeholder',
      type: 'string',
      default: "'Select date range'",
      required: 'No',
      description: 'Placeholder text shown when no date range is selected',
    },
    {
      property: 'value',
      type: 'DateRange | null',
      default: 'null',
      required: 'No',
      description: 'Currently selected date range with start and end dates',
    },
    {
      property: 'disabled',
      type: 'boolean',
      default: 'false',
      required: 'No',
      description: 'Whether the date range picker is disabled',
    },
    {
      property: 'optional',
      type: 'boolean',
      default: 'false',
      required: 'No',
      description: 'Whether the date range picker is optional',
    },
    {
      property: 'state',
      type: "'success' | 'error' | 'warning' | null",
      default: 'null',
      required: 'No',
      description: 'Visual state of the date range picker',
    },
    {
      property: 'helperText',
      type: 'string',
      default: '-',
      required: 'No',
      description: 'Helper text displayed below the date range picker',
    },
    {
      property: 'hintText',
      type: 'string',
      default: '-',
      required: 'No',
      description: 'Hint text displayed in tooltip on ? icon next to label',
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
      type: 'EventEmitter<DateRange | null>',
      description: 'Emitted when the selected date range changes',
      format: '{ start: Date | null, end: Date | null } or null',
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
    if (this.rangeDateLabel) {
      attrs.push(`label="${this.rangeDateLabel}"`);
    }
    if (this.rangeDatePlaceholder) {
      attrs.push(`placeholder="${this.rangeDatePlaceholder}"`);
    }
    attrs.push(`[(value)]="selectedDateRange"`);
    if (this.rangeDateOptional) {
      attrs.push(`[optional]="true"`);
    }
    if (this.rangeDateDisabled) {
      attrs.push(`[disabled]="true"`);
    }
    if (this.rangeDateState) {
      attrs.push(`state="${this.rangeDateState}"`);
    }
    if (this.rangeDateDropdownPosition !== 'bottom-left') {
      attrs.push(`dropdownPosition="${this.rangeDateDropdownPosition}"`);
    }
    const attributes = attrs.length ? '\n  ' + attrs.join('\n  ') : '';

    return `<vd-range-date-picker${attributes}
></vd-range-date-picker>`;
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
