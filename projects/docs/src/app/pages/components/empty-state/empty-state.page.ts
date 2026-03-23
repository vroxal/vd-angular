import { CommonModule } from '@angular/common';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  VdBadge,
  VdDatatable,
  VdDatatableColumn,
  VdEmptyState,
  VdSelect,
  VdSelectOption,
  VdSwitch,
} from 'vd-angular';
import iconsJson from '@vroxal/vd-icons/dist/vd-icon.json';
import CodeContainer from '../../../components/code-container/code-container.component';
import DocPageHeader from '../../../components/doc-page-header/doc-page-header.component';

@Component({
  selector: 'app-empty-state-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    VdEmptyState,
    VdDatatable,
    VdSelect,
    VdSwitch,
    VdBadge,
    DocPageHeader,
    CodeContainer,
  ],
  templateUrl: './empty-state.page.html',
  styleUrl: './empty-state.page.scss',
})
export default class EmptyStatePage implements OnInit {
  playgroundTitle = 'Title goes here';
  playgroundDescription =
    'Nothing more exciting happening here in terms of content, but just filling up the space to make it look representative.';
  playgroundIcon = 'vd-icon-placeholder';
  playgroundShowIcon = true;
  playgroundBoxed = true;
  playgroundShowPrimaryAction = true;
  playgroundShowSecondaryAction = true;

  @ViewChild('propertyBadge', { static: true }) propertyBadge!: TemplateRef<any>;

  importCodeSnippet = `import { VdEmptyState } from 'vd-angular';`;

  basicImplementationSnippet = `<vd-empty-state
  title="No results found"
  description="Try changing filters or refining your search terms."
  primaryActionLabel="Add Item"
  secondaryActionLabel="Learn More"
  (primaryActionClick)="onAddItem()"
  (secondaryActionClick)="onLearnMore()"
></vd-empty-state>`;

  iconlessImplementationSnippet = `<vd-empty-state
  [showIcon]="false"
  title="No Data Available"
  description="Your data will appear here once records are added."
></vd-empty-state>`;

  unboxedImplementationSnippet = `<vd-empty-state
  [boxed]="false"
  title="No Data Available"
  description="Your data will appear here once records are added."
  primaryActionLabel="Confirm"
  secondaryActionLabel="Cancel"
></vd-empty-state>`;

  noActionImplementationSnippet = `<vd-empty-state
  title="No Notifications Yet"
  description="Notifications will appear here when there is activity."
></vd-empty-state>`;

  apiData = [
    {
      property: 'title',
      type: 'string',
      default: '-',
      required: 'Yes',
      description: 'Heading shown as the primary message',
    },
    {
      property: 'description',
      type: 'string',
      default: '-',
      required: 'No',
      description: 'Supporting description shown below the title',
    },
    {
      property: 'icon',
      type: 'string',
      default: "'vd-icon-placeholder'",
      required: 'No',
      description: 'Icon class rendered in the icon container',
    },
    {
      property: 'showIcon',
      type: 'boolean',
      default: 'true',
      required: 'No',
      description: 'Show or hide the icon container',
    },
    {
      property: 'boxed',
      type: 'boolean',
      default: 'true',
      required: 'No',
      description:
        'When true, renders padded boxed container with border/background. When false, removes padding, border and background',
    },
    {
      property: 'primaryActionLabel',
      type: 'string',
      default: "''",
      required: 'No',
      description: 'Primary button label. Visible only when label is provided',
    },
    {
      property: 'secondaryActionLabel',
      type: 'string',
      default: "''",
      required: 'No',
      description: 'Secondary button label. Visible only when label is provided',
    },
  ];

  outputData = [
    {
      property: 'primaryActionClick',
      type: 'EventEmitter<void>',
      description: 'Emitted when the primary action button is clicked',
    },
    {
      property: 'secondaryActionClick',
      type: 'EventEmitter<void>',
      description: 'Emitted when the secondary action button is clicked',
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

  iconOptions: VdSelectOption<string>[] = [
    { label: 'Placeholder', value: 'vd-icon-placeholder' },
    ...Object.keys(iconsJson).map((key) => ({
      label: this.toLabel(key),
      value: `vd-icon-${key}`,
    })),
  ];

  get playgroundCodeSnippet(): string {
    const lines: string[] = ['<vd-empty-state'];
    lines.push(`  title="${this.playgroundTitle}"`);
    lines.push(`  description="${this.playgroundDescription}"`);
    lines.push(`  icon="${this.playgroundIcon}"`);
    if (this.playgroundShowPrimaryAction) {
      lines.push('  primaryActionLabel="Confirm"');
    }
    if (this.playgroundShowSecondaryAction) {
      lines.push('  secondaryActionLabel="Cancel"');
    }
    if (!this.playgroundShowIcon) {
      lines.push('  [showIcon]="false"');
    }
    if (!this.playgroundBoxed) {
      lines.push('  [boxed]="false"');
    }
    lines.push('></vd-empty-state>');
    return lines.join('\n');
  }

  onPlaygroundActionClick(): void {
    // no-op for docs example
  }

  ngOnInit(): void {
    this.apiColumnsWithTemplate = this.apiColumns.map((col) =>
      col.key === 'property' ? { ...col, template: this.propertyBadge } : col,
    );
    this.outputColumnsWithTemplate = this.outputColumns.map((col) =>
      col.key === 'property' ? { ...col, template: this.propertyBadge } : col,
    );
  }

  private toLabel(key: string): string {
    return key
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
}
