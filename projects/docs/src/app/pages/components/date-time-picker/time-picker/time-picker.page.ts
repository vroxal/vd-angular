import { Component, TemplateRef, ViewChild, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  VdTimePicker,
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
  selector: 'app-time-picker-page',
  imports: [
    VdTimePicker,
    VdDatatable,
    VdSelect,
    VdSwitch,
    VdBadge,
    FormsModule,
    CommonModule,
    DocPageHeader,
    CodeContainer,
  ],
  templateUrl: './time-picker.page.html',
  styleUrl: './time-picker.page.scss',
})
export default class TimePickerPage implements OnInit {
  // Time Picker
  timeValue = '';
  timeLabel = 'Select Time';
  timePlaceholder = 'Select time...';
  timeOptional = false;
  timeDisabled = false;
  timeState: 'success' | 'error' | 'warning' | null = null;

  @ViewChild('propertyBadge', { static: true }) propertyBadge!: TemplateRef<any>;

  // Code snippets
  importCodeSnippet = `import { VdTimePicker } from "vd-angular";`;

  basicSnippet = `<vd-time-picker
  label="Select Time"
  placeholder="Select time..."
  [(value)]="selectedTime"
></vd-time-picker>`;

  allApiSnippet = `<vd-time-picker
  label="Select Time"
  placeholder="Select time..."
  [(value)]="selectedTime"
  [optional]="true"
  [disabled]="false"
  state="success"
  leadingIcon="clock"
  helperText="Select a time in HH:MM format"
></vd-time-picker>`;

  // API Reference data
  apiData = [
    {
      property: 'label',
      type: 'string',
      default: '-',
      required: 'No',
      description: 'Label text displayed above the time picker',
    },
    {
      property: 'placeholder',
      type: 'string',
      default: "''",
      required: 'No',
      description: 'Placeholder text shown when no time is selected',
    },
    {
      property: 'value',
      type: 'string',
      default: "''",
      required: 'No',
      description: 'Currently selected time in HH:MM format',
    },
    {
      property: 'disabled',
      type: 'boolean',
      default: 'false',
      required: 'No',
      description: 'Whether the time picker is disabled',
    },
    {
      property: 'optional',
      type: 'boolean',
      default: 'false',
      required: 'No',
      description: 'Whether the time picker is optional',
    },
    {
      property: 'state',
      type: "'success' | 'error' | 'warning' | null",
      default: 'null',
      required: 'No',
      description: 'Visual state of the time picker',
    },
    {
      property: 'helperText',
      type: 'string',
      default: '-',
      required: 'No',
      description: 'Helper text displayed below the time picker',
    },
    {
      property: 'leadingIcon',
      type: 'string',
      default: '-',
      required: 'No',
      description: 'Icon displayed at the start',
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

  stateOptions: VdSelectOption<'success' | 'error' | 'warning' | null>[] = [
    { label: 'None', value: null },
    { label: 'Success', value: 'success' },
    { label: 'Error', value: 'error' },
    { label: 'Warning', value: 'warning' },
  ];

  get codeSnippet(): string {
    const attrs: string[] = [];
    if (this.timeLabel) {
      attrs.push(`label="${this.timeLabel}"`);
    }
    if (this.timePlaceholder) {
      attrs.push(`placeholder="${this.timePlaceholder}"`);
    }
    attrs.push(`[(value)]="selectedTime"`);
    if (this.timeOptional) {
      attrs.push(`[optional]="true"`);
    }
    if (this.timeDisabled) {
      attrs.push(`[disabled]="true"`);
    }
    if (this.timeState) {
      attrs.push(`state="${this.timeState}"`);
    }
    const attributes = attrs.length ? '\n  ' + attrs.join('\n  ') : '';

    return `<vd-time-picker${attributes}
></vd-time-picker>`;
  }

  ngOnInit(): void {
    this.apiColumnsWithTemplate = this.apiColumns.map((col) =>
      col.key === 'property' ? { ...col, template: this.propertyBadge } : col,
    );
  }
}
