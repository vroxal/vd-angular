import { Component, TemplateRef, ViewChild, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  VdTextarea,
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
  selector: 'app-textarea-page',
  standalone: true,
  imports: [
    VdTextarea,
    VdDatatable,
    VdSelect,
    VdSwitch,
    VdBadge,
    FormsModule,
    CommonModule,
    DocPageHeader,
    CodeContainer,
  ],
  templateUrl: './textarea.page.html',
  styleUrl: './textarea.page.scss',
})
export default class TextareaPage implements OnInit {
  label = 'Description';
  placeholder = 'Enter your message...';
  value = '';
  optional = false;
  disabled = false;
  state: 'success' | 'error' | 'warning' | null = null;
  helperText = 'Helper text';
  hintText = 'Hint text';
  leadingIcon = '';
  trailingActionIcon = '';
  maxInputCount: number | null = null;

  @ViewChild('propertyBadge', { static: true }) propertyBadge!: TemplateRef<any>;

  // Code snippets
  importCodeSnippet = 'import { VdTextarea } from "vd-angular";';

  basicImplementationSnippet = `<vd-textarea
  label="Description"
  placeholder="Enter your message..."
  [(value)]="description"
></vd-textarea>

export class MyComponent {
  description = '';
}`;

  allImplementationSnippet = `<vd-textarea
  label="Description"
  placeholder="Enter your message..."
  [(value)]="description"
  [optional]="false"
  [disabled]="false"
  state="success"
  helperText="Helper text"
  hintText="Hint text"
  [maxInputCount]="500"
></vd-textarea>`;

  eventsSnippet = `<vd-textarea
  label="Comment"
  placeholder="Write your comment..."
  [(value)]="comment"
  (valueChange)="onCommentChange($event)"
  (valueCommit)="onCommentCommit($event)"
></vd-textarea>`;

  eventsComponentSnippet = `export class MyComponent {
  comment = '';

  onCommentChange(value: string): void {
    console.log('Live value:', value);
  }

  onCommentCommit(value: string): void {
    console.log('Committed value:', value);
    // Save comment or perform validation
  }
}`;

  characterLimitSnippet = `<vd-textarea
  label="Bio"
  placeholder="Tell us about yourself..."
  [(value)]="bio"
  [maxInputCount]="250"
  helperText="Maximum 250 characters"
></vd-textarea>`;

  trailingActionSnippet = `<vd-textarea
  label="Message"
  placeholder="Type your message..."
  [(value)]="message"
  trailingActionIcon="vd-icon-send"
  (trailingActionClick)="onSendClick()"
></vd-textarea>`;

  trailingActionComponentSnippet = `export class MyComponent {
  message = '';

  onSendClick(): void {
    if (this.message.trim()) {
      console.log('Sending message:', this.message);
      this.sendMessage(this.message);
      this.message = ''; // Clear after sending
    }
  }

  private sendMessage(content: string): void {
    // Send to backend or emit event
  }
}`;

  // API Reference data
  apiData = [
    {
      property: 'label',
      type: 'string',
      default: '-',
      required: 'No',
      description: 'Label text displayed above the textarea',
    },
    {
      property: 'placeholder',
      type: 'string',
      default: "''",
      required: 'No',
      description: 'Placeholder text shown when textarea is empty',
    },
    {
      property: 'value',
      type: 'string',
      default: "''",
      required: 'No',
      description: 'Current value of the textarea',
    },
    {
      property: 'optional',
      type: 'boolean',
      default: 'false',
      required: 'No',
      description: 'Whether the textarea is optional',
    },
    {
      property: 'disabled',
      type: 'boolean',
      default: 'false',
      required: 'No',
      description: 'Whether the textarea is disabled',
    },
    {
      property: 'state',
      type: "'success' | 'error' | 'warning' | null",
      default: 'null',
      required: 'No',
      description: 'Visual state of the textarea',
    },
    {
      property: 'helperText',
      type: 'string',
      default: '-',
      required: 'No',
      description: 'Helper text displayed below the textarea',
    },
    {
      property: 'hintText',
      type: 'string',
      default: '-',
      required: 'No',
      description: 'Hint text shown in tooltip',
    },
    {
      property: 'leadingIcon',
      type: 'string',
      default: '-',
      required: 'No',
      description: 'Icon displayed before the textarea value',
    },
    {
      property: 'trailingActionIcon',
      type: 'string',
      default: '-',
      required: 'No',
      description: 'Icon button displayed after the textarea value',
    },
    {
      property: 'maxInputCount',
      type: 'number',
      default: '-',
      required: 'No',
      description: 'Maximum character count and counter display',
    },
  ];

  outputsData = [
    {
      property: 'valueChange',
      type: 'EventEmitter<string>',
      description: 'Emitted on every textarea input change',
    },
    {
      property: 'valueCommit',
      type: 'EventEmitter<string>',
      description: 'Emitted when the textarea loses focus',
    },
    {
      property: 'trailingActionClick',
      type: 'EventEmitter<void>',
      description: 'Emitted when the trailing action icon is clicked',
    },
    {
      property: 'inputFocus',
      type: 'EventEmitter<void>',
      description: 'Emitted when the textarea receives focus',
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

  stateOptions: VdSelectOption<'success' | 'error' | 'warning' | null>[] = [
    { label: 'None', value: null },
    { label: 'Success', value: 'success' },
    { label: 'Error', value: 'error' },
    { label: 'Warning', value: 'warning' },
  ];

  maxInputOptions: VdSelectOption<number | null>[] = [
    { label: 'None', value: null },
    { label: '100', value: 100 },
    { label: '250', value: 250 },
    { label: '500', value: 500 },
    { label: '1000', value: 1000 },
  ];

  get codeSnippet(): string {
    const attrs: string[] = [];
    if (this.label) {
      attrs.push(`label="${this.label}"`);
    }
    if (this.placeholder) {
      attrs.push(`placeholder="${this.placeholder}"`);
    }
    attrs.push(`[(value)]="textareaValue"`);
    if (this.optional) {
      attrs.push(`[optional]="true"`);
    }
    if (this.disabled) {
      attrs.push(`[disabled]="true"`);
    }
    if (this.state) {
      attrs.push(`state="${this.state}"`);
    }
    if (this.helperText) {
      attrs.push(`helperText="${this.helperText}"`);
    }
    if (this.hintText) {
      attrs.push(`hintText="${this.hintText}"`);
    }
    if (this.leadingIcon) {
      attrs.push(`leadingIcon="${this.leadingIcon}"`);
    }
    if (this.trailingActionIcon) {
      attrs.push(`trailingActionIcon="${this.trailingActionIcon}"`);
    }
    if (this.maxInputCount !== null && this.maxInputCount !== undefined) {
      attrs.push(`[maxInputCount]="${this.maxInputCount}"`);
    }
    const attributes = attrs.length ? '\n  ' + attrs.join('\n  ') : '';

    return `<vd-textarea${attributes}
></vd-textarea>`;
  }

  onTrailingActionClick(): void {}

  ngOnInit(): void {
    this.apiColumnsWithTemplate = this.apiColumns.map((col) =>
      col.key === 'property' ? { ...col, template: this.propertyBadge } : col,
    );
    this.eventsColumnsWithTemplate = this.eventsColumns.map((col) =>
      col.key === 'property' ? { ...col, template: this.propertyBadge } : col,
    );
  }
}
