import { Component, TemplateRef, ViewChild, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  VdProgressTracker,
  VdProgressTrackerItem,
  VdDatatable,
  VdDatatableColumn,
  VdSelect,
  VdSelectOption,
  VdSwitch,
  VdBadge,
} from 'vd-angular';

import DocPageHeader from '../../../components/doc-page-header/doc-page-header.component';
import CodeContainer from '../../../components/code-container/code-container.component';
import ProgressTrackerUsageExample from './progress-tracker-usage-example/progress-tracker-usage-example.component';

@Component({
  selector: 'app-progress-tracker-page',
  imports: [
    VdProgressTracker,
    VdDatatable,
    VdSelect,
    VdSwitch,
    VdBadge,
    FormsModule,
    CommonModule,
    DocPageHeader,
    CodeContainer,
    ProgressTrackerUsageExample,
  ],
  templateUrl: './progress-tracker.page.html',
  styleUrl: './progress-tracker.page.scss',
})
export default class ProgressTrackerPage implements OnInit {
  direction: 'horizontal' | 'vertical' = 'vertical';
  indicatorType: 'number' | 'icon' = 'number';
  showDescription = true;
  activeStep = 1;

  @ViewChild('propertyBadge', { static: true }) propertyBadge!: TemplateRef<any>;

  // Code snippets
  importCodeSnippet = 'import { VdProgressTracker, VdProgressTrackerItem } from "vd-angular";';

  basicImplementationTypescriptSnippet = `export class MyComponent {
  items: VdProgressTrackerItem[] = [
    {
      title: 'Personal Information',
      description: 'Enter your name and contact details',
      state: 'completed',
    },
    {
      title: 'Business Details',
      description: 'Provide your company information',
      state: 'active',
    },
    {
      title: 'Review',
      description: 'Verify and submit your application',
      state: 'default',
    },
  ];
}`;

  basicImplementationTemplateSnippet = `<vd-progress-tracker
  [items]="items"
  direction="vertical"
  indicatorType="number"
></vd-progress-tracker>`;

  iconImplementationTypescriptSnippet = `export class MyComponent {
  items: VdProgressTrackerItem[] = [
    {
      title: 'Profile',
      description: 'Confirm your personal profile details',
      icon: 'vd-icon-user',
      state: 'completed',
    },
    {
      title: 'Business',
      description: 'Provide business information',
      icon: 'vd-icon-settings',
      state: 'active',
    },
    {
      title: 'Security',
      description: 'Set up your security preferences',
      icon: 'vd-icon-home',            
      state: 'default',
    },
  ];
}`;

  iconImplementationTemplateSnippet = `<vd-progress-tracker
  [items]="items"
  direction="horizontal"
  indicatorType="icon"
></vd-progress-tracker>`;

  interactionImplementationTypescriptSnippet = `export class MyComponent {
  activeIndex = 1;

  onProgressClick(index: number): void {
    this.activeIndex = index;
    // Update your active step content here
  }
}`;

  interactionImplementationTemplateSnippet = `<vd-progress-tracker
  [items]="items"
  (itemClick)="onProgressClick($event)"
></vd-progress-tracker>`;

  stepperImplementationTypescriptSnippet = `export class MyComponent {
  activeIndex = 0;

  items: VdProgressTrackerItem[] = [
    {
      title: 'Account Setup',
      description: 'Create login credentials',
      state: 'completed',
    },
    {
      title: 'Business Details',
      description: 'Provide business information',
      state: 'active',
    },
    {
      title: 'Identity Verification',
      description: 'Upload verification documents',
      state: 'default',
    },
    {
      title: 'Review & Submit',
      description: 'Confirm and submit application',
      state: 'default',
    },
  ];

  onProgressClick(index: number): void {
    this.activeIndex = index;
  }
}`;

  stepperImplementationTemplateSnippet = `<vd-progress-tracker
  [items]="items"
  (itemClick)="onProgressClick($event)"
></vd-progress-tracker>

<div class="stepper-content" [ngSwitch]="activeIndex">
  <div *ngSwitchCase="0">Account setup content...</div>
  <div *ngSwitchCase="1">Business details content...</div>
  <div *ngSwitchCase="2">Identity verification content...</div>
  <div *ngSwitchCase="3">Review and submit content...</div>
</div>`;

  allImplementationSnippet = `<vd-progress-tracker
  [items]="items"
  direction="vertical"
  indicatorType="number"
  [showDescription]="true"
  [showConnector]="true"
  defaultIcon="vd-icon-placeholder"
></vd-progress-tracker>`;

  numberItems: VdProgressTrackerItem[] = [
    {
      title: 'Progress Title',
      description: 'This is a description of the progress',
      state: 'default',
    },
  ];

  iconItems: VdProgressTrackerItem[] = [
    {
      title: 'Profile',
      description: 'Confirm your personal profile details',
      state: 'default',
      icon: 'vd-icon-user',
    },
  ];

  stateItems: VdProgressTrackerItem[] = [
    { title: 'Default', description: 'This is a description of the progress', state: 'default' },
    { title: 'Active', description: 'This is a description of the progress', state: 'active' },
    {
      title: 'Completed',
      description: 'This is a description of the progress',
      state: 'completed',
    },
    { title: 'Error', description: 'This is a description of the progress', state: 'error' },
    { title: 'Disabled', description: 'This is a description of the progress', state: 'disabled' },
  ];
  stateIconItems: VdProgressTrackerItem[] = [
    {
      title: 'Default',
      description: 'This is a description of the progress',
      state: 'default',
      icon: 'vd-icon-user',
    },
    {
      title: 'Active',
      description: 'Confirm your personal profile details',
      state: 'active',
      icon: 'vd-icon-user',
    },
    {
      title: 'Completed',
      description: 'Confirm your personal profile details',
      state: 'completed',
      icon: 'vd-icon-user',
    },
    {
      title: 'Error',
      description: 'Confirm your personal profile details',
      state: 'error',
      icon: 'vd-icon-user',
    },
    {
      title: 'Disabled',
      description: 'Confirm your personal profile details',
      state: 'disabled',
      icon: 'vd-icon-user',
    },
  ];

  longFormItems: VdProgressTrackerItem[] = [
    {
      title: 'Personal Information',
      description: 'Enter your name, address, and contact details',
      state: 'completed',
    },
    {
      title: 'Business Details',
      description: 'Share business registration',
      state: 'error',
    },
    {
      title: 'Identity Verification',
      description: 'Upload documents to verify your identity',
      state: 'active',
    },
    {
      title: 'Review & Submit',
      description: 'Confirm details and submit your application',
      state: 'default',
    },
  ];

  playgroundBaseItems: VdProgressTrackerItem[] = [
    {
      title: 'Personal Information',
      description: 'Enter your name and contact details',
      icon: 'vd-icon-user',
    },
    {
      title: 'Business Details',
      description: 'Provide company details and address',
      icon: 'vd-icon-settings',
    },
    {
      title: 'Verification',
      description: 'Submit required documents',
      icon: 'vd-icon-tick',
    },
    {
      title: 'Review',
      description: 'Confirm and submit your application',
      icon: 'vd-icon-eye',
    },
  ];

  playgroundItems: VdProgressTrackerItem[] = [];

  // API Reference data
  apiData = [
    {
      property: 'items',
      type: 'VdProgressTrackerItem[]',
      default: '[]',
      required: 'Yes',
      description: 'List of progress tracker items',
    },
    {
      property: 'direction',
      type: "'horizontal' | 'vertical'",
      default: "'vertical'",
      required: 'No',
      description: 'Layout direction of the tracker',
    },
    {
      property: 'indicatorType',
      type: "'number' | 'icon'",
      default: "'number'",
      required: 'No',
      description: 'Default indicator style for items (completed/error icons are fixed)',
    },
    {
      property: 'showDescription',
      type: 'boolean',
      default: 'true',
      required: 'No',
      description: 'Whether item descriptions are shown',
    },
    {
      property: 'showConnector',
      type: 'boolean',
      default: 'true',
      required: 'No',
      description: 'Show connector line between vertical items',
    },
    {
      property: 'defaultIcon',
      type: 'string',
      default: "'vd-icon-placeholder'",
      required: 'No',
      description: 'Fallback icon when icon indicator has no icon',
    },
  ];

  apiColumns: VdDatatableColumn[] = [
    { key: 'property', title: 'Property' },
    { key: 'type', title: 'Type' },
    { key: 'default', title: 'Default' },
    { key: 'required', title: 'Required' },
    { key: 'description', title: 'Description' },
  ];

  outputData = [
    {
      property: 'itemClick',
      type: 'EventEmitter<number>',
      description: 'Emits the index of the clicked item (default and completed only)',
    },
  ];

  outputColumns: VdDatatableColumn[] = [
    { key: 'property', title: 'Property' },
    { key: 'type', title: 'Type' },
    { key: 'description', title: 'Description' },
  ];

  apiColumnsWithTemplate: VdDatatableColumn[] = [];

  directionOptions: VdSelectOption<'horizontal' | 'vertical'>[] = [
    { label: 'Horizontal', value: 'horizontal' },
    { label: 'Vertical', value: 'vertical' },
  ];

  indicatorTypeOptions: VdSelectOption<'number' | 'icon'>[] = [
    { label: 'Number', value: 'number' },
    { label: 'Icon', value: 'icon' },
  ];

  stepOptions: VdSelectOption<number>[] = [];

  get codeSnippet(): string {
    const attrs: string[] = [];
    if (this.direction !== 'vertical') {
      attrs.push(`direction="${this.direction}"`);
    }
    if (this.indicatorType !== 'number') {
      attrs.push(`indicatorType="${this.indicatorType}"`);
    }
    if (!this.showDescription) {
      attrs.push(`[showDescription]="false"`);
    }
    const attributes = attrs.length ? '\n  ' + attrs.join('\n  ') : '';

    return `<vd-progress-tracker\n  [items]="items"${attributes}\n></vd-progress-tracker>`;
  }

  ngOnInit(): void {
    this.apiColumnsWithTemplate = this.apiColumns.map((col) =>
      col.key === 'property' ? { ...col, template: this.propertyBadge } : col,
    );

    this.stepOptions = this.playgroundBaseItems.map((item, index) => ({
      label: `${index + 1}. ${item.title}`,
      value: index,
    }));

    this.updatePlaygroundItems();
  }

  updatePlaygroundItems(): void {
    this.playgroundItems = this.playgroundBaseItems.map((item, index) => {
      let state: VdProgressTrackerItem['state'] = 'default';

      if (index < this.activeStep) {
        state = 'completed';
      } else if (index === this.activeStep) {
        state = 'active';
      }

      return {
        ...item,
        state,
      };
    });
  }

  onPlaygroundChange(): void {
    this.updatePlaygroundItems();
  }

  activeIndex = 1;
  onProgressClick(index: number): void {
    this.activeIndex = index;
  }
}
