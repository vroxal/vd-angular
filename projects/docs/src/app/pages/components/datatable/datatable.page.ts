import { Component, ChangeDetectorRef, TemplateRef, ViewChild, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  VdButton,
  VdDatatable,
  VdDatatableColumn,
  VdDatatableAction,
  VdSelect,
  VdSelectOption,
  VdSwitch,
  VdBadge,
} from 'vd-angular';
import DocPageHeader from '../../../components/doc-page-header/doc-page-header.component';
import CodeContainer from '../../../components/code-container/code-container.component';

@Component({
  selector: 'app-datatable-page',
  imports: [
    VdDatatable,
    VdSwitch,
    VdBadge,
    CommonModule,
    FormsModule,
    DocPageHeader,
    CodeContainer,
  ],
  templateUrl: './datatable.page.html',
  styleUrl: './datatable.page.scss',
})
export default class DatatablePage implements OnInit {
  expandable = false;
  showPagination = true;
  showActions = true;

  @ViewChild('propertyBadge', { static: true }) propertyBadge!: TemplateRef<any>;
  @ViewChild('statusBadge', { static: true }) statusBadge!: TemplateRef<any>;

  // Code snippets
  importCodeSnippet = 'import { VdDatatable, VdDatatableColumn } from "vd-angular";';

  basicImplementationTypescriptSnippet = `export class MyComponent {
  tableData = [
    { id: 1, name: 'John Doe', email: 'john@example.com', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'Active' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', status: 'Inactive' },
  ];

  columns: VdDatatableColumn[] = [
    { key: 'name', title: 'Name' },
    { key: 'email', title: 'Email' },
    { key: 'status', title: 'Status' },
  ];
}`;

  basicImplementationTemplateSnippet = `<vd-datatable
  [data]="tableData"
  [columns]="columns"
></vd-datatable>`;

  basicImplementationSnippet = `// Component TypeScript
export class MyComponent {
  tableData = [
    { id: 1, name: 'John Doe', email: 'john@example.com', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'Active' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', status: 'Inactive' },
  ];

  columns: VdDatatableColumn[] = [
    { key: 'name', title: 'Name' },
    { key: 'email', title: 'Email' },
    { key: 'status', title: 'Status' },
  ];
}

// Component Template
<vd-datatable
  [data]="tableData"
  [columns]="columns"
></vd-datatable>`;

  advancedImplementationTypescriptSnippet = `import { TemplateRef, ViewChild } from '@angular/core';
import { VdDatatable, VdDatatableColumn } from 'vd-angular';

export class MyComponent {
  @ViewChild('statusTemplate') statusTemplate!: TemplateRef<any>;

  tableData = [
    { id: 1, name: 'John Doe', email: 'john@example.com', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'Active' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', status: 'Inactive' },
  ];

  columns: VdDatatableColumn[] = [];

  ngOnInit(): void {
    this.columns = [
      { key: 'name', title: 'Name' },
      { key: 'email', title: 'Email' },
      { 
        key: 'status', 
        title: 'Status', 
        template: this.statusTemplate 
      },
    ];
  }
}`;

  advancedImplementationTemplateSnippet = `<ng-template #statusTemplate let-row>
  <vd-badge 
    [label]="row.status" 
    [color]="row.status === 'Active' ? 'success' : 'error'"
  ></vd-badge>
</ng-template>

<vd-datatable
  [data]="tableData"
  [columns]="columns"
></vd-datatable>`;

  expandableImplementationTypescriptSnippet = `import { VdDatatableColumn } from 'vd-angular';

export class MyComponent {
  tableData = [
    { 
      id: 1, 
      name: 'John Doe', 
      email: 'john@example.com', 
      status: 'Active',
      department: 'Engineering',
      joinDate: '2022-01-15'
    },
    { 
      id: 2, 
      name: 'Jane Smith', 
      email: 'jane@example.com', 
      status: 'Active',
      department: 'Marketing',
      joinDate: '2021-06-20'
    },
  ];

  columns: VdDatatableColumn[] = [
    { key: 'name', title: 'Name' },
    { key: 'email', title: 'Email' },
    { key: 'status', title: 'Status' },
  ];

  expandedColumns: VdDatatableColumn[] = [
    { key: 'department', title: 'Department' },
    { key: 'joinDate', title: 'Join Date' },
  ];
}`;

  expandableImplementationTemplateSnippet = `<vd-datatable
  [data]="tableData"
  [columns]="columns"
  [expandedColumns]="expandedColumns"
></vd-datatable>`;

  paginationImplementationTypescriptSnippet = `import { VdDatatableColumn } from 'vd-angular';

export class MyComponent {
  tableData = [
    { id: 1, name: 'John Doe', email: 'john@example.com', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'Active' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', status: 'Inactive' },
    // ... more rows
  ];

  columns: VdDatatableColumn[] = [
    { key: 'name', title: 'Name' },
    { key: 'email', title: 'Email' },
    { key: 'status', title: 'Status' },
  ];

  currentPage = 1;
  rowsPerPage = 10;
  totalRows = 100; // Total number of items in dataset
  totalPages = Math.ceil(this.totalRows / this.rowsPerPage);

  onPageChange(page: number): void {
    this.currentPage = page;
    // Fetch data for the new page if using server-side pagination
  }
}`;

  paginationImplementationTemplateSnippet = `<!-- Datatable with pagination and row counter -->
<vd-datatable
  [data]="tableData"
  [columns]="columns"
  [currentPage]="currentPage"
  [totalPages]="totalPages"
  [totalRows]="totalRows"
  [rowsPerPage]="rowsPerPage"
  (pageChange)="onPageChange($event)"
></vd-datatable>

<!-- 
  Note: The datatable component automatically calculates and displays:
  - Current rows: "Showing X-Y of Z" 
  - Page navigation controls
  - Only if totalRows > 0
-->`;

  actionsImplementationTypescriptSnippet = `import { VdDatatableColumn, VdDatatableAction } from 'vd-angular';

export class MyComponent {
  tableData = [
    { id: 1, name: 'John Doe', email: 'john@example.com', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'Active' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', status: 'Inactive' },
  ];

  columns: VdDatatableColumn[] = [
    { key: 'name', title: 'Name' },
    { key: 'email', title: 'Email' },
    { key: 'status', title: 'Status' },
  ];

  // Define action handler methods
  onEditAction(row: any): void {
    console.log('Edit clicked for:', row.name);
    // Handle edit action
  }

  onDeleteAction(row: any): void {
    console.log('Delete clicked for:', row.name);
    // Handle delete action
  }

  isDeleteVisible(row: any): boolean {
    return row.status === 'Active'; // Only show for active users
  }

  isViewDisabled(row: any): boolean {
    return row.status === 'Inactive'; // Disable for inactive users
  }

  onViewAction(row: any): void {
    console.log('View details for:', row.name);
    // Handle view action
  }

  // Define actions array with method references
  actions: VdDatatableAction[] = [
    {
      title: 'Edit',
      icon: 'vd-icon-edit',
      action: this.onEditAction.bind(this),
    },
    {
      title: 'Delete',
      icon: 'vd-icon-delete',
      action: this.onDeleteAction.bind(this),
      visible: this.isDeleteVisible.bind(this),
    },
    {
      title: 'View Details',
      icon: 'vd-icon-eye',
      action: this.onViewAction.bind(this),
      disabled: this.isViewDisabled.bind(this),
    },
  ];
}`;

  actionsImplementationTemplateSnippet = `<vd-datatable
  [data]="tableData"
  [columns]="columns"
  [actions]="actions"
></vd-datatable>`;

  // API Reference data for inputs
  apiData = [
    {
      property: 'data',
      type: 'T[]',
      default: '[]',
      required: 'Yes',
      description: 'Array of data objects to display in the table',
    },
    {
      property: 'columns',
      type: 'VdDatatableColumn[]',
      default: '[]',
      required: 'Yes',
      description: 'Array of column definitions for the table',
    },
    {
      property: 'expandedColumns',
      type: 'VdDatatableColumn[]',
      default: '[]',
      required: 'No',
      description: 'Columns to show when a row is expanded',
    },
    {
      property: 'actions',
      type: 'VdDatatableAction[]',
      default: '[]',
      required: 'No',
      description: 'Array of action buttons to show for each row',
    },
    {
      property: 'expandable',
      type: 'boolean',
      default: 'false',
      required: 'No',
      description: 'Whether rows can be expanded to show additional details',
    },
    {
      property: 'currentPage',
      type: 'number',
      default: '1',
      required: 'No',
      description: 'Current page number for pagination',
    },
    {
      property: 'totalPages',
      type: 'number',
      default: '0',
      required: 'No',
      description: 'Total number of pages (if 0, pagination is hidden)',
    },
    {
      property: 'rowsPerPage',
      type: 'number',
      default: '10',
      required: 'No',
      description: 'Number of rows to display per page',
    },
    {
      property: 'totalRows',
      type: 'number',
      default: '0',
      required: 'No',
      description: 'Total number of rows in the dataset',
    },
  ];

  // Output events
  outputData = [
    {
      property: 'pageChange',
      type: 'EventEmitter<number>',
      description: 'Emitted when the page changes',
    },
    {
      property: 'rowClicked',
      type: 'EventEmitter<T>',
      description: 'Emitted when a row is clicked',
    },
    {
      property: 'actionTriggered',
      type: 'EventEmitter<{ action: string; row: T }>',
      description: 'Emitted when an action button is clicked',
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

  expandableOptions: VdSelectOption<boolean>[] = [
    { label: 'Disabled', value: false },
    { label: 'Enabled', value: true },
  ];

  paginationOptions: VdSelectOption<boolean>[] = [
    { label: 'Hidden', value: false },
    { label: 'Visible', value: true },
  ];

  actionsOptions: VdSelectOption<boolean>[] = [
    { label: 'Hidden', value: false },
    { label: 'Visible', value: true },
  ];

  // Sample data for demo table
  sampleTableData = [
    {
      id: 1,
      name: 'John Doe',
      fame: 'John Doe',
      dae: 'John Doe',
      same: 'John Doe',
      game: 'John Doe',
      email: 'john@example.com',
      status: 'Active',
    },
    {
      id: 2,
      name: 'Jane Smith',
      fame: 'John Doe',
      dae: 'John Doe',
      same: 'John Doe',
      game: 'John Doe',
      email: 'jane@example.com',
      status: 'Active',
    },
    {
      id: 3,
      name: 'Bob Johnson',
      fame: 'John Doe',
      dae: 'John Doe',
      same: 'John Doe',
      game: 'John Doe',
      email: 'bob@example.com',
      status: 'Inactive',
    },
    {
      id: 4,
      name: 'Alice Brown',
      fame: 'John Doe',
      dae: 'John Doe',
      same: 'John Doe',
      game: 'John Doe',
      email: 'alice@example.com',
      status: 'Active',
    },
    {
      id: 5,
      name: 'Charlie Green',
      fame: 'John Doe',
      dae: 'John Doe',
      same: 'John Doe',
      game: 'John Doe',
      email: 'charlie@example.com',
      status: 'Inactive',
    },
    {
      id: 6,
      name: 'Diana White',
      fame: 'John Doe',
      dae: 'John Doe',
      same: 'John Doe',
      game: 'John Doe',
      email: 'diana@example.com',
      status: 'Active',
    },
    {
      id: 7,
      name: 'Ethan Black',
      fame: 'John Doe',
      dae: 'John Doe',
      same: 'John Doe',
      game: 'John Doe',
      email: 'ethan@example.com',
      status: 'Inactive',
    },
    {
      id: 8,
      name: 'Fiona Blue',
      fame: 'John Doe',
      dae: 'John Doe',
      same: 'John Doe',
      game: 'John Doe',
      email: 'fiona@example.com',
      status: 'Active',
    },
    {
      id: 9,
      name: 'George Red',
      fame: 'John Doe',
      dae: 'John Doe',
      same: 'John Doe',
      game: 'John Doe',
      email: 'george@example.com',
      status: 'Inactive',
    },
    {
      id: 10,
      name: 'Hannah Yellow',
      fame: 'John Doe',
      dae: 'John Doe',
      same: 'John Doe',
      game: 'John Doe',
      email: 'hannah@example.com',
      status: 'Active',
    },
    {
      id: 11,
      name: 'Ian Purple',
      fame: 'John Doe',
      dae: 'John Doe',
      same: 'John Doe',
      game: 'John Doe',
      email: 'ian@example.com',
      status: 'Inactive',
    },
  ];

  demoColumns: VdDatatableColumn[] = [
    { key: 'name', title: 'Name' },
    { key: 'fame', title: 'Fame' },
    { key: 'dae', title: 'Dae' },
    { key: 'same', title: 'Same' },
    { key: 'game', title: 'Game' },
    { key: 'email', title: 'Email' },
    { key: 'status', title: 'Status' },
  ];

  currentPage = 1;
  rowPerPage = 3;
  totalRows = 11;
  totalPages = Math.ceil(this.totalRows / this.rowPerPage);

  onEditAction(row: any): void {
    alert(`Edit: ${row.name}`);
  }

  onDeleteAction(row: any): void {
    alert(`Delete: ${row.name}`);
  }

  isDeleteVisible(row: any): boolean {
    return row.status === 'Active';
  }

  demoActions: VdDatatableAction[] = [];

  onPageChange(page: number): void {
    this.currentPage = page;
  }

  get codeSnippet(): string {
    let snippet = this.basicImplementationSnippet;
    if (this.expandable) {
      snippet = snippet.replace('></vd-datatable>', '\n  [expandable]="true"\n></vd-datatable>');
    }
    if (this.showPagination) {
      snippet = snippet.replace(
        '></vd-datatable>',
        '\n  [currentPage]="1"\n  [totalPages]="3"\n></vd-datatable>',
      );
    }
    if (this.showActions) {
      snippet = snippet.replace('></vd-datatable>', '\n  [actions]="actions"\n></vd-datatable>');
    }
    return snippet;
  }

  getStatusBadgeColor(status: string): 'success' | 'error' | 'neutral' {
    if (status === 'Active') return 'success';
    if (status === 'Inactive') return 'error';
    return 'neutral';
  }

  ngOnInit(): void {
    this.apiColumnsWithTemplate = this.apiColumns.map((col) =>
      col.key === 'property' ? { ...col, template: this.propertyBadge } : col,
    );
    this.outputColumnsWithTemplate = this.outputColumns.map((col) =>
      col.key === 'property' ? { ...col, template: this.propertyBadge } : col,
    );
    this.demoColumns = [
      { key: 'name', title: 'Name' },
      { key: 'email', title: 'Email' },
      { key: 'status', title: 'Status', template: this.statusBadge },
    ];

    // Initialize demoActions in ngOnInit so 'this' context is properly bound
    this.demoActions = [
      {
        title: 'Edit',
        icon: 'vd-icon-settings',
        action: this.onEditAction.bind(this),
      },
      {
        title: 'Delete',
        icon: 'vd-icon-trash',
        action: this.onDeleteAction.bind(this),
        visible: this.isDeleteVisible.bind(this),
      },
    ];
  }
}
