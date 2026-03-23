import { Component, TemplateRef, ViewChild, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  VdSwitch,
  VdDatatable,
  VdDatatableColumn,
  VdBadge,
  VdInput,
} from 'vd-angular';

import DocPageHeader from '../../../components/doc-page-header/doc-page-header.component';
import CodeContainer from '../../../components/code-container/code-container.component';

@Component({
  selector: 'app-switch-page',
  standalone: true,
  imports: [
    VdSwitch,
    VdDatatable,
    VdBadge,
    VdInput,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    DocPageHeader,
    CodeContainer,
  ],
  templateUrl: './switch.page.html',
  styleUrl: './switch.page.scss',
})
export default class SwitchPage implements OnInit {
  checked = false;
  disabled = false;
  label = 'Enable Feature';
  labelVariations = 'Dark Mode';

  @ViewChild('propertyBadge', { static: true }) propertyBadge!: TemplateRef<any>;

  // Code snippets
  importCodeSnippet = 'import { VdSwitch } from "vd-angular";';

  basicImplementationSnippet = `<vd-switch
  label="Enable Feature"
  [checked]="isEnabled"
  (change)="onSwitchChange($event)"
></vd-switch>

export class MyComponent {
  isEnabled = false;

  onSwitchChange(value: boolean): void {
    console.log('Switch toggled:', value);
  }
}`;

  allImplementationSnippet = `<vd-switch
  label="Enable Feature"
  [checked]="isEnabled"
  [disabled]="false"
  (change)="onSwitchChange($event)"
></vd-switch>`;

  eventHandlingSnippet = `<vd-switch
  label="Feature Flag"
  [checked]="featureEnabled"
  (change)="onFeatureToggle($event)"
></vd-switch>`;

  eventHandlingComponentSnippet = `export class MyComponent {
  featureEnabled = false;

  onFeatureToggle(isEnabled: boolean): void {
    if (isEnabled) {
      console.log('Feature enabled');
      this.initializeFeature();
    } else {
      console.log('Feature disabled');
      this.cleanupFeature();
    }
  }

  private initializeFeature(): void {
    // Setup logic
  }

  private cleanupFeature(): void {
    // Cleanup logic
  }
}`;

  // API Reference data
  apiData = [
    {
      property: 'label',
      type: 'string',
      default: '-',
      required: 'No',
      description: 'Optional label text displayed above the switch',
    },
    {
      property: 'checked',
      type: 'boolean',
      default: 'false',
      required: 'No',
      description: 'Whether the switch is currently active/checked',
    },
    {
      property: 'disabled',
      type: 'boolean',
      default: 'false',
      required: 'No',
      description: 'Whether the switch is disabled and cannot be toggled',
    },
  ];

  outputsData = [
    {
      property: 'change',
      type: 'EventEmitter<boolean>',
      description: 'Emitted when the switch is toggled, with the new state',
    },
  ];

  cvAccessorData = [
    {
      property: 'writeValue',
      type: 'Method',
      description: 'Updates the component value',
    },
    {
      property: 'registerOnChange',
      type: 'Method',
      description: 'Registers a callback for value changes',
    },
    {
      property: 'registerOnTouched',
      type: 'Method',
      description: 'Registers a callback for blur events',
    },
    {
      property: 'setDisabledState',
      type: 'Method',
      description: 'Sets the disabled state programmatically',
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

  cvAccessorColumns: VdDatatableColumn[] = [
    { key: 'property', title: 'Method' },
    { key: 'type', title: 'Type' },
    { key: 'description', title: 'Description' },
  ];

  apiColumnsWithTemplate: VdDatatableColumn[] = [];
  eventsColumnsWithTemplate: VdDatatableColumn[] = [];
  cvAccessorColumnsWithTemplate: VdDatatableColumn[] = [];

  get codeSnippet(): string {
    const attrs: string[] = [];
    if (this.label) {
      attrs.push(`label="${this.label}"`);
    }
    if (this.checked) {
      attrs.push(`[checked]="true"`);
    }
    if (this.disabled) {
      attrs.push(`[disabled]="true"`);
    }
    attrs.push(`(change)="onSwitchChange($event)"`);
    const attributes = attrs.length ? '\n  ' + attrs.join('\n  ') : '';

    return `<vd-switch${attributes}
></vd-switch>`;
  }

  onSwitchChange(value: boolean): void {
  }

  ngOnInit(): void {
    this.apiColumnsWithTemplate = this.apiColumns.map((col) =>
      col.key === 'property' ? { ...col, template: this.propertyBadge } : col,
    );
    this.eventsColumnsWithTemplate = this.eventsColumns.map((col) =>
      col.key === 'property' ? { ...col, template: this.propertyBadge } : col,
    );
    this.cvAccessorColumnsWithTemplate = this.cvAccessorColumns.map((col) =>
      col.key === 'property' ? { ...col, template: this.propertyBadge } : col,
    );
  }
}
