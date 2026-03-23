import {
  Component,
  signal,
  ChangeDetectorRef,
  TemplateRef,
  ViewChild,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  VdAccordion,
  VdInput,
  VdSelect,
  VdSelectOption,
  VdSwitch,
  VdDatatable,
  VdDatatableColumn,
  VdBadge,
} from 'vd-angular';
import DocPageHeader from '../../../components/doc-page-header/doc-page-header.component';
import CodeContainer from '../../../components/code-container/code-container.component';
import iconsJson from '@vroxal/vd-icons/dist/vd-icon.json';

@Component({
  selector: 'app-accordion-page',
  imports: [
    VdAccordion,
    VdInput,
    VdSelect,
    VdSwitch,
    VdDatatable,
    VdBadge,
    CommonModule,
    FormsModule,
    DocPageHeader,
    CodeContainer,
  ],
  templateUrl: './accordion.page.html',
  styleUrl: './accordion.page.scss',
})
export default class AccordionPage implements OnInit {
  variant: 'filled' | 'divided' = 'filled';
  active = false;
  title = 'Accordion Title';
  icon = '';

  @ViewChild('propertyBadge', { static: true }) propertyBadge!: TemplateRef<any>;

  // Code snippet variables
  importCodeSnippet = 'import { VdAccordion } from "vd-angular";';

  basicImplementationSnippet = `<vd-accordion title="Section Title">
The content of the accordion goes here. \nThis content is revealed when the accordion is expanded.
</vd-accordion>`;
  allImplementationSnippet = `<vd-accordion 
  title="Section Title"
  variant="divided"
  [active]="true"
  icon="vd-icon-example"
>
The content of the accordion goes here. \nThis content is revealed when the accordion is expanded.
</vd-accordion>`;

  // API Reference data
  apiData = [
    {
      property: 'title',
      type: 'string',
      default: '-',
      required: 'Yes',
      description: 'Title text displayed in the accordion header',
    },
    {
      property: 'variant',
      type: "'filled' | 'divided'",
      default: "'filled'",
      required: 'No',
      description: 'Visual style of the accordion',
    },
    {
      property: 'active',
      type: 'boolean',
      default: 'false',
      required: 'No',
      description: 'Controls whether the accordion is expanded',
    },
    {
      property: 'icon',
      type: 'string',
      default: '-',
      required: 'No',
      description: 'Optional icon to display in the header',
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

  variantOptions: VdSelectOption<'filled' | 'divided'>[] = [
    { label: 'Filled', value: 'filled' },
    { label: 'Divided', value: 'divided' },
  ];

  iconOptions: VdSelectOption<string>[] = [
    { label: 'None', value: '' },
    ...Object.keys(iconsJson).map((key) => ({
      label: this.toLabel(key),
      value: `vd-icon-${key}`,
    })),
  ];

  ngOnInit(): void {
    this.apiColumnsWithTemplate = this.apiColumns.map((col) =>
      col.key === 'property' ? { ...col, template: this.propertyBadge } : col,
    );
  }

  private toLabel(key: string): string {
    return key
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  get codeSnippet(): string {
    const attrs: string[] = [];
    if (this.variant !== 'filled') {
      attrs.push(`variant="${this.variant}"`);
    }
    if (this.active) {
      attrs.push(`[active]="true"`);
    }
    if (this.icon) {
      attrs.push(`icon="${this.icon}"`);
    }
    const attributes = attrs.length ? '\n  ' + attrs.join('\n  ') : '';

    return `<vd-accordion
  title="${this.title}"${attributes}
>
  <!-- Accordion content goes here -->
</vd-accordion>`;
  }
}
