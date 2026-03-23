import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  VdBadge,
  VdDatatable,
  VdDatatableColumn,
  VdSelect,
  VdSelectOption,
  VdSwitch,
} from 'vd-angular';
import { VdFileInput } from 'vd-angular';

import DocPageHeader from '../../../components/doc-page-header/doc-page-header.component';
import CodeContainer from '../../../components/code-container/code-container.component';

@Component({
  selector: 'app-file-input-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    VdFileInput,
    VdBadge,
    VdDatatable,
    VdSelect,
    VdSwitch,
    DocPageHeader,
    CodeContainer,
  ],
  templateUrl: './file-input.page.html',
  styleUrl: './file-input.page.scss',
})
export default class FileInputPage implements OnInit {
  // ── Playground state ──────────────────────────────────────────────────────
  playgroundLayout: 'horizontal' | 'vertical' = 'horizontal';
  playgroundDisabled = false;
  playgroundError = false;
  playgroundOptional = true;
  playgroundHint = true;
  playgroundMultiple = false;

  // ── Code snippets ─────────────────────────────────────────────────────────
  importCodeSnippet = `import { VdFileInput } from 'vd-angular';`;

  basicImplementationSnippet = `<vd-file-input
  label="Attachment"
  supportedFiles=".png, .jpeg"
  maxSize="12 MB"
  (filesChange)="onFilesSelected($event)"
></vd-file-input>`;

  verticalImplementationSnippet = `<vd-file-input
  layout="vertical"
  label="Attachment"
  [optional]="true"
  hintText="Accepted formats: PNG, JPEG"
  supportedFiles=".png, .jpeg"
  maxSize="12 MB"
  [multiple]="true"
  (filesChange)="onFilesSelected($event)"
></vd-file-input>`;

  errorImplementationSnippet = `<vd-file-input
  label="Attachment"
  state="error"
  helperText="File size exceeds the maximum allowed size"
  supportedFiles=".png, .jpeg"
  maxSize="12 MB"
  (filesChange)="onFilesSelected($event)"
></vd-file-input>`;

  tsImplementationSnippet = `import { VdFileInput } from 'vd-angular';

@Component({
  imports: [VdFileInput],
})
export class MyComponent {
  onFilesSelected(files: File[]): void {
    console.log('Selected files:', files);
  }
}`;

  // ── API Reference ─────────────────────────────────────────────────────────
  @ViewChild('propertyBadge', { static: true }) propertyBadge!: TemplateRef<any>;

  apiData = [
    {
      property: 'label',
      type: 'string',
      default: '-',
      required: 'No',
      description: 'Field label displayed above the dropzone',
    },
    {
      property: 'hintText',
      type: 'string',
      default: '-',
      required: 'No',
      description: 'Tooltip content shown on the help icon next to the label',
    },
    {
      property: 'optional',
      type: 'boolean',
      default: 'false',
      required: 'No',
      description: 'Displays an "Optional" indicator on the right of the label row',
    },
    {
      property: 'layout',
      type: "'horizontal' | 'vertical'",
      default: "'horizontal'",
      required: 'No',
      description:
        'Layout variant. horizontal = compact inline; vertical = large centered dropzone',
    },

    {
      property: 'supportedFiles',
      type: 'string',
      default: '-',
      required: 'No',
      description: 'list of supported file types',
    },
    {
      property: 'maxSize',
      type: 'string',
      default: '-',
      required: 'No',
      description: 'Maximum file size label shown in the footer (e.g. "12 MB")',
    },
    {
      property: 'multiple',
      type: 'boolean',
      default: 'false',
      required: 'No',
      description: 'Whether multiple files can be selected at once',
    },
    {
      property: 'disabled',
      type: 'boolean',
      default: 'false',
      required: 'No',
      description: 'Disables the component; prevents interaction and dims the UI',
    },
    {
      property: 'state',
      type: "'error' | null",
      default: 'null',
      required: 'No',
      description: 'Validation state. "error" applies error styling',
    },
    {
      property: 'helperText',
      type: 'string',
      default: '-',
      required: 'No',
      description: 'Helper/validation message displayed below the dropzone',
    },
    {
      property: 'supportingText',
      type: 'string',
      default: '-',
      required: 'No',
      description: 'Supporting text to show additional file size limit, file type etc',
    },
  ];

  outputData = [
    {
      property: 'filesChange',
      type: 'EventEmitter<File[]>',
      description:
        'Emitted whenever the selected file list changes — on selection (click or drag-and-drop) and on removal. Always emits the full current list.',
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
  outputColumnsWithTemplate: VdDatatableColumn[] = [];

  // ── Playground select options ─────────────────────────────────────────────
  layoutOptions: VdSelectOption<'horizontal' | 'vertical'>[] = [
    { label: 'Horizontal', value: 'horizontal' },
    { label: 'Vertical', value: 'vertical' },
  ];

  // ── Playground code snippet (reactive) ────────────────────────────────────
  get codeSnippet(): string {
    const lines: string[] = ['<vd-file-input'];
    if (this.playgroundLayout !== 'horizontal') {
      lines.push(`  layout="${this.playgroundLayout}"`);
    }
    lines.push(`  label="Attachment"`);
    if (this.playgroundOptional) lines.push(`  [optional]="true"`);
    if (this.playgroundHint) lines.push(`  hintText="Accepted formats: PNG, JPEG"`);
    if (this.playgroundMultiple) lines.push(`  [multiple]="true"`);
    if (this.playgroundDisabled) lines.push(`  [disabled]="true"`);
    if (this.playgroundError) lines.push(`  state="error"\n  helperText="Invalid file type"`);
    lines.push(`  supportedFiles=".png, .jpeg"`);
    lines.push(`  maxSize="12 MB"`);
    lines.push(`  (filesChange)="onFilesSelected($event)"`);
    lines.push('></vd-file-input>');
    return lines.join('\n');
  }

  get playgroundState(): 'error' | null {
    return this.playgroundError ? 'error' : null;
  }

  onExampleFilesSelected(files: File[]): void {
    // no-op in docs
  }

  ngOnInit(): void {
    this.apiColumnsWithTemplate = this.apiColumns.map((col) =>
      col.key === 'property' ? { ...col, template: this.propertyBadge } : col,
    );
    this.outputColumnsWithTemplate = this.outputColumns.map((col) =>
      col.key === 'property' ? { ...col, template: this.propertyBadge } : col,
    );
  }
}
