import { Component, TemplateRef, ViewChild, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  VdTooltipDirective,
  VdDatatable,
  VdDatatableColumn,
  VdSelect,
  VdSelectOption,
  VdBadge,
  VdButton,
} from 'vd-angular';

import DocPageHeader from '../../../components/doc-page-header/doc-page-header.component';
import CodeContainer from '../../../components/code-container/code-container.component';

type TooltipPosition =
  | 'top-center'
  | 'top-left'
  | 'top-right'
  | 'center-left'
  | 'center-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right';

@Component({
  selector: 'app-tooltip-page',
  standalone: true,
  imports: [
    VdTooltipDirective,
    VdDatatable,
    VdSelect,
    VdBadge,
    VdButton,
    FormsModule,
    CommonModule,
    DocPageHeader,
    CodeContainer,
  ],
  templateUrl: './tooltip.page.html',
  styleUrl: './tooltip.page.scss',
})
export default class TooltipPage implements OnInit {
  tooltipText = 'This is helpful information';
  position: TooltipPosition = 'top-center';
  showPlaceholder = true;

  @ViewChild('propertyBadge', { static: true }) propertyBadge!: TemplateRef<any>;

  // Code snippets
  importCodeSnippet = 'import { VdTooltipDirective } from "vd-angular";';

  basicImplementationSnippet = `<button
  [vdTooltip]="'Helpful information'"
>
  Hover for tooltip
</button>`;

  positionsSnippet = `<button [vdTooltip]="'Top center'" [vdTooltipPosition]="'top-center'">
  Top center
</button>

<button [vdTooltip]="'Center left'" [vdTooltipPosition]="'center-left'">
  Center left
</button>

<button [vdTooltip]="'Bottom right'" [vdTooltipPosition]="'bottom-right'">
  Bottom right
</button>`;

  // API Reference data
  apiData = [
    {
      property: 'vdTooltip',
      type: 'string',
      description: 'The tooltip text content to display on hover',
      default: "''",
      required: 'Yes',
    },
    {
      property: 'vdTooltipPosition',
      type: "'top-center' | 'top-left' | 'top-right' | 'center-left' | 'center-right' | 'bottom-left' | 'bottom-center' | 'bottom-right'",
      description: 'Position of the tooltip relative to the trigger element',
      default: "'top-center'",
      required: 'No',
    },
  ];

  apiColumns: VdDatatableColumn[] = [
    { key: 'property', title: 'Property' },
    { key: 'type', title: 'Type' },
    { key: 'description', title: 'Description' },
    { key: 'default', title: 'Default' },
    { key: 'required', title: 'Required' },
  ];

  apiColumnsWithTemplate: VdDatatableColumn[] = [];

  positionOptions: VdSelectOption<TooltipPosition>[] = [
    { label: 'Top Center', value: 'top-center' },
    { label: 'Top Left', value: 'top-left' },
    { label: 'Top Right', value: 'top-right' },
    { label: 'Center Left', value: 'center-left' },
    { label: 'Center Right', value: 'center-right' },
    { label: 'Bottom Left', value: 'bottom-left' },
    { label: 'Bottom Center', value: 'bottom-center' },
    { label: 'Bottom Right', value: 'bottom-right' },
  ];

  get codeSnippet(): string {
    const attrs: string[] = ['[vdTooltip]="tooltipText"'];
    if (this.position !== 'top-center') {
      attrs.push(`[vdTooltipPosition]="'${this.position}'"`);
    }
    if (this.showPlaceholder) {
      const attributes = attrs.join('\n  ');
      return `<vd-button
  ${attributes}
  label="Hover for tooltip"
></vd-button>`;
    } else {
      const attributes = attrs.join('\n  ');
      return `<button
  ${attributes}
>
  Hover for tooltip
</button>`;
    }
  }

  ngOnInit(): void {
    this.apiColumnsWithTemplate = this.apiColumns.map((col) =>
      col.key === 'property' ? { ...col, template: this.propertyBadge } : col,
    );
  }
}
