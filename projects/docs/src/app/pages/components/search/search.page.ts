import { Component, TemplateRef, ViewChild, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { VdSearch, VdDatatable, VdDatatableColumn, VdSwitch, VdBadge } from 'vd-angular';

import DocPageHeader from '../../../components/doc-page-header/doc-page-header.component';
import CodeContainer from '../../../components/code-container/code-container.component';

@Component({
  selector: 'app-search-page',
  standalone: true,
  imports: [
    VdSearch,
    VdDatatable,
    VdSwitch,
    VdBadge,
    FormsModule,
    CommonModule,
    DocPageHeader,
    CodeContainer,
  ],
  templateUrl: './search.page.html',
  styleUrl: './search.page.scss',
})
export default class SearchPage implements OnInit {
  placeholder = 'Search...';
  value = '';
  disabled = false;
  state: 'success' | 'error' | 'warning' | null = null;

  @ViewChild('propertyBadge', { static: true }) propertyBadge!: TemplateRef<any>;

  // Code snippets
  importCodeSnippet = 'import { VdSearch } from "vd-angular";';

  basicImplementationSnippet = `<vd-search
  placeholder="Search records..."
  [(value)]="searchValue"
></vd-search>`;

  allImplementationSnippet = `<vd-search
  placeholder="Search records..."
  [(value)]="searchValue"
  [disabled]="false"
></vd-search>`;

  eventsSnippet = `<vd-search
  placeholder="Search..."
  [(value)]="searchValue"
  (valueChange)="onSearchChange($event)"
  (searchCommit)="onSearchCommit($event)"
></vd-search>`;

  eventsComponentSnippet = `export class MyComponent {
searchValue = '';
onSearchChange(value: string): void {
  console.log('Live search value', value);
}

onSearchCommit(value: string): void {
  console.log('Search committed', value);
   // Trigger API call, filter, etc.
 }
}`;

  // API Reference data
  apiData = [
    {
      property: 'placeholder',
      type: 'string',
      default: "'Search'",
      required: 'No',
      description: 'Placeholder text shown when input is empty',
    },
    {
      property: 'value',
      type: 'string',
      default: "''",
      required: 'No',
      description: 'Current value of the search input',
    },
    {
      property: 'disabled',
      type: 'boolean',
      default: 'false',
      required: 'No',
      description: 'Whether the search input is disabled',
    },
  ];

  outputsData = [
    {
      property: 'valueChange',
      type: 'EventEmitter<string>',
      description: 'Emitted on every input change (live typing or clear)',
    },
    {
      property: 'searchCommit',
      type: 'EventEmitter<string>',
      description: 'Emitted when the user presses Enter or the input loses focus',
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
    if (this.placeholder) {
      attrs.push(`placeholder="${this.placeholder}"`);
    }
    attrs.push(`[(value)]="searchValue"`);
    if (this.disabled) {
      attrs.push(`[disabled]="true"`);
    }
    if (this.state) {
      attrs.push(`state="${this.state}"`);
    }
    const attributes = attrs.length ? '\n  ' + attrs.join('\n  ') : '';

    return `<vd-search${attributes}
></vd-search>`;
  }

  ngOnInit(): void {
    this.apiColumnsWithTemplate = this.apiColumns.map((col) =>
      col.key === 'property' ? { ...col, template: this.propertyBadge } : col,
    );
    this.eventsColumnsWithTemplate = this.eventsColumns.map((col) =>
      col.key === 'property' ? { ...col, template: this.propertyBadge } : col,
    );
  }
}
