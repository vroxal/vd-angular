import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { VdBreadcrumb, VdDatatable, VdDatatableColumn, VdSwitch } from 'vd-angular';
import DocPageHeader from '../../../components/doc-page-header/doc-page-header.component';
import CodeContainer from '../../../components/code-container/code-container.component';

@Component({
  selector: 'app-breadcrumb-page',
  standalone: true,
  imports: [
    VdBreadcrumb,
    VdDatatable,
    VdSwitch,
    CommonModule,
    FormsModule,
    DocPageHeader,
    CodeContainer,
  ],
  templateUrl: './breadcrumb.page.html',
  styleUrl: './breadcrumb.page.scss',
})
export default class BreadcrumbPage {
  // Variations config
  importCodeSnippet = 'import { VdBreadcrumb } from "vd-angular";';

  basicItems = [
    { label: 'Home', url: '/' },
    { label: 'Components', url: '/components' },
    { label: 'Breadcrumb' },
  ];

  longItems = [
    { label: 'Home', url: '#' },
    { label: 'Products', url: '/' },
    { label: 'Electronics', url: '/components/input' },
    { label: 'Computers', url: '#' },
    { label: 'Laptops', url: '#' },
    { label: 'Apple', url: '#' },
    { label: 'Macbook', url: '#' },
    { label: 'MacBook Pro' },
  ];

  basicImplementationTypescriptSnippet = `export class MyComponent {
  breadcrumbItems = [
    { label: 'Home', url: '/' },
    { label: 'Library', url: '/library' },
    { label: 'Data' },
  ];
}`;

  basicImplementationTemplateSnippet = `<vd-breadcrumb [items]="breadcrumbItems"></vd-breadcrumb>`;

  apiData = [
    {
      property: 'items',
      type: 'BreadcrumbItem[]',
      default: '[]',
      required: 'Yes',
      description: 'Array of objects containing { label: string, url?: string }',
    },
    {
      property: 'separatorIcon',
      type: 'string',
      default: "'vd-icon-chevron-right'",
      required: 'No',
      description: 'Icon name to use as a separator',
    },
    {
      property: 'size',
      type: "'sm' | 'md' | 'lg'",
      default: "'md'",
      required: 'No',
      description: 'Size of the breadcrumb items and separators',
    },
  ];

  outputData = [
    {
      property: 'itemClick',
      type: 'EventEmitter<BreadcrumbItem>',
      description: 'Emitted when an item is clicked',
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

  // Playground state
  isLongList: boolean = false;

  get playgroundItems() {
    return this.isLongList ? this.longItems : this.basicItems;
  }

  get codeSnippet(): string {
    return `<vd-breadcrumb
  [items]="breadcrumbItems"
></vd-breadcrumb>`;
  }

  onItemClick(item: any) {
    console.log('Breadcrumb item clicked:', item);
  }
}
