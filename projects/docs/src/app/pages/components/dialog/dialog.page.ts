import { ChangeDetectorRef, Component, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  VdAlert,
  VdButton,
  VdDatatable,
  VdDatatableColumn,
  VdDialogService,
  VdInput,
  VdSwitch,
  VdTextarea,
} from 'vd-angular';
import DocPageHeader from '../../../components/doc-page-header/doc-page-header.component';
import CodeContainer from '../../../components/code-container/code-container.component';

interface PlaygroundContentData {
  name: string;
  details: string;
}

interface SlotContextData {
  summary: {
    title: string;
    description: string;
    alertTitle: string;
    alertDescription: string;
  };
}

@Component({
  selector: 'app-dialog-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    VdAlert,
    VdButton,
    VdDatatable,
    VdInput,
    VdSwitch,
    VdTextarea,
    DocPageHeader,
    CodeContainer,
  ],
  templateUrl: './dialog.page.html',
  styleUrl: './dialog.page.scss',
})
export default class DialogPage {
  title = 'Title';
  showPrimaryAction = true;
  showSecondaryAction = true;
  primaryActionLabel = 'Confirm';
  secondaryActionLabel = 'Cancel';
  lastResult = '';

  slotContentData: PlaygroundContentData = {
    name: '',
    details: '',
  };

  importCodeSnippet = `import { VdDialogService } from 'vd-angular';`;

  basicImplementationTemplateSnippet = `<ng-template #dialogContent>
  <vd-input label="Name" placeholder="Enter name"></vd-input>
  <vd-textarea label="Details" placeholder="Enter details"></vd-textarea>
</ng-template>

<vd-button label="Open dialog" (click)="openDialog(dialogContent)"></vd-button>`;

  basicImplementationTypescriptSnippet = `import { Component, TemplateRef } from '@angular/core';
import { VdDialogService } from 'vd-angular';

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html'
})
export class ExampleComponent {
  constructor(private vdDialog: VdDialogService) {}

  openDialog(template: TemplateRef<unknown>): void {
    this.vdDialog.open({
      title: 'Title',
      contentTemplate: template,
      primaryActionLabel: 'Confirm',
      secondaryActionLabel: 'Cancel'
    }).then(result => {
      if (result === 'primary') {
        // Primary action
      } else if (result === 'secondary') {
        // Secondary action
      } else {
        // Closed from close icon, backdrop, or Escape
      }
    });
  }
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

this.vdDialog.open({
  title: 'Context Slot Example',
  contentTemplate: summaryContent,
  context: {
    summary: {
      title: 'Pending review',
      description: 'Rendered from template context.',
      alertTitle: '2 transactions pending',
      alertDescription: 'Review flagged records before continuing.'
    }
  },
  primaryActionLabel: 'Approve',
  secondaryActionLabel: 'Back'
});`;

  noActionsSnippet = `this.vdDialog.open({
  title: 'Read-only Details',
  contentTemplate: template
});`;

  outputHandlingSnippet = `this.vdDialog.open({
  title: 'Confirm changes',
  contentTemplate: template,
  primaryActionLabel: 'Confirm',
  secondaryActionLabel: 'Cancel'
}).then(result => {
  switch (result) {
    case 'primary':
      // Primary action button click
      break;
    case 'secondary':
      // Secondary action button click
      break;
    default:
      // Close icon, Escape key, or backdrop click
      break;
  }
});`;

  longContentSnippet = `<ng-template #longFormDialogContent>
  <vd-input label="Business Name" placeholder="Enter business name"></vd-input>
  <vd-input label="Registration Number" placeholder="Enter registration number"></vd-input>
  <vd-input label="Primary Contact" placeholder="Enter contact name"></vd-input>
  <vd-input label="Contact Email" placeholder="Enter contact email"></vd-input>
  <vd-input label="Contact Phone" placeholder="Enter contact phone"></vd-input>
  <vd-input label="Address Line 1" placeholder="Enter address line 1"></vd-input>
  <vd-input label="Address Line 2" placeholder="Enter address line 2"></vd-input>
  <vd-input label="City" placeholder="Enter city"></vd-input>
  <vd-input label="Province/State" placeholder="Enter province/state"></vd-input>
  <vd-input label="Country" placeholder="Enter country"></vd-input>
  <vd-textarea label="Business Description" placeholder="Enter description"></vd-textarea>
  <vd-textarea label="Compliance Notes" placeholder="Add compliance notes"></vd-textarea>
  <vd-textarea label="Reviewer Remarks" placeholder="Add reviewer remarks"></vd-textarea>
</ng-template>

this.vdDialog.open({
  title: 'Merchant Onboarding Form',
  contentTemplate: longFormDialogContent,
  primaryActionLabel: 'Submit',
  secondaryActionLabel: 'Cancel'
});`;

  apiConfigData = [
    {
      property: 'title',
      type: 'string',
      required: 'Yes',
      description: 'Title text displayed in the dialog header',
    },
    {
      property: 'contentTemplate',
      type: 'TemplateRef',
      required: 'Yes',
      description: 'Template rendered in the dialog content area',
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
      description: "Returned when the primary button is clicked. Result value is always 'primary'.",
    },
    {
      result: 'secondary',
      trigger: 'Secondary action button click',
      description:
        "Returned when the secondary button is clicked. Result value is always 'secondary'.",
    },
    {
      result: 'close',
      trigger: 'Close icon, Escape key, or backdrop click',
      description: 'Returned when the dialog is dismissed without action button clicks.',
    },
  ];

  outputColumns: VdDatatableColumn[] = [
    { key: 'result', title: 'Result' },
    { key: 'trigger', title: 'Trigger' },
    { key: 'description', title: 'Description' },
  ];

  slotContext: SlotContextData = {
    summary: {
      title: 'Pending Review',
      description: 'Rendered from template context.',
      alertTitle: '2 items require approval',
      alertDescription: 'Review flagged transactions before confirming.',
    },
  };

  constructor(
    private vdDialog: VdDialogService,
    private cdr: ChangeDetectorRef,
  ) {}

  get codeSnippet(): string {
    const attrs: string[] = [];

    attrs.push(`title: '${this.title || 'Title'}'`);
    attrs.push('contentTemplate: dialogTemplate');

    if (this.showPrimaryAction && this.primaryActionLabel) {
      attrs.push(`primaryActionLabel: '${this.primaryActionLabel}'`);
    }

    if (this.showSecondaryAction && this.secondaryActionLabel) {
      attrs.push(`secondaryActionLabel: '${this.secondaryActionLabel}'`);
    }

    return `this.vdDialog.open({
  ${attrs.join(',\n  ')}
}).then(result => {
  if (result === 'primary') {
    // Handle primary action
  }
});`;
  }

  openDefaultExample(template: TemplateRef<unknown>): void {
    this.vdDialog
      .open({
        title: 'Profile Details',
        contentTemplate: template,
        primaryActionLabel: 'Confirm',
        secondaryActionLabel: 'Cancel',
      })
      .then((result) => {
        this.setLastResult(result);
      });
  }

  openNoActionsExample(template: TemplateRef<unknown>): void {
    this.vdDialog
      .open({
        title: 'Read-only Summary',
        contentTemplate: template,
      })
      .then((result) => {
        this.setLastResult(result);
      });
  }

  openContextExample(template: TemplateRef<unknown>): void {
    this.vdDialog
      .open({
        title: 'Context Slot Example',
        contentTemplate: template,
        context: this.slotContext,
        primaryActionLabel: 'Approve',
        secondaryActionLabel: 'Back',
      })
      .then((result) => {
        this.setLastResult(result);
      });
  }

  openLongContentExample(template: TemplateRef<unknown>): void {
    this.vdDialog
      .open({
        title: 'Merchant Onboarding Form',
        contentTemplate: template,
        primaryActionLabel: 'Submit',
        secondaryActionLabel: 'Cancel',
      })
      .then((result) => {
        this.setLastResult(result);
      });
  }

  openPlayground(template: TemplateRef<unknown>): void {
    this.vdDialog
      .open({
        title: this.title || 'Title',
        contentTemplate: template,
        primaryActionLabel: this.showPrimaryAction ? this.primaryActionLabel : undefined,
        secondaryActionLabel: this.showSecondaryAction ? this.secondaryActionLabel : undefined,
      })
      .then((result) => {
        this.setLastResult(result);
      });
  }

  private setLastResult(result: string): void {
    setTimeout(() => {
      this.lastResult = `Last action: ${result}`;
      this.cdr.detectChanges();
    }, 0);
  }
}
