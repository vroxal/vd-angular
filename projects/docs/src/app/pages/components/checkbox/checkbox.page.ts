import { Component, TemplateRef, ViewChild, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  VdCheckbox,
  VdDatatable,
  VdDatatableColumn,
  VdBadge,
  VdSwitch,
  VdInput,
} from 'vd-angular';

import DocPageHeader from '../../../components/doc-page-header/doc-page-header.component';
import CodeContainer from '../../../components/code-container/code-container.component';

@Component({
  selector: 'app-checkbox-page',
  standalone: true,
  imports: [
    VdCheckbox,
    VdDatatable,
    VdBadge,
    VdSwitch,
    VdInput,
    FormsModule,
    CommonModule,
    DocPageHeader,
    CodeContainer,
  ],
  templateUrl: './checkbox.page.html',
  styleUrl: './checkbox.page.scss',
})
export default class CheckboxPage implements OnInit {
  label = 'Checkbox Label';
  description = 'Description for the checkbox goes here';
  checked = false;
  indeterminate = false;
  disabled = false;

  @ViewChild('propertyBadge', { static: true }) propertyBadge!: TemplateRef<any>;

  importCodeSnippet = 'import { VdCheckbox } from "vd-angular";';

  basicImplementationSnippet = `<vd-checkbox label="Checkbox Label"></vd-checkbox>`;

  indeterminateSnippet = `<vd-checkbox
  label="Partially Selected"
  [indeterminate]="true"
></vd-checkbox>`;

  changeHandlingSnippet = `<vd-checkbox
  label="Accept Terms"
  (change)="onCheckboxChange($event)"
></vd-checkbox>`;

  changeHandlingComponentSnippet = `export class MyComponent {
  onCheckboxChange(checked: boolean): void {
    console.log('Checkbox changed:', checked);
  }
}`;

  allImplementationSnippet = `<vd-checkbox
  label="Checkbox Label"
  description="Description for the checkbox goes here"
  [checked]="true"
  [indeterminate]="false"
  [disabled]="false"
  (change)="onCheckboxChange($event)"
></vd-checkbox>`;

  apiData = [
    {
      property: 'label',
      type: 'string',
      default: '-',
      required: 'No',
      description: 'Label text displayed next to the checkbox',
    },
    {
      property: 'description',
      type: 'string',
      default: '-',
      required: 'No',
      description: 'Supporting text shown below the label',
    },
    {
      property: 'checked',
      type: 'boolean',
      default: 'false',
      required: 'No',
      description: 'Whether the checkbox is checked',
    },
    {
      property: 'indeterminate',
      type: 'boolean',
      default: 'false',
      required: 'No',
      description: 'Whether the checkbox is in a mixed/partial state',
    },
    {
      property: 'disabled',
      type: 'boolean',
      default: 'false',
      required: 'No',
      description: 'Disables interaction and applies disabled styling',
    },
    {
      property: 'id',
      type: 'string',
      default: '-',
      required: 'No',
      description: 'Sets the checkbox input id',
    },
    {
      property: 'name',
      type: 'string',
      default: '-',
      required: 'No',
      description: 'Sets the checkbox input name attribute',
    },
    {
      property: 'ariaLabel',
      type: 'string',
      default: '-',
      required: 'No',
      description: 'Accessible label when no visible label is provided',
    },
  ];

  outputsData = [
    {
      property: 'change',
      type: 'EventEmitter<boolean>',
      description: 'Emitted when the checkbox changes state',
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

  get codeSnippet(): string {
    const attrs: string[] = [];
    if (this.label) {
      attrs.push(`label="${this.label}"`);
    }
    if (this.description) {
      attrs.push(`description="${this.description}"`);
    }
    if (this.checked) {
      attrs.push('[checked]="true"');
    }
    if (this.indeterminate) {
      attrs.push('[indeterminate]="true"');
    }
    if (this.disabled) {
      attrs.push('[disabled]="true"');
    }
    attrs.push('(change)="onCheckboxChange($event)"');
    const attributes = attrs.length ? '\n  ' + attrs.join('\n  ') : '';

    return `<vd-checkbox${attributes}\n></vd-checkbox>`;
  }

  onCheckboxChange(value: boolean): void {}

  ngOnInit(): void {
    this.apiColumnsWithTemplate = this.apiColumns.map((col) =>
      col.key === 'property' ? { ...col, template: this.propertyBadge } : col,
    );
    this.eventsColumnsWithTemplate = this.eventsColumns.map((col) =>
      col.key === 'property' ? { ...col, template: this.propertyBadge } : col,
    );
  }
}
