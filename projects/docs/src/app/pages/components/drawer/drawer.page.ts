import { ChangeDetectorRef, Component, TemplateRef, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  VdAlert,
  VdButton,
  VdDatatable,
  VdDatatableColumn,
  VdDrawerService,
  VdInput,
  VdSelect,
  VdSelectOption,
  VdSwitch,
  VdTextarea,
} from 'vd-angular';
import DocPageHeader from '../../../components/doc-page-header/doc-page-header.component';
import CodeContainer from '../../../components/code-container/code-container.component';

interface SlotFormData {
  displayName: string;
  email: string;
  status: string;
  notes: string;
}

@Component({
  selector: 'app-drawer-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    VdAlert,
    VdButton,
    VdDatatable,
    VdInput,
    VdSelect,
    VdSwitch,
    VdTextarea,
    DocPageHeader,
    CodeContainer,
  ],
  templateUrl: './drawer.page.html',
  styleUrl: './drawer.page.scss',
})
export default class DrawerPage {
  // Playground state
  size: 'sm' | 'md' | 'lg' = 'md';
  title = 'Customer Details';
  showPrimaryAction = true;
  showSecondaryAction = true;
  primaryActionLabel = 'Save Changes';
  secondaryActionLabel = 'Cancel';
  lastResult = '';
  formSlotData: SlotFormData = this.createEmptyFormSlotData();
  submittedFormData: SlotFormData | null = null;

  sizeOptions: VdSelectOption<'sm' | 'md' | 'lg'>[] = [
    { label: 'Small (1 column - 320px)', value: 'sm' },
    { label: 'Medium (2 columns - 560px)', value: 'md' },
    { label: 'Large (3 columns - 920px)', value: 'lg' },
  ];

  statusOptions: VdSelectOption<string>[] = [
    { label: 'Active', value: 'active' },
    { label: 'Inactive', value: 'inactive' },
    { label: 'Pending', value: 'pending' },
  ];

  // Code snippets
  importCodeSnippet = `import { VdDrawerService } from 'vd-angular';`;

  basicImplementationTemplateSnippet = `<ng-template #drawerContent>
  <!-- Slot content can be anything -->
  <vd-input label="Full name" placeholder="Enter full name"></vd-input>
  <vd-input label="Email" placeholder="Enter email"></vd-input>
  <vd-select label="Status" placeholder="Select status" [options]="statusOptions"></vd-select>
  <vd-textarea label="Notes" placeholder="Add notes"></vd-textarea>
</ng-template>

<vd-button label="Open drawer" (click)="openDrawer(drawerContent)"></vd-button>`;

  basicImplementationTypescriptSnippet = `import { Component, TemplateRef } from '@angular/core';
import { VdDrawerService } from 'vd-angular';

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html'
})
export class ExampleComponent {
  constructor(private vdDrawer: VdDrawerService) {}

  openDrawer(template: TemplateRef<unknown>): void {
    this.vdDrawer.open({
      title: 'Customer Details',
      size: 'md',
      contentTemplate: template,
      primaryActionLabel: 'Save Changes',
      secondaryActionLabel: 'Cancel'
    }).then(result => {
      if (result === 'primary') {
        // User clicked the primary action button
      } else if (result === 'secondary') {
        // User clicked the secondary action button
      } else {
        // User closed using close icon, escape key, or backdrop click
      }
    });
  }
}`;

  outputHandlingSnippet = `this.vdDrawer.open({
  title: 'Review Transaction',
  contentTemplate: drawerTemplate,
  primaryActionLabel: 'Approve',
  secondaryActionLabel: 'Request Changes'
}).then(result => {
  switch (result) {
    case 'primary':
      // Triggered by primary action click (label text can be any value)
      break;
    case 'secondary':
      // Triggered by secondary action click (label text can be any value)
      break;
    default:
      // Triggered by close icon, escape key, or backdrop click
      break;
  }
});`;

  formSubmitHandlingSnippet = `formSlotData = {
displayName: '',
email: '',
status: '',
notes: ''
};

submittedFormData: typeof formSlotData | null = null;

openProfileDrawer(template: TemplateRef<unknown>): void {
  this.formSlotData = { displayName: '', email: '', status: '', notes: '' };

  this.vdDrawer.open({
    title: 'Profile Form',
    size: 'sm',
    contentTemplate: template,
    primaryActionLabel: 'Save',
    secondaryActionLabel: 'Cancel'
  }).then(result => {
    if (result === 'primary') {
      this.submittedFormData = { ...this.formSlotData };
    }
  });
}`;

  slotWithContextSnippet = `<ng-template #summaryContent let-summary="summary">
  <h3 class="title-medium">{{ summary.title }}</h3>
  <p class="body-medium">{{ summary.description }}</p>
  <vd-alert
    [title]="summary.alertTitle"
    [description]="summary.alertDescription"
    color="info"
  ></vd-alert>
</ng-template>

this.vdDrawer.open({
  title: 'Context Slot Example',
  size: 'md',
  contentTemplate: summaryContent,
  context: {
    summary: {
      title: 'Risk Summary',
      description: 'Rendered from template context.',
      alertTitle: '2 items need review',
      alertDescription: 'Check pending transactions before approval.'
    }
  },
  primaryActionLabel: 'Approve',
  secondaryActionLabel: 'Back'
});`;

  sizeExampleSnippet = `this.vdDrawer.open({
  title: 'Small drawer',
  size: 'sm',
  contentTemplate: template
});
// sm: 320px (1 column), md: 560px (2 columns), lg: 920px (3 columns)`;

  // API Reference data
  apiConfigData = [
    {
      property: 'title',
      type: 'string',
      required: 'Yes',
      description: 'Title text displayed in the drawer header',
    },
    {
      property: 'size',
      type: "'sm' | 'md' | 'lg'",
      required: 'No',
      default: "'md'",
      description:
        'Drawer size with fixed widths and layout: sm=320px (1 column), md=560px (2 columns), lg=920px (3 columns)',
    },
    {
      property: 'contentTemplate',
      type: 'TemplateRef',
      required: 'Yes',
      description: 'Template rendered inside the drawer content area',
    },
    {
      property: 'context',
      type: 'any',
      required: 'No',
      default: 'undefined',
      description: 'Context object passed to the content template',
    },
    {
      property: 'primaryActionLabel',
      type: 'string',
      required: 'No',
      default: 'undefined',
      description:
        "Primary action button label. Clicking this button resolves open() with 'primary'.",
    },
    {
      property: 'secondaryActionLabel',
      type: 'string',
      required: 'No',
      default: 'undefined',
      description:
        "Secondary action button label. Clicking this button resolves open() with 'secondary'.",
    },
  ];

  apiColumns: VdDatatableColumn[] = [
    { key: 'property', title: 'Property' },
    { key: 'type', title: 'Type' },
    { key: 'required', title: 'Required' },
    { key: 'default', title: 'Default' },
    { key: 'description', title: 'Description' },
  ];

  outputData = [
    {
      result: 'primary',
      trigger: 'Primary action button click',
      description:
        "Returned when the primary button is clicked. The result key remains 'primary' regardless of primaryActionLabel.",
    },
    {
      result: 'secondary',
      trigger: 'Secondary action button click',
      description:
        "Returned when the secondary button is clicked. The result key remains 'secondary' regardless of secondaryActionLabel.",
    },
    {
      result: 'close',
      trigger: 'Close icon, Escape key, or backdrop click',
      description:
        'Returned when the drawer is dismissed without clicking primary or secondary action.',
    },
  ];

  outputColumns: VdDatatableColumn[] = [
    { key: 'result', title: 'Result' },
    { key: 'trigger', title: 'Trigger' },
    { key: 'description', title: 'Description' },
  ];

  slotColumns: VdDatatableColumn[] = [
    { key: 'id', title: 'ID' },
    { key: 'merchant', title: 'Merchant' },
    { key: 'amount', title: 'Amount' },
    { key: 'status', title: 'Status' },
  ];

  slotData = [
    { id: 'TXN-1024', merchant: 'Cafe Rasa', amount: 'NPR 1,250', status: 'Pending' },
    { id: 'TXN-1025', merchant: 'KTM Mart', amount: 'NPR 4,890', status: 'Approved' },
    { id: 'TXN-1026', merchant: 'Hotel Mira', amount: 'NPR 8,100', status: 'Pending' },
  ];

  slotSummaryContext = {
    summary: {
      title: 'Risk Summary',
      description: 'Rendered from template context.',
      alertTitle: '2 items need review',
      alertDescription: 'Check pending transactions before approval.',
    },
  };

  constructor(
    private vdDrawer: VdDrawerService,
    private cdr: ChangeDetectorRef,
    private ngZone: NgZone,
  ) {}

  private setLastResult(result: string): void {
    this.ngZone.run(() => {
      this.lastResult = `Last action: ${result}`;
    });
  }

  private createEmptyFormSlotData(): SlotFormData {
    return {
      displayName: '',
      email: '',
      status: '',
      notes: '',
    };
  }

  private setSubmittedFormData(data: SlotFormData): void {
    this.ngZone.run(() => {
      this.submittedFormData = data;
    });
  }

  openDrawer(template: TemplateRef<unknown>, size: 'sm' | 'md' | 'lg' = 'md'): void {
    this.vdDrawer
      .open({
        title: `${size.toUpperCase()} drawer`,
        size,
        contentTemplate: template,
        primaryActionLabel: 'Save Changes',
        secondaryActionLabel: 'Cancel',
      })
      .then((result) => {
        this.setLastResult(result);
      });
  }

  openSlotFormExample(template: TemplateRef<unknown>): void {
    this.formSlotData = this.createEmptyFormSlotData();

    this.vdDrawer
      .open({
        title: 'Profile Form',
        size: 'sm',
        contentTemplate: template,
        primaryActionLabel: 'Save',
        secondaryActionLabel: 'Cancel',
      })
      .then((result) => {
        this.setLastResult(result);

        if (result === 'primary') {
          this.setSubmittedFormData({ ...this.formSlotData });
        }
      });
  }

  onFormSlotStatusChange(value: string | null): void {
    this.formSlotData.status = value ?? '';
  }

  openSlotDataExample(template: TemplateRef<unknown>): void {
    this.vdDrawer
      .open({
        title: 'Transaction Review',
        size: 'lg',
        contentTemplate: template,
        primaryActionLabel: 'Confirm',
        secondaryActionLabel: 'Cancel',
      })
      .then((result) => {
        this.setLastResult(result);
      });
  }

  openSlotContextExample(template: TemplateRef<unknown>): void {
    this.vdDrawer
      .open({
        title: 'Context Slot Example',
        size: 'md',
        contentTemplate: template,
        context: this.slotSummaryContext,
        primaryActionLabel: 'Approve',
        secondaryActionLabel: 'Back',
      })
      .then((result) => {
        this.setLastResult(result);
      });
  }

  openNoActionsExample(template: TemplateRef<unknown>): void {
    this.vdDrawer
      .open({
        title: 'Read-only Details',
        size: 'md',
        contentTemplate: template,
      })
      .then((result) => {
        this.setLastResult(result);
      });
  }

  openPlayground(template: TemplateRef<unknown>): void {
    this.vdDrawer
      .open({
        title: this.title,
        size: this.size,
        contentTemplate: template,
        primaryActionLabel: this.showPrimaryAction ? this.primaryActionLabel : undefined,
        secondaryActionLabel: this.showSecondaryAction ? this.secondaryActionLabel : undefined,
      })
      .then((result) => {
        this.setLastResult(result);
      });
  }
}
