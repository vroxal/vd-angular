import { Component, TemplateRef, ViewChild, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  VdPagination,
  VdDatatable,
  VdDatatableColumn,
  VdSelect,
  VdSelectOption,
  VdBadge,
} from 'vd-angular';

import DocPageHeader from '../../../components/doc-page-header/doc-page-header.component';
import CodeContainer from '../../../components/code-container/code-container.component';

@Component({
  selector: 'app-pagination-page',
  standalone: true,
  imports: [
    VdPagination,
    VdDatatable,
    VdSelect,
    VdBadge,
    FormsModule,
    CommonModule,
    DocPageHeader,
    CodeContainer,
  ],
  templateUrl: './pagination.page.html',
  styleUrl: './pagination.page.scss',
})
export default class PaginationPage implements OnInit {
  totalPages = 10;
  currentPage = 1;

  // Per-showcase current page trackers
  showcase1Page = 1;
  showcase2Page = 1;
  showcase3Page = 3;
  showcase4Page = 50;
  showcase5Page = 98;

  @ViewChild('propertyBadge', { static: true }) propertyBadge!: TemplateRef<any>;

  // Code snippets
  importCodeSnippet = 'import { VdPagination } from "vd-angular";';

  basicImplementationSnippet = `<vd-pagination
  [totalPages]="10"
  [currentPage]="currentPage"
  (pageChange)="onPageChange($event)"
></vd-pagination>`;

  allImplementationSnippet = `<vd-pagination
  [totalPages]="totalPages"
  [currentPage]="currentPage"
  (pageChange)="onPageChange($event)"
></vd-pagination>`;

  eventsSnippet = `<vd-pagination
  [totalPages]="totalPages"
  [currentPage]="currentPage"
  (pageChange)="onPageChange($event)"
></vd-pagination>`;

  eventsComponentSnippet = `export class MyComponent {
  totalPages = 10;
  currentPage = 1;

  onPageChange(page: number): void {
    this.currentPage = page;
    console.log('Navigated to page:', page);
    // Fetch data for the new page
    this.loadPageData(page);
  }

  loadPageData(page: number): void {
    // Implement your data loading logic here
  }
}`;

  // API Reference data
  apiData = [
    {
      property: 'totalPages',
      type: 'number',
      default: '1',
      required: 'No',
      description: 'Total number of pages',
    },
    {
      property: 'currentPage',
      type: 'number',
      default: '1',
      required: 'No',
      description: 'Currently active page number',
    },
  ];

  outputsData = [
    {
      property: 'pageChange',
      type: 'EventEmitter<number>',
      description: 'Emitted when a page is selected',
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

  totalPagesOptions: VdSelectOption<number>[] = [
    { label: '5 Pages', value: 5 },
    { label: '10 Pages', value: 10 },
    { label: '20 Pages', value: 20 },
    { label: '50 Pages', value: 50 },
    { label: '100 Pages', value: 100 },
  ];

  get codeSnippet(): string {
    return `<vd-pagination
  [totalPages]="${this.totalPages}"
  [currentPage]="${this.currentPage}"
  (pageChange)="onPageChange($event)"
></vd-pagination>`;
  }

  onPageChange(page: number): void {
    this.currentPage = page;
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
