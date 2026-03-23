import { CommonModule } from '@angular/common';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  VdBadge,
  VdDatatable,
  VdDatatableColumn,
  VdLoadingState,
  VdSwitch,
} from 'vd-angular';
import CodeContainer from '../../../components/code-container/code-container.component';
import DocPageHeader from '../../../components/doc-page-header/doc-page-header.component';

@Component({
  selector: 'app-loading-state-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    VdLoadingState,
    VdDatatable,
    VdSwitch,
    VdBadge,
    DocPageHeader,
    CodeContainer,
  ],
  templateUrl: './loading-state.page.html',
  styleUrl: './loading-state.page.scss',
})
export default class LoadingStatePage implements OnInit {
  playgroundTitle = 'Title goes here';
  playgroundDescription =
    'Nothing more exciting happening here in terms of content, but just filling up the space to make it look representative.';
  playgroundShowDescription = true;

  @ViewChild('propertyBadge', { static: true }) propertyBadge!: TemplateRef<any>;

  importCodeSnippet = `import { VdLoadingState } from 'vd-angular';`;

  basicImplementationSnippet = `<vd-loading-state
  title="Loading transactions"
  description="Please wait while we prepare your data."
></vd-loading-state>`;

  minimalImplementationSnippet = `<vd-loading-state title="Loading"></vd-loading-state>`;

  apiData = [
    {
      property: 'title',
      type: 'string',
      default: '-',
      required: 'Yes',
      description: 'Heading shown as the primary loading message',
    },
    {
      property: 'description',
      type: 'string',
      default: '-',
      required: 'No',
      description: 'Optional supporting text below the title',
    },
  ];

  apiColumns: VdDatatableColumn[] = [
    { key: 'property', title: 'Property' },
    { key: 'type', title: 'Type' },
    { key: 'default', title: 'Default' },
    { key: 'required', title: 'Required' },
    { key: 'description', title: 'Description' },
  ];

  apiColumnsWithTemplate: VdDatatableColumn[] = [];

  get playgroundCodeSnippet(): string {
    const lines: string[] = ['<vd-loading-state'];
    lines.push(`  title="${this.playgroundTitle}"`);
    if (this.playgroundShowDescription) {
      lines.push(`  description="${this.playgroundDescription}"`);
    }
    lines.push('></vd-loading-state>');
    return lines.join('\n');
  }

  ngOnInit(): void {
    this.apiColumnsWithTemplate = this.apiColumns.map((col) =>
      col.key === 'property' ? { ...col, template: this.propertyBadge } : col,
    );
  }
}
