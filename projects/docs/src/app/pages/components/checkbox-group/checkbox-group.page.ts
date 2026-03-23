import { Component, TemplateRef, ViewChild, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  VdCheckboxGroup,
  VdCheckboxGroupItem,
  VdDatatable,
  VdDatatableColumn,
  VdBadge,
  VdSelect,
  VdSelectOption,
} from 'vd-angular';

import DocPageHeader from '../../../components/doc-page-header/doc-page-header.component';
import CodeContainer from '../../../components/code-container/code-container.component';

@Component({
  selector: 'app-checkbox-group-page',
  standalone: true,
  imports: [
    VdCheckboxGroup,
    VdDatatable,
    VdBadge,
    VdSelect,
    FormsModule,
    CommonModule,
    DocPageHeader,
    CodeContainer,
  ],
  templateUrl: './checkbox-group.page.html',
  styleUrl: './checkbox-group.page.scss',
})
export default class CheckboxGroupPage implements OnInit {
  direction: 'vertical' | 'horizontal' = 'vertical';
  selectedValues: Array<string | number> = ['support'];
  horizontalSelectedValues: Array<string | number> = ['support'];

  @ViewChild('propertyBadge', { static: true }) propertyBadge!: TemplateRef<any>;

  importCodeSnippet = 'import { VdCheckboxGroup, VdCheckboxGroupItem } from "vd-angular";';

  basicImplementationTypescriptSnippet = `export class MyComponent {
  items: VdCheckboxGroupItem[] = [
    { label: 'Email', value: 'email' },
    { label: 'SMS', value: 'sms' },
    { label: 'Push Notifications', value: 'push' },
  ];

  selectedValues: Array<string | number> = ['email'];

  onGroupChange(values: Array<string | number>): void {
    this.selectedValues = values;
    console.log('Selected:', values);
  }
}`;

  basicImplementationTemplateSnippet = `<vd-checkbox-group
  [items]="items"
  [value]="selectedValues"
  (valueChange)="onGroupChange($event)"
></vd-checkbox-group>`;

  nestedImplementationTypescriptSnippet = `export class MyComponent {
  items: VdCheckboxGroupItem[] = [
    {
      label: 'Support',
      children: [
        { label: 'Phone', value: 'support-phone' },
        { label: 'Email', value: 'support-email' },
        { label: 'Chat', value: 'support-chat' },
      ],
    },
    {
      label: 'Marketing',
      children: [
        { label: 'Email', value: 'marketing-email' },
        { label: 'SMS', value: 'marketing-sms' },
      ],
    },
  ];

  selectedValues: Array<string | number> = [];

  onGroupChange(values: Array<string | number>): void {
    this.selectedValues = values;
  }
}`;

  nestedImplementationTemplateSnippet = `<vd-checkbox-group
  [items]="items"
  [value]="selectedValues"
  (valueChange)="onGroupChange($event)"
></vd-checkbox-group>`;

  allImplementationSnippet = `<vd-checkbox-group
  [items]="items"
  direction="horizontal"
  [value]="selectedValues"
  [disabled]="false"
  (valueChange)="onGroupChange($event)"
></vd-checkbox-group>`;

  outputHandlingTemplateSnippet = `<vd-checkbox-group
  [items]="items"
  [value]="selectedValues"
  (valueChange)="onGroupChange($event)"
></vd-checkbox-group>

<!-- Display selected values -->
<p>Selected: {{ selectedValues.join(', ') }}</p>`;

  outputHandlingComponentSnippet = `export class MyComponent {
  items: VdCheckboxGroupItem[] = [
    { label: 'Email', value: 'email' },
    { label: 'SMS', value: 'sms' },
    { label: 'Push Notifications', value: 'push' },
  ];

  selectedValues: Array<string | number> = [];

  onGroupChange(values: Array<string | number>): void {
    this.selectedValues = values;
    // Perform additional logic
    console.log('Selected values:', values);
  }
}`;

  itemInterfaceData = [
    {
      property: 'label',
      type: 'string',
      required: 'Yes',
      description: 'Display text for the checkbox item',
    },
    {
      property: 'value',
      type: 'string | number',
      required: 'No',
      description: 'Unique value emitted on selection. Falls back to label if not provided',
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
      description: 'Disables this specific checkbox item',
    },
    {
      property: 'children',
      type: 'VdCheckboxGroupItem[]',
      required: 'No',
      description: 'Nested child items. Parent becomes indeterminate when partially selected',
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
      type: 'VdCheckboxGroupItem[]',
      default: '[]',
      required: 'Yes',
      description: 'List of checkbox items, supports nested children',
    },
    {
      property: 'direction',
      type: "'vertical' | 'horizontal'",
      default: "'vertical'",
      required: 'No',
      description: 'Layout direction for the top-level list',
    },
    {
      property: 'value',
      type: '(string | number)[]',
      default: '[]',
      required: 'No',
      description: 'Array of selected item values',
    },
    {
      property: 'disabled',
      type: 'boolean',
      default: 'false',
      required: 'No',
      description: 'Disables the entire group',
    },
  ];

  outputData = [
    {
      property: 'valueChange',
      type: 'EventEmitter<(string | number)[]>',
      description: 'Emits updated selected values',
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

  items: VdCheckboxGroupItem[] = [
    {
      label: 'Support',
      children: [
        { label: 'Phone', value: 'support-phone' },
        { label: 'Email', value: 'support' },
        { label: 'Chat', value: 'support-chat' },
      ],
    },
    {
      label: 'Marketing',
      children: [
        { label: 'Email', value: 'marketing-email' },
        { label: 'SMS', value: 'marketing-sms' },
      ],
    },
  ];
  horizontalNestedItems: VdCheckboxGroupItem[] = [
    {
      label: 'Legal',
      children: [
        { label: 'Privacy Policy', value: 'legal-privacy' },
        { label: 'Terms of Service', value: 'legal-terms' },
        { label: 'Cookie Policy', value: 'legal-cookies' },
      ],
    },
    {
      label: 'Payments',
      children: [
        { label: 'Credit Card', value: 'payments-credit-card' },
        { label: 'PayPal', value: 'payments-paypal' },
      ],
    },
  ];
  verticalItems: VdCheckboxGroupItem[] = [
    { label: 'Email', value: 'email' },
    { label: 'SMS', value: 'sms' },
    { label: 'Push', value: 'push' },
  ];
  horizontalItems: VdCheckboxGroupItem[] = [
    { label: 'Email', value: 'email' },
    { label: 'SMS', value: 'sms' },
    { label: 'Push', value: 'push' },
  ];

  get codeSnippet(): string {
    const attrs: string[] = [];
    if (this.direction === 'horizontal') {
      attrs.push('direction="horizontal"');
    }
    attrs.push('[items]="items"');
    attrs.push('[value]="selectedValues"');
    attrs.push('(valueChange)="selectedValues = $event"');
    const attributes = attrs.length ? '\n  ' + attrs.join('\n  ') : '';

    return `<vd-checkbox-group${attributes}\n></vd-checkbox-group>`;
  }

  onGroupChange(values: Array<string | number>): void {
    this.selectedValues = values;
  }
  onHorizontalGroupChange(values: Array<string | number>): void {
    this.horizontalSelectedValues = values;
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
