import { Component, TemplateRef, ViewChild, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  VdSelectionCardGroup,
  VdSelectionCard,
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
  selector: 'app-selection-card-page',
  standalone: true,
  imports: [
    VdSelectionCardGroup,
    VdDatatable,
    VdBadge,
    VdSelect,
    VdSwitch,
    FormsModule,
    CommonModule,
    DocPageHeader,
    CodeContainer,
  ],
  templateUrl: './selection-card.page.html',
  styleUrl: './selection-card.page.scss',
})
export default class SelectionCardPage implements OnInit {
  @ViewChild('propertyBadge', { static: true }) propertyBadge!: TemplateRef<any>;

  // Playground state
  playgroundType: 'radio' | 'checkbox' = 'radio';
  playgroundDirection: 'vertical' | 'horizontal' = 'horizontal';
  playgroundDisabled = false;
  playgroundRadioValue: string | number | null = 'email';
  playgroundCheckboxValue: Array<string | number> = ['email'];

  // Code snippets
  importCodeSnippet = 'import { VdSelectionCardGroup, VdSelectionCard } from "vd-angular";';

  basicRadioTypescriptSnippet = `export class MyComponent {
  items: VdSelectionCard[] = [
    { title: 'Email', value: 'email', icon: 'vd-icon-mail' },
    { title: 'SMS', value: 'sms', icon: 'vd-icon-message-circle' },
    { title: 'Push Notification', value: 'push', icon: 'vd-icon-bell' },
  ];

  selectedValue: string | number | null = 'email';

  onValueChange(value: string | number): void {
    this.selectedValue = value;
  }
}`;

  basicRadioTemplateSnippet = `<vd-selection-card-group
  [items]="items"
  type="radio"
  direction="horizontal"
  [value]="selectedValue"
  (valueChange)="onValueChange($event)"
></vd-selection-card-group>`;

  checkboxTypescriptSnippet = `export class MyComponent {
  items: VdSelectionCard[] = [
    {
      title: 'Dark Mode',
      value: 'dark-mode',
      icon: 'vd-icon-moon',
      description: 'Enable dark color scheme',
    },
    {
      title: 'Notifications',
      value: 'notifications',
      icon: 'vd-icon-bell',
      description: 'Receive push notifications',
    },
    {
      title: 'Auto-save',
      value: 'auto-save',
      icon: 'vd-icon-save',
      description: 'Save changes automatically',
    },
  ];

  selectedValues: Array<string | number> = ['dark-mode'];

  onValueChange(values: Array<string | number>): void {
    this.selectedValues = values;
  }
}`;

  checkboxTemplateSnippet = `<vd-selection-card-group
  [items]="items"
  type="checkbox"
  direction="horizontal"
  [value]="selectedValues"
  (valueChange)="onValueChange($event)"
></vd-selection-card-group>`;

  withDescriptionTypescriptSnippet = `export class MyComponent {
  items: VdSelectionCard[] = [
    {
      title: 'Standard Delivery',
      value: 'standard',
      description: 'Delivered in 5-7 business days',
    },
    {
      title: 'Express Delivery',
      value: 'express',
      description: 'Delivered in 1-2 business days',
    },
    {
      title: 'Same Day Delivery',
      value: 'same-day',
      description: 'Delivered within 24 hours',
    },
  ];

  selectedValue: string | number | null = 'standard';
}`;

  withDescriptionTemplateSnippet = `<vd-selection-card-group
  [items]="items"
  type="radio"
  [value]="selectedValue"
  (valueChange)="selectedValue = $event"
></vd-selection-card-group>`;

  withIconTypescriptSnippet = `export class MyComponent {
  items: VdSelectionCard[] = [
    { title: 'Credit Card', value: 'credit', icon: 'vd-icon-credit-card' },
    { title: 'Bank Transfer', value: 'bank', icon: 'vd-icon-landmark' },
    { title: 'Digital Wallet', value: 'wallet', icon: 'vd-icon-wallet' },
  ];

  selectedValue: string | number | null = 'credit';
}`;

  withIconTemplateSnippet = `<vd-selection-card-group
  [items]="items"
  type="radio"
  direction="horizontal"
  [value]="selectedValue"
  (valueChange)="selectedValue = $event"
></vd-selection-card-group>`;

  disabledTemplateSnippet = `<!-- Disable the entire group -->
<vd-selection-card-group
  [items]="items"
  type="radio"
  [value]="selectedValue"
  [disabled]="true"
></vd-selection-card-group>`;

  disabledTypescriptSnippet = `export class MyComponent {
  items: VdSelectionCard[] = [
    { title: 'Email', value: 'email' },
    { title: 'SMS', value: 'sms' },
    { title: 'Push Notification', value: 'push' },
  ];

  selectedValue: string | number | null = 'email';
}`;

  // Demo items
  radioItems: VdSelectionCard[] = [
    { title: 'Email', value: 'email', icon: 'vd-icon-letter' },
    { title: 'SMS', value: 'sms', icon: 'vd-icon-dialog-round' },
    { title: 'Push Notification', value: 'push', icon: 'vd-icon-bell' },
  ];

  checkboxItems: VdSelectionCard[] = [
    {
      title: 'Dark Mode',
      value: 'dark-mode',
      icon: 'vd-icon-moon',
      description: 'Enable dark color scheme',
    },
    {
      title: 'Notifications',
      value: 'notifications',
      icon: 'vd-icon-bell',
      description: 'Receive push notifications',
    },
    {
      title: 'Auto-save',
      value: 'auto-save',
      icon: 'vd-icon-diskette',
      description: 'Save changes automatically',
    },
  ];

  withDescriptionItems: VdSelectionCard[] = [
    {
      title: 'Standard Delivery',
      value: 'standard',
      description: 'Delivered in 5-7 business days',
    },
    {
      title: 'Express Delivery',
      value: 'express',
      description: 'Delivered in 1-2 business days',
    },
    {
      title: 'Same Day Delivery',
      value: 'same-day',
      description: 'Delivered within 24 hours',
    },
  ];

  withIconItems: VdSelectionCard[] = [
    { title: 'Credit Card', value: 'credit', icon: 'vd-icon-card', disabled: true },
    { title: 'Bank Transfer', value: 'bank', icon: 'vd-icon-house' },
    { title: 'Digital Wallet', value: 'wallet', icon: 'vd-icon-wallet' },
  ];

  disabledItems: VdSelectionCard[] = [
    { title: 'Email', value: 'email' },
    { title: 'SMS', value: 'sms' },
    { title: 'Push Notification', value: 'push' },
  ];

  playgroundItems: VdSelectionCard[] = [
    {
      title: 'Email',
      value: 'email',
      icon: 'vd-icon-letter',
      description: 'Receive updates via email',
    },
    {
      title: 'SMS',
      value: 'sms',
      icon: 'vd-icon-dialog-round',
      description: 'Receive updates via text message',
    },
    {
      title: 'Push Notification',
      value: 'push',
      icon: 'vd-icon-bell',
      description: 'Receive push notifications on your device',
    },
  ];

  radioValue: any = 'email';
  checkboxValue: any = ['dark-mode'];
  descriptionValue: any = 'standard';
  iconValue: any = 'credit';
  disabledValue: any = 'email';

  // API Reference
  itemInterfaceData = [
    {
      property: 'title',
      type: 'string',
      required: 'Yes',
      description: 'Display title for the selection card',
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
      description: 'Supporting text displayed below the title',
    },
    {
      property: 'icon',
      type: 'string',
      required: 'No',
      description: 'Icon name to display (e.g. vd-icon-mail)',
    },
    {
      property: 'disabled',
      type: 'boolean',
      required: 'No',
      description: 'Disables this specific selection card item',
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
      type: 'VdSelectionCard[]',
      default: '[]',
      required: 'Yes',
      description: 'List of selection card items',
    },
    {
      property: 'type',
      type: "'radio' | 'checkbox'",
      default: "'radio'",
      required: 'No',
      description: 'Selection mode: single (radio) or multiple (checkbox)',
    },
    {
      property: 'direction',
      type: "'vertical' | 'horizontal'",
      default: "'vertical'",
      required: 'No',
      description: 'Layout direction for the card group',
    },
    {
      property: 'value',
      type: 'string | number | Array<string | number> | null',
      default: 'null',
      required: 'No',
      description: 'Currently selected value(s)',
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
      description: 'HTML name attribute shared by child elements',
    },
    {
      property: 'columns',
      type: 'number',
      default: '1',
      required: 'No',
      description: 'Number of grid columns for vertical layout',
    },
  ];

  outputData = [
    {
      property: 'valueChange',
      type: 'EventEmitter<string | number | Array<string | number>>',
      description: 'Emits the selected value(s) when a card is clicked',
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

  typeOptions: VdSelectOption<'radio' | 'checkbox'>[] = [
    { label: 'Radio (Single)', value: 'radio' },
    { label: 'Checkbox (Multi)', value: 'checkbox' },
  ];

  directionOptions: VdSelectOption<'vertical' | 'horizontal'>[] = [
    { label: 'Vertical', value: 'vertical' },
    { label: 'Horizontal', value: 'horizontal' },
  ];

  get playgroundValue(): string | number | Array<string | number> | null {
    return this.playgroundType === 'radio'
      ? this.playgroundRadioValue
      : this.playgroundCheckboxValue;
  }

  onPlaygroundValueChange(value: string | number | Array<string | number>): void {
    if (this.playgroundType === 'radio') {
      this.playgroundRadioValue = value as string | number;
    } else {
      this.playgroundCheckboxValue = value as Array<string | number>;
    }
  }

  get codeSnippet(): string {
    const attrs: string[] = [];
    attrs.push(`type="${this.playgroundType}"`);
    if (this.playgroundDirection === 'horizontal') {
      attrs.push('direction="horizontal"');
    }
    if (this.playgroundDisabled) {
      attrs.push('[disabled]="true"');
    }
    attrs.push('[items]="items"');
    if (this.playgroundType === 'radio') {
      attrs.push('[value]="selectedValue"');
      attrs.push('(valueChange)="selectedValue = $event"');
    } else {
      attrs.push('[value]="selectedValues"');
      attrs.push('(valueChange)="selectedValues = $event"');
    }
    const attributes = attrs.length ? '\n  ' + attrs.join('\n  ') : '';

    return `<vd-selection-card-group${attributes}\n></vd-selection-card-group>`;
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
