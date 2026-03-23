import { Component, TemplateRef, ViewChild, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  VdDropdown,
  VdButton,
  VdDropdownItem,
  VdDropdownItemGroup,
  VdDropdownItemDivider,
  VdDatatable,
  VdDatatableColumn,
  VdSelect,
  VdSelectOption,
  VdBadge,
} from 'vd-angular';

import DocPageHeader from '../../../components/doc-page-header/doc-page-header.component';
import CodeContainer from '../../../components/code-container/code-container.component';

@Component({
  selector: 'app-dropdown-page',
  imports: [
    VdButton,
    VdDropdown,
    VdDropdownItem,
    VdDropdownItemGroup,
    VdDropdownItemDivider,
    VdDatatable,
    VdSelect,
    VdBadge,
    FormsModule,
    CommonModule,
    DocPageHeader,
    CodeContainer,
  ],
  templateUrl: './dropdown.page.html',
  styleUrl: './dropdown.page.scss',
})
export default class DropdownPage implements OnInit {
  position:
    | 'bottom-left'
    | 'bottom-center'
    | 'bottom-right'
    | 'top-left'
    | 'top-center'
    | 'top-right'
    | 'left-start'
    | 'right-start' = 'bottom-left';

  @ViewChild('propertyBadge', { static: true }) propertyBadge!: TemplateRef<any>;

  // Code snippets
  importCodeSnippet = `import { 
  VdDropdown, 
  VdDropdownItem, 
  VdDropdownItemGroup, 
  VdDropdownItemDivider 
} from "vd-angular";`;

  basicImplementationSnippet = `<vd-dropdown>
  <button vdDropdownTrigger>Open Dropdown</button>
  <div vdDropdownContent>
    <vd-dropdown-item title="Menu Item 1" icon="home"></vd-dropdown-item>
    <vd-dropdown-item title="Menu Item 2" icon="settings"></vd-dropdown-item>
    <vd-dropdown-item title="Menu Item 3" icon="user"></vd-dropdown-item>
  </div>
</vd-dropdown>`;

  simpleDropdownItemSnippet = `<vd-dropdown>
  <button vdDropdownTrigger>Simple Items</button>
  <div vdDropdownContent>
    <vd-dropdown-item title="Edit" icon="edit"></vd-dropdown-item>
    <vd-dropdown-item 
      title="Delete" 
      description="Remove this item"
      icon="trash"
    ></vd-dropdown-item>
    <vd-dropdown-item title="Archive" icon="archive"></vd-dropdown-item>
  </div>
</vd-dropdown>`;

  dropdownWithDividerSnippet = `<vd-dropdown>
  <button vdDropdownTrigger>With Divider</button>
  <div vdDropdownContent>
    <vd-dropdown-item title="New" icon="plus"></vd-dropdown-item>
    <vd-dropdown-item title="Open" icon="folder-open"></vd-dropdown-item>
    <vd-dropdown-item title="Save" icon="save"></vd-dropdown-item>
    <vd-dropdown-item-divider></vd-dropdown-item-divider>
    <vd-dropdown-item title="Exit" icon="exit"></vd-dropdown-item>
  </div>
</vd-dropdown>`;

  dropdownWithGroupedContentSnippet = `<vd-dropdown>
  <button vdDropdownTrigger>Grouped Menu</button>
  <div vdDropdownContent>
    <vd-dropdown-item-group name="Navigation">
      <vd-dropdown-item title="Dashboard" icon="dashboard"></vd-dropdown-item>
      <vd-dropdown-item title="Profile" icon="user"></vd-dropdown-item>
      <vd-dropdown-item title="Settings" icon="settings"></vd-dropdown-item>
    </vd-dropdown-item-group>
    <vd-dropdown-item-divider></vd-dropdown-item-divider>
    <vd-dropdown-item-group name="Account">
      <vd-dropdown-item 
        title="Change Password" 
        icon="lock"
      ></vd-dropdown-item>
      <vd-dropdown-item 
        title="Two-Factor Auth" 
        icon="shield"
      ></vd-dropdown-item>
    </vd-dropdown-item-group>
    <vd-dropdown-item-divider></vd-dropdown-item-divider>
    <vd-dropdown-item title="Sign Out" icon="logout"></vd-dropdown-item>
  </div>
</vd-dropdown>`;

  allImplementationSnippet = `<vd-dropdown position="bottom-left">
  <button vdDropdownTrigger>Open Dropdown</button>
  <div vdDropdownContent>
    <vd-dropdown-item-group name="Group 1">
      <vd-dropdown-item 
        title="Item with icon" 
        icon="home"
        (select)="onItemSelect()"
      ></vd-dropdown-item>
      <vd-dropdown-item 
        title="Item with description" 
        description="This is a description"
        icon="settings"
      ></vd-dropdown-item>
    </vd-dropdown-item-group>
    <vd-dropdown-item-divider></vd-dropdown-item-divider>
    <vd-dropdown-item-group name="Group 2">
      <vd-dropdown-item title="Regular item"></vd-dropdown-item>
      <vd-dropdown-item title="Disabled item" [disabled]="true"></vd-dropdown-item>
    </vd-dropdown-item-group>
  </div>
</vd-dropdown>`;

  selectEventSnippet = `<vd-dropdown>
  <button vdDropdownTrigger>Actions</button>
  <div vdDropdownContent>
    <vd-dropdown-item 
      title="Edit" 
      icon="edit"
      (select)="onEditClick()"
    ></vd-dropdown-item>
    <vd-dropdown-item 
      title="Delete" 
      icon="trash"
      (select)="onDeleteClick()"
    ></vd-dropdown-item>
    <vd-dropdown-item 
      title="Archive" 
      icon="archive"
      (select)="onArchiveClick()"
    ></vd-dropdown-item>
  </div>
</vd-dropdown>`;

  selectEventComponentSnippet = `export class MyComponent {
  onEditClick(): void {
    console.log('Edit action selected');
    // Handle edit action
  }

  onDeleteClick(): void {
    console.log('Delete action selected');
    // Handle delete action
  }

  onArchiveClick(): void {
    console.log('Archive action selected');
    // Handle archive action
  }
}`;

  // API Reference data
  apiData = [
    {
      property: 'position',
      type: "'bottom-left' | 'bottom-center' | 'bottom-right' | 'top-left' | 'top-center' | 'top-right' | 'left-start' | 'right-start'",
      default: "'bottom-left'",
      required: 'No',
      description: 'Position where the dropdown menu will appear relative to the trigger',
    },
  ];

  dropdownItemApiData = [
    {
      property: 'title',
      type: 'string',
      default: '-',
      required: 'Yes',
      description: 'The main text displayed in the dropdown item',
    },
    {
      property: 'description',
      type: 'string',
      default: '-',
      required: 'No',
      description: 'Optional secondary text displayed below the title',
    },
    {
      property: 'icon',
      type: 'string',
      default: '-',
      required: 'No',
      description: 'Name of the icon to display before the content',
    },
    {
      property: 'disabled',
      type: 'boolean',
      default: 'false',
      required: 'No',
      description: 'Whether the item is disabled and cannot be clicked',
    },
  ];

  dropdownItemEventsData = [
    {
      property: 'select',
      type: 'EventEmitter<void>',
      description: 'Emitted when the dropdown item is clicked (not emitted when disabled)',
    },
  ];

  dropdownItemGroupApiData = [
    {
      property: 'name',
      type: 'string',
      default: '-',
      required: 'No',
      description: 'Optional group title displayed above the group items',
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

  positionOptions: VdSelectOption<
    | 'bottom-left'
    | 'bottom-center'
    | 'bottom-right'
    | 'top-left'
    | 'top-center'
    | 'top-right'
    | 'left-start'
    | 'right-start'
  >[] = [
    { label: 'Bottom Left', value: 'bottom-left' },
    { label: 'Bottom Center', value: 'bottom-center' },
    { label: 'Bottom Right', value: 'bottom-right' },
    { label: 'Top Left', value: 'top-left' },
    { label: 'Top Center', value: 'top-center' },
    { label: 'Top Right', value: 'top-right' },
    { label: 'Left Start', value: 'left-start' },
    { label: 'Right Start', value: 'right-start' },
  ];

  // Playground code generation
  get codeSnippet(): string {
    const attrs: string[] = [];
    if (this.position !== 'bottom-left') {
      attrs.push(`position="${this.position}"`);
    }
    const attributes = attrs.length ? ' ' + attrs.join(' ') : '';

    return `<vd-dropdown${attributes}>
  <button vdDropdownTrigger>Open Dropdown</button>
  <div vdDropdownContent>
    <vd-dropdown-item title="Action 1" icon="vd-icon-placeholder"></vd-dropdown-item>
    <vd-dropdown-item title="Action 2" icon="vd-icon-placeholder"></vd-dropdown-item>
    <vd-dropdown-item title="Action 3" icon="vd-icon-placeholder"></vd-dropdown-item>
  </div>
</vd-dropdown>`;
  }

  onItemSelect(): void {}

  onPositionChange(newPosition: any): void {
    if (newPosition !== null && newPosition !== undefined) {
      this.position = newPosition;
    }
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
