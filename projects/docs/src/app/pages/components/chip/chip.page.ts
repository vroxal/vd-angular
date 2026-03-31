import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  VdChip,
  VdDatatable,
  VdDatatableColumn,
  VdSelect,
  VdSelectOption,
  VdSwitch,
} from 'vd-angular';
import DocPageHeader from '../../../components/doc-page-header/doc-page-header.component';
import CodeContainer from '../../../components/code-container/code-container.component';

@Component({
  selector: 'app-chip-page',
  imports: [
    VdChip,
    VdDatatable,
    VdSelect,
    VdSwitch,
    CommonModule,
    FormsModule,
    DocPageHeader,
    CodeContainer,
  ],
  templateUrl: './chip.page.html',
  styleUrl: './chip.page.scss',
})
export default class ChipPage implements OnInit {
  // Playground state
  label = 'Label';
  selected = false;
  closable = true;
  icon = 'vd-icon-tag';
  disabled = false;

  @ViewChild('propertyBadge', { static: true }) propertyBadge!: TemplateRef<any>;

  // Code snippets
  importCodeSnippet = 'import { VdChip } from "vd-angular";';

  basicImplementationSnippet = `<vd-chip label="Label"></vd-chip>`;

  allImplementationSnippet = `<vd-chip
  label="Label"
  icon="vd-icon-tag"
  [selected]="false"
  [closable]="true"
  [disabled]="false"
  (selectedChange)="onSelectedChange($event)"
  (closed)="onClosed()"
></vd-chip>`;

  twoWayBindingSnippet = `<vd-chip
  label="Label"
  [(selected)]="isSelected"
  (closed)="chips = chips.filter(c => c !== chip)"
></vd-chip>`;

  // API Reference
  apiData = [
    {
      property: 'label',
      type: 'string',
      default: '-',
      required: 'Yes',
      description: 'Text displayed inside the chip',
    },
    {
      property: 'selected',
      type: 'boolean',
      default: 'false',
      required: 'No',
      description: 'Whether the chip is in the selected state',
    },
    {
      property: 'closable',
      type: 'boolean',
      default: 'true',
      required: 'No',
      description: 'Whether the chip displays a close/remove button',
    },
    {
      property: 'icon',
      type: 'string',
      default: "''",
      required: 'No',
      description: 'Icon name to display before the label (e.g. "vd-icon-tag"). Empty string hides the icon',
    },
    {
      property: 'disabled',
      type: 'boolean',
      default: 'false',
      required: 'No',
      description: 'Disables interaction and applies disabled visual styling',
    },
  ];

  outputApiData = [
    {
      property: 'selectedChange',
      type: 'EventEmitter<boolean>',
      description: 'Emits the new selected value when the chip is clicked. Supports two-way binding with [(selected)]',
    },
    {
      property: 'closed',
      type: 'EventEmitter<void>',
      description: 'Emits when the close button is clicked',
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
    { key: 'property', title: 'Event' },
    { key: 'type', title: 'Type' },
    { key: 'description', title: 'Description' },
  ];

  apiColumnsWithTemplate: VdDatatableColumn[] = [];
  outputApiColumnsWithTemplate: VdDatatableColumn[] = [];

  iconOptions: VdSelectOption<string>[] = [
    { label: 'Tag', value: 'vd-icon-tag' },
    { label: 'Filter', value: 'vd-icon-filter' },
    { label: 'None', value: '' },
  ];

  get codeSnippet(): string {
    const attrs: string[] = [];
    if (this.icon) attrs.push(`icon="${this.icon}"`);
    if (this.selected) attrs.push(`[selected]="true"`);
    if (!this.closable) attrs.push(`[closable]="false"`);
    if (this.disabled) attrs.push(`[disabled]="true"`);
    const attributes = attrs.length ? '\n  ' + attrs.join('\n  ') : '';
    return `<vd-chip\n  label="${this.label}"${attributes}\n></vd-chip>`;
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
