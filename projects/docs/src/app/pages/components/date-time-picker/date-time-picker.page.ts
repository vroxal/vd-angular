import { Component, TemplateRef, ViewChild, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  VdDateTimePicker,
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
  selector: 'app-date-time-picker-page',
  imports: [
    VdDateTimePicker,
    VdDatatable,
    VdSelect,
    VdSwitch,
    VdBadge,
    FormsModule,
    CommonModule,
    DocPageHeader,
    CodeContainer,
  ],
  templateUrl: './date-time-picker.page.html',
  styleUrl: './date-time-picker.page.scss',
})
export default class DateTimePickerPage implements OnInit {
  // Date Time Picker (Combined)
  singleDateValue: Date | null = null;
  rangeDateValue: { start: Date | null; end: Date | null } | null = null;
  dateTimeLabel = 'Select Date and Time';
  dateTimePlaceholder = 'Select date and time...';
  dateTimeOptional = false;
  dateTimeDisabled = false;
  dateTimeState: 'success' | 'error' | 'warning' | null = null;
  dateTimeMode: 'single' | 'range' = 'single';
  dateTimeWithTime = false;
  dateTimeDropdownPosition:
    | 'bottom-left'
    | 'bottom-center'
    | 'bottom-right'
    | 'top-left'
    | 'top-center'
    | 'top-right' = 'bottom-left';

  @ViewChild('propertyBadge', { static: true }) propertyBadge!: TemplateRef<any>;

  // Code snippets
  importCodeSnippet = `import { VdDateTimePicker } from "vd-angular";`;

  basicUsageSnippet = `<vd-date-time-picker
  label="Select Date"
  placeholder="Choose a date..."
  [(value)]="selectedDate"
></vd-date-time-picker>

// TypeScript
selectedDate: Date | null = null;`;

  singleModeSnippet = `<vd-date-time-picker
  mode="single"
  label="Select Date"
  placeholder="Select date..."
  [(value)]="selectedDate"
></vd-date-time-picker>

// TypeScript
selectedDate: Date | null = null;`;

  rangeModeSnippet = `<vd-date-time-picker
  mode="range"
  label="Select Date Range"
  placeholder="Select date range..."
  [(value)]="selectedDateRange"
></vd-date-time-picker>

// TypeScript
selectedDateRange: { start: Date | null; end: Date | null } | null = null;`;

  singleWithTimeSnippet = `<vd-date-time-picker
  mode="single"
  [withTime]="true"
  label="Select Date and Time"
  placeholder="Select date and time..."
  [(value)]="selectedDateTime"
></vd-date-time-picker>

// TypeScript
selectedDateTime: Date | null = null;`;

  rangeWithTimeSnippet = `<vd-date-time-picker
  mode="range"
  [withTime]="true"
  label="Select Date Range and Time"
  placeholder="Select date range and time..."
  [(value)]="selectedDateTimeRange"
></vd-date-time-picker>

// TypeScript
selectedDateTimeRange: { start: Date | null; end: Date | null } | null = null;`;

  dropdownPositionSnippet = `<!-- Bottom Positions -->
<vd-date-time-picker
  label="Bottom Left (Default)"
  dropdownPosition="bottom-left"
  [(value)]="date1"
></vd-date-time-picker>

<vd-date-time-picker
  label="Bottom Center"
  dropdownPosition="bottom-center"
  [(value)]="date2"
></vd-date-time-picker>

<vd-date-time-picker
  label="Bottom Right"
  dropdownPosition="bottom-right"
  [(value)]="date3"
></vd-date-time-picker>

<!-- Top Positions -->
<vd-date-time-picker
  label="Top Left"
  dropdownPosition="top-left"
  [(value)]="date4"
></vd-date-time-picker>

<vd-date-time-picker
  label="Top Center"
  dropdownPosition="top-center"
  [(value)]="date5"
></vd-date-time-picker>

<vd-date-time-picker
  label="Top Right"
  dropdownPosition="top-right"
  [(value)]="date6"
></vd-date-time-picker>`;

  allApiSnippet = `<vd-date-time-picker
  mode="single"
  [withTime]="true"
  label="Select Date and Time"
  hintText="Choose your preferred date and time"
  helperText="Select a date and time within the allowed range"
  placeholder="Select date and time..."
  [(value)]="selectedDateTime"
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
></vd-date-time-picker>

// TypeScript
selectedDateTime: Date | null = null;
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
      property: 'mode',
      type: "'single' | 'range'",
      default: "'single'",
      required: 'No',
      description: 'Picker mode - single date or date range',
    },
    {
      property: 'withTime',
      type: 'boolean',
      default: 'false',
      required: 'No',
      description: 'Whether to include time selection',
    },
    {
      property: 'label',
      type: 'string',
      default: '-',
      required: 'No',
      description: 'Label text displayed above the picker',
    },
    {
      property: 'placeholder',
      type: 'string',
      default: "'Select date'",
      required: 'No',
      description: 'Placeholder text shown when no value is selected',
    },
    {
      property: 'value',
      type: 'Date | DateRange | null',
      default: 'null',
      required: 'No',
      description: 'Currently selected value (date or date range)',
    },
    {
      property: 'disabled',
      type: 'boolean',
      default: 'false',
      required: 'No',
      description: 'Whether the picker is disabled',
    },
    {
      property: 'optional',
      type: 'boolean',
      default: 'false',
      required: 'No',
      description: 'Whether the picker is optional',
    },
    {
      property: 'state',
      type: "'success' | 'error' | 'warning' | null",
      default: 'null',
      required: 'No',
      description: 'Visual state of the picker',
    },
    {
      property: 'helperText',
      type: 'string',
      default: '-',
      required: 'No',
      description: 'Helper text displayed below the picker',
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
      description: 'Icon displayed at the start',
    },
  ];

  // Output API Reference data
  outputApiData = [
    {
      property: 'valueChange',
      type: 'EventEmitter<Date | DateRange | null>',
      description: 'Emitted when the selected value changes',
      format:
        'Single mode: Date object or null. Range mode: { start: Date | null, end: Date | null } or null',
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

  modeOptions: VdSelectOption<'single' | 'range'>[] = [
    { label: 'Single', value: 'single' },
    { label: 'Range', value: 'range' },
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
    attrs.push(`mode="${this.dateTimeMode}"`);
    if (this.dateTimeWithTime) {
      attrs.push(`[withTime]="true"`);
    }
    if (this.dateTimeLabel) {
      attrs.push(`label="${this.dateTimeLabel}"`);
    }
    if (this.dateTimePlaceholder) {
      attrs.push(`placeholder="${this.dateTimePlaceholder}"`);
    }
    attrs.push(`[(value)]="selectedValue"`);
    if (this.dateTimeOptional) {
      attrs.push(`[optional]="true"`);
    }
    if (this.dateTimeDisabled) {
      attrs.push(`[disabled]="true"`);
    }
    if (this.dateTimeState) {
      attrs.push(`state="${this.dateTimeState}"`);
    }
    if (this.dateTimeDropdownPosition !== 'bottom-left') {
      attrs.push(`dropdownPosition="${this.dateTimeDropdownPosition}"`);
    }
    const attributes = attrs.length ? '\n  ' + attrs.join('\n  ') : '';

    return `<vd-date-time-picker${attributes}
></vd-date-time-picker>`;
  }

  get currentValue() {
    return this.dateTimeMode === 'single' ? this.singleDateValue : this.rangeDateValue;
  }

  set currentValue(value: any) {
    if (this.dateTimeMode === 'single') {
      this.singleDateValue = value;
    } else {
      this.rangeDateValue = value;
    }
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
