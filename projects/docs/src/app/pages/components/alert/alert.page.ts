import { Component, ChangeDetectorRef, TemplateRef, ViewChild, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  VdAlert,
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
  selector: 'app-alert-page',
  imports: [
    VdAlert,
    VdDatatable,
    VdSelect,
    VdSwitch,
    VdBadge,
    FormsModule,
    CommonModule,
    DocPageHeader,
    CodeContainer,
  ],
  templateUrl: './alert.page.html',
  styleUrl: './alert.page.scss',
})
export default class AlertPage implements OnInit {
  private _color: 'primary' | 'success' | 'error' | 'warning' | 'info' | 'neutral' = 'primary';
  private _action: boolean = true;
  closable: boolean = true;
  private _actionInline: boolean = false;

  get color(): 'primary' | 'success' | 'error' | 'warning' | 'info' | 'neutral' {
    return this._color;
  }

  set color(value: 'primary' | 'success' | 'error' | 'warning' | 'info' | 'neutral') {
    this._color = value;
  }
  title: string = 'Title for the alert goes here';
  description: string =
    'Nothing more exciting happening here in terms of content, but just filling up the space to make it look, at least at first glance, a bit more representative of how this would look in a real-world application.';
  actionLabel: string = 'Alert Action';

  get action(): boolean {
    return this._action;
  }

  set action(value: boolean) {
    this._action = value;
    if (!value && this._actionInline) {
      this._actionInline = false;
    }
  }

  get actionInline(): boolean {
    return this._actionInline;
  }

  set actionInline(value: boolean) {
    this._actionInline = value;
    if (value) {
      this._action = true;
    }
  }

  @ViewChild('propertyAlert', { static: true }) propertyAlert!: TemplateRef<any>;

  // Code snippets
  importCodeSnippet = 'import { VdAlert } from "vd-angular";';

  basicImplementationSnippet = `<vd-alert
  title="Alert Title"
  description="This is an alert message"
></vd-alert>`;

  allImplementationSnippet = `<vd-alert
  title="Alert Title"
  description="This is an alert message"
  color="success"
  [action]="true"
  [closable]="true"
  [actionInline]="false"
  actionLabel="Learn More"
  icon="vd-icon-custom"
  (onClose)="handleClose()"
  (onAction)="handleAction()"
></vd-alert>`;

  // API Reference data
  apiData = [
    {
      property: 'title',
      type: 'string',
      default: '-',
      required: 'No',
      description: 'The title text displayed in the alert (optional)',
    },
    {
      property: 'description',
      type: 'string',
      default: '-',
      required: 'Yes',
      description: 'The description or content text displayed in the alert (required)',
    },
    {
      property: 'color',
      type: "'primary' | 'success' | 'error' | 'warning' | 'info' | 'neutral'",
      default: "'primary'",
      required: 'No',
      description: 'The color variant of the alert',
    },
    {
      property: 'action',
      type: 'boolean',
      default: 'true',
      required: 'No',
      description: 'Whether to show the action button',
    },
    {
      property: 'closable',
      type: 'boolean',
      default: 'true',
      required: 'No',
      description: 'Whether to show the close button',
    },
    {
      property: 'actionLabel',
      type: 'string',
      default: "'Alert Action'",
      required: 'No',
      description: 'The text label for the action button',
    },
    {
      property: 'actionInline',
      type: 'boolean',
      default: 'false',
      required: 'No',
      description: 'Display action button inline with text container on the same line',
    },
    {
      property: 'icon',
      type: 'string',
      default: '-',
      required: 'No',
      description: 'Custom icon name. If not provided, defaults to color-based icons',
    },
  ];

  outputsData = [
    {
      property: 'onClose',
      type: '() => void',
      description: 'Callback function called when the close button is clicked',
    },
    {
      property: 'onAction',
      type: '() => void',
      description: 'Callback function called when the action button is clicked',
    },
  ];

  apiColumns: VdDatatableColumn[] = [
    { key: 'property', title: 'Property' },
    { key: 'type', title: 'Type' },
    { key: 'default', title: 'Default' },
    { key: 'required', title: 'Required' },
    { key: 'description', title: 'Description' },
  ];

  outputsColumns: VdDatatableColumn[] = [
    { key: 'property', title: 'Event' },
    { key: 'type', title: 'Type' },
    { key: 'description', title: 'Description' },
  ];

  apiColumnsWithTemplate: VdDatatableColumn[] = [];
  outputsColumnsWithTemplate: VdDatatableColumn[] = [];

  colorOptions: VdSelectOption<
    'primary' | 'success' | 'error' | 'warning' | 'info' | 'neutral'
  >[] = [
    { label: 'Primary', value: 'primary' },
    { label: 'Success', value: 'success' },
    { label: 'Error', value: 'error' },
    { label: 'Warning', value: 'warning' },
    { label: 'Info', value: 'info' },
    { label: 'Neutral', value: 'neutral' },
  ];

  // Generate code snippet based on current controls
  get codeSnippet(): string {
    const attrs: string[] = [];

    if (this.title !== 'Title for the alert goes here') {
      attrs.push(`title="${this.title}"`);
    }
    if (
      this.description !==
      'Nothing more exciting happening here in terms of content, but just filling up the space to make it look, at least at first glance, a bit more representative of how this would look in a real-world application.'
    ) {
      attrs.push(`description="${this.description}"`);
    }
    if (this.color !== 'primary') {
      attrs.push(`color="${this.color}"`);
    }
    if (this.action !== true) {
      attrs.push(`[action]="${this.action}"`);
    }
    if (this.closable !== true) {
      attrs.push(`[closable]="${this.closable}"`);
    }
    if (this.actionLabel !== 'Alert Action') {
      attrs.push(`actionLabel="${this.actionLabel}"`);
    }
    if (this.actionInline !== false) {
      attrs.push(`[actionInline]="${this.actionInline}"`);
    }

    const attributes = attrs.length ? '\n  ' + attrs.join('\n  ') : '';

    return `<vd-alert${attributes}
></vd-alert>`;
  }

  ngOnInit(): void {
    this.apiColumnsWithTemplate = this.apiColumns.map((col) =>
      col.key === 'property' ? { ...col, template: this.propertyAlert } : col,
    );
    this.outputsColumnsWithTemplate = this.outputsColumns.map((col) =>
      col.key === 'property' ? { ...col, template: this.propertyAlert } : col,
    );
  }

  handleClose(): void {}

  handleAction(): void {}
}
