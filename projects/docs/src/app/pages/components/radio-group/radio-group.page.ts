import { Component, TemplateRef, ViewChild, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  VdRadioGroup,
  VdRadioGroupItem,
  VdDatatable,
  VdDatatableColumn,
  VdBadge,
  VdSelect,
  VdSelectOption,
  VdSwitch,
} from 'vd-angular';

import DocPageHeader from '../../../components/doc-page-header/doc-page-header.component';
import CodeContainer from '../../../components/code-container/code-container.component';

@Component({
  selector: 'app-radio-group-page',
  standalone: true,
  imports: [
    VdRadioGroup,
    VdDatatable,
    VdBadge,
    VdSelect,
    VdSwitch,
    FormsModule,
    CommonModule,
    DocPageHeader,
    CodeContainer,
  ],
  templateUrl: './radio-group.page.html',
  styleUrl: './radio-group.page.scss',
})
export default class RadioGroupPage implements OnInit {
  direction: 'vertical' | 'horizontal' = 'vertical';
  selectedValue: string | number | null = 'email';
  playgroundDisabled = false;

  @ViewChild('propertyBadge', { static: true }) propertyBadge!: TemplateRef<any>;

  importCodeSnippet = 'import { VdRadioGroup, VdRadioGroupItem } from "vd-angular";';

  basicImplementationTypescriptSnippet = `export class MyComponent {
  items: VdRadioGroupItem[] = [
    { label: 'Email', value: 'email' },
    { label: 'SMS', value: 'sms' },
    { label: 'Push Notifications', value: 'push' },
  ];

  selectedValue: string | number | null = 'email';

  onValueChange(value: string | number): void {
    this.selectedValue = value;
    console.log('Selected:', value);
  }
}`;

  basicImplementationTemplateSnippet = `<vd-radio-group
  [items]="items"
  [value]="selectedValue"
  (valueChange)="onValueChange($event)"
></vd-radio-group>`;

  withDescriptionTypescriptSnippet = `export class MyComponent {
  items: VdRadioGroupItem[] = [
    {
      label: 'Standard Delivery',
      value: 'standard',
      description: 'Delivered in 5-7 business days',
    },
    {
      label: 'Express Delivery',
      value: 'express',
      description: 'Delivered in 1-2 business days',
    },
    {
      label: 'Same Day Delivery',
      value: 'same-day',
      description: 'Delivered within 24 hours',
    },
  ];

  selectedValue: string | number | null = 'standard';
}`;

  withDescriptionTemplateSnippet = `<vd-radio-group
  [items]="items"
  [value]="selectedValue"
  (valueChange)="selectedValue = $event"
></vd-radio-group>`;

  horizontalSnippet = `<vd-radio-group
  [items]="items"
  direction="horizontal"
  [value]="selectedValue"
  (valueChange)="selectedValue = $event"
></vd-radio-group>`;

  disabledGroupTemplateSnippet = `<!-- Disable the entire group -->
<vd-radio-group
  [items]="items"
  [value]="selectedValue"
  [disabled]="true"
></vd-radio-group>`;

  disabledGroupTypescriptSnippet = `export class MyComponent {
  items: VdRadioGroupItem[] = [
    { label: 'Email', value: 'email' },
    { label: 'SMS', value: 'sms' },
    { label: 'Push Notifications', value: 'push' },
  ];

  selectedValue: string | number | null = 'email';
}`;

  disabledItemsTemplateSnippet = `<!-- Disable individual items -->
<vd-radio-group
  [items]="items"
  [value]="selectedValue"
  (valueChange)="selectedValue = $event"
></vd-radio-group>`;

  disabledItemsTypescriptSnippet = `export class MyComponent {
  items: VdRadioGroupItem[] = [
    { label: 'Email', value: 'email' },
    { label: 'SMS', value: 'sms', disabled: true },
    { label: 'Push Notifications', value: 'push' },
  ];

  selectedValue: string | number | null = 'email';
}`;

  allImplementationSnippet = `<vd-radio-group
  [items]="items"
  [value]="selectedValue"
  direction="horizontal"
  [disabled]="false"
  name="my-radio-group"
  (valueChange)="onValueChange($event)"
></vd-radio-group>`;

  outputHandlingTemplateSnippet = `<vd-radio-group
  [items]="items"
  [value]="selectedValue"
  (valueChange)="onValueChange($event)"
></vd-radio-group>

<!-- Display selected value -->
<p>Selected: {{ selectedValue }}</p>`;

  outputHandlingComponentSnippet = `export class MyComponent {
  items: VdRadioGroupItem[] = [
    { label: 'Email', value: 'email' },
    { label: 'SMS', value: 'sms' },
    { label: 'Push Notifications', value: 'push' },
  ];

  selectedValue: string | number | null = null;

  onValueChange(value: string | number): void {
    this.selectedValue = value;
    // Perform additional logic
    console.log('Selected value:', value);
  }
}`;

  itemInterfaceData = [
    {
      property: 'label',
      type: 'string',
      required: 'Yes',
      description: 'Display text for the radio button item',
    },
    {
      property: 'value',
      type: 'string | number',
      required: 'Yes',
      description: 'Unique value emitted on selection',
    },
    {
      property: 'description',
      type: 'string',
      required: 'No',
      description: 'Supporting text displayed below the label',
    },
    {
      property: 'disabled',
      type: 'boolean',
      required: 'No',
      description: 'Disables this specific radio button item',
    },
  ];

  itemInterfaceColumns: VdDatatableColumn[] = [
    { key: 'property', title: 'Property' },
    { key: 'type', title: 'Type' },
    { key: 'required', title: 'Required' },
    { key: 'description', title: 'Description' },
  ];

  itemInterfaceColumnsWithTemplate: VdDatatableColumn[] = [];

  apiData = [
    {
      property: 'items',
      type: 'VdRadioGroupItem[]',
      default: '[]',
      required: 'Yes',
      description: 'List of radio button items',
    },
    {
      property: 'direction',
      type: "'vertical' | 'horizontal'",
      default: "'vertical'",
      required: 'No',
      description: 'Layout direction for the radio group',
    },
    {
      property: 'value',
      type: 'string | number | null',
      default: 'null',
      required: 'No',
      description: 'Currently selected value',
    },
    {
      property: 'disabled',
      type: 'boolean',
      default: 'false',
      required: 'No',
      description: 'Disables the entire group',
    },
    {
      property: 'name',
      type: 'string',
      default: 'auto-generated',
      required: 'No',
      description: 'HTML name attribute shared by all radio buttons in the group',
    },
  ];

  outputData = [
    {
      property: 'valueChange',
      type: 'EventEmitter<string | number>',
      description: 'Emits the selected value when a radio button is clicked',
    },
  ];

  apiColumns: VdDatatableColumn[] = [
    { key: 'property', title: 'Property' },
    { key: 'type', title: 'Type' },
    { key: 'default', title: 'Default' },
    { key: 'required', title: 'Required' },
    { key: 'description', title: 'Description' },
  ];

  outputColumns: VdDatatableColumn[] = [
    { key: 'property', title: 'Property' },
    { key: 'type', title: 'Type' },
    { key: 'description', title: 'Description' },
  ];

  apiColumnsWithTemplate: VdDatatableColumn[] = [];

  directionOptions: VdSelectOption<'vertical' | 'horizontal'>[] = [
    { label: 'Vertical', value: 'vertical' },
    { label: 'Horizontal', value: 'horizontal' },
  ];

  verticalItems: VdRadioGroupItem[] = [
    { label: 'Email', value: 'email' },
    { label: 'SMS', value: 'sms' },
    { label: 'Push Notifications', value: 'push' },
  ];

  horizontalItems: VdRadioGroupItem[] = [
    { label: 'Email', value: 'email' },
    { label: 'SMS', value: 'sms' },
    { label: 'Push Notifications', value: 'push' },
  ];

  withDescriptionItems: VdRadioGroupItem[] = [
    {
      label: 'Standard Delivery',
      value: 'standard',
      description: 'Delivered in 5-7 business days',
    },
    {
      label: 'Express Delivery',
      value: 'express',
      description: 'Delivered in 1-2 business days',
    },
    {
      label: 'Same Day Delivery',
      value: 'same-day',
      description: 'Delivered within 24 hours',
    },
  ];

  disabledGroupItems: VdRadioGroupItem[] = [
    { label: 'Email', value: 'email' },
    { label: 'SMS', value: 'sms' },
    { label: 'Push Notifications', value: 'push' },
  ];

  partialDisabledItems: VdRadioGroupItem[] = [
    { label: 'Email', value: 'email' },
    { label: 'SMS', value: 'sms', disabled: true },
    { label: 'Push Notifications', value: 'push' },
  ];

  playgroundItems: VdRadioGroupItem[] = [
    {
      label: 'Email',
      value: 'email',
      description: 'Receive updates via email',
    },
    {
      label: 'SMS',
      value: 'sms',
      description: 'Receive updates via text message',
    },
    {
      label: 'Push Notifications',
      value: 'push',
      description: 'Receive push notifications on your device',
    },
  ];

  get codeSnippet(): string {
    const attrs: string[] = [];
    if (this.direction === 'horizontal') {
      attrs.push('direction="horizontal"');
    }
    if (this.playgroundDisabled) {
      attrs.push('[disabled]="true"');
    }
    attrs.push('[items]="items"');
    attrs.push('[value]="selectedValue"');
    attrs.push('(valueChange)="selectedValue = $event"');
    const attributes = attrs.length ? '\n  ' + attrs.join('\n  ') : '';

    return `<vd-radio-group${attributes}\n></vd-radio-group>`;
  }

  onValueChange(value: string | number): void {
    this.selectedValue = value;
  }

  ngOnInit(): void {
    this.apiColumnsWithTemplate = this.apiColumns.map((col) =>
      col.key === 'property' ? { ...col, template: this.propertyBadge } : col,
    );
    this.itemInterfaceColumnsWithTemplate = this.itemInterfaceColumns.map((col) =>
      col.key === 'property' ? { ...col, template: this.propertyBadge } : col,
    );
  }
}
