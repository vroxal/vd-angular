import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  VdConfirmationDialogService,
  VdDatatable,
  VdDatatableColumn,
  VdSelect,
  VdSelectOption,
  VdInput,
  VdButton,
} from 'vd-angular';
import DocPageHeader from '../../../components/doc-page-header/doc-page-header.component';
import CodeContainer from '../../../components/code-container/code-container.component';
import iconsJson from '@vroxal/vd-icons/dist/vd-icon.json';

@Component({
  selector: 'app-confirmation-dialog-page',
  standalone: true,
  imports: [
    VdDatatable,
    VdSelect,
    VdInput,
    VdButton,
    CommonModule,
    FormsModule,
    DocPageHeader,
    CodeContainer,
  ],
  templateUrl: './confirmation-dialog.page.html',
  styleUrl: './confirmation-dialog.page.scss',
})
export default class ConfirmationDialogPage {
  // Playground state
  color: 'default' | 'error' = 'default';
  icon = '';
  title = 'Delete Item';
  description = 'Are you sure you want to delete this item? This action cannot be undone.';
  cancelLabel = 'Cancel';
  confirmLabel = 'Confirm';

  // Code snippets
  importCodeSnippet = `import { VdConfirmationDialogService } from 'vd-angular';`;

  basicImplementationTypescriptSnippet = `import { Component } from '@angular/core';
import { VdConfirmationDialogService } from 'vd-angular';

@Component({
  selector: 'app-delete-item',
  template: '<button (click)="openDeleteDialog()">Delete Item</button>'
})
export class DeleteItemComponent {
  constructor(private vdConfirmationDialog: VdConfirmationDialogService) {}

  openDeleteDialog(): void {
    this.vdConfirmationDialog.confirm({
      title: 'Delete Item',
      description: 'Are you sure you want to delete this item? This action cannot be undone.',
      icon: 'vd-icon-trash',
      color: 'error',
      confirmLabel: 'Delete',
      cancelLabel: 'Cancel'
    }).then(result => {
      if (result === 'confirm') {
        console.log('Item deleted');
      }
    });
  }
}`;

  basicImplementationTemplateSnippet = ``;

  primaryDialogSnippet = `this.vdConfirmationDialog.confirm({
  title: 'Save Changes',
  description: 'Do you want to save your changes before leaving?',
  color: 'default',
  icon: 'vd-icon-save',
  confirmLabel: 'Save',
  cancelLabel: 'Discard'
}).then(result => {
  if (result === 'confirm') {
    console.log('Changes saved');
  }
});`;

  errorDialogSnippet = `this.vdConfirmationDialog.confirm({
  title: 'Delete Account',
  description: 'Are you sure you want to delete your account? This action is permanent and cannot be undone.',
  color: 'error',
  icon: 'vd-icon-error-filled',
  confirmLabel: 'Delete',
  cancelLabel: 'Cancel'
}).then(result => {
  if (result === 'confirm') {
    // Delete account
  }
});`;

  withoutIconSnippet = `this.vdConfirmationDialog.confirm({
  title: 'Confirm Action',
  description: 'Please confirm that you want to proceed with this action.'
}).then(result => {
  if (result === 'confirm') {
    // Proceed with action
  }
});`;

  customLabelsSnippet = `this.vdConfirmationDialog.confirm({
  title: 'Logout Confirmation',
  description: 'Are you sure you want to logout from your account?',
  icon: 'vd-icon-logout',
  cancelLabel: 'Stay Logged In',
  confirmLabel: 'Logout'
}).then(result => {
  if (result === 'confirm') {
    // Handle logout
  }
});`;

  // API Reference data
  apiConfigData = [
    {
      property: 'title',
      type: 'string',
      required: 'Yes',
      description: 'The title text displayed in the dialog',
    },
    {
      property: 'description',
      type: 'string',
      required: 'No',
      default: "'...'",
      description: 'The description/content text displayed in the dialog',
    },
    {
      property: 'color',
      type: "'default' | 'error'",
      required: 'No',
      default: "'default'",
      description: 'Color variant of the dialog. Affects icon background and confirm button style',
    },
    {
      property: 'icon',
      type: 'string',
      required: 'No',
      default: 'undefined',
      description: 'Icon name to display in the dialog. If not provided, no icon is shown',
    },
    {
      property: 'position',
      type: "'top-center' | 'center'",
      required: 'No',
      default: "'top-center'",
      description:
        'Position of the dialog. top-center slides from top, center scales in the middle',
    },
    {
      property: 'cancelLabel',
      type: 'string',
      required: 'No',
      default: "'Cancel'",
      description: 'Label text for the cancel button',
    },
    {
      property: 'confirmLabel',
      type: 'string',
      required: 'No',
      default: "'Confirm'",
      description: 'Label text for the confirm button',
    },
  ];

  apiConfigColumns: VdDatatableColumn[] = [
    { key: 'property', title: 'Property' },
    { key: 'type', title: 'Type' },
    { key: 'required', title: 'Required' },
    { key: 'default', title: 'Default' },
    { key: 'description', title: 'Description' },
  ];

  onCancel(): void {}

  onConfirm(): void {
    alert('Confirm clicked');
  }

  colorOptions: VdSelectOption<'default' | 'error'>[] = [
    { label: 'Default', value: 'default' },
    { label: 'Error', value: 'error' },
  ];

  positionOptions: VdSelectOption<'top-center' | 'center'>[] = [
    { label: 'Top Center', value: 'top-center' },
    { label: 'Center', value: 'center' },
  ];

  // List of available icons
  icons: VdSelectOption<string>[] = [
    { label: 'None', value: '' },
    ...Object.keys(iconsJson).map((key) => ({
      label: this.toLabel(key),
      value: `vd-icon-${key}`,
    })),
  ];
  private toLabel(key: string): string {
    return key
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  get codeSnippet(): string {
    const attrs: string[] = [];

    attrs.push(`title: '${this.title}'`);

    if (this.description) {
      attrs.push(`description: '${this.description}'`);
    }

    if (this.color !== 'default') {
      attrs.push(`color: '${this.color}'`);
    }

    if (this.icon) {
      attrs.push(`icon: '${this.icon}'`);
    }

    if (this.cancelLabel !== 'Cancel') {
      attrs.push(`cancelLabel: '${this.cancelLabel}'`);
    }

    if (this.confirmLabel !== 'Confirm') {
      attrs.push(`confirmLabel: '${this.confirmLabel}'`);
    }

    const attributes = attrs.length ? '\n  ' + attrs.join(',\n  ') : '';

    return `this.vdConfirmationDialog.confirm({${attributes}
}).then(result => {
  if (result === 'confirm') {
    // Handle confirm action
  } else {
    // Handle cancel action
  }
});`;
  }

  constructor(private vdConfirmationDialog: VdConfirmationDialogService) {}

  openDialogExample(): void {
    this.vdConfirmationDialog
      .confirm({
        title: this.title,
        description: this.description,
        icon: this.icon || undefined,
        color: this.color,
        cancelLabel: this.cancelLabel,
        confirmLabel: this.confirmLabel,
      })
      .then((result) => {
        if (result === 'confirm') {
          alert('Confirmed!');
        } else if (result === 'cancel') {
        }
      });
  }
  openPrimaryExample(): void {
    this.vdConfirmationDialog
      .confirm({
        title: 'Save Changes',
        description: 'Do you want to save your changes before leaving?',
        color: 'default',
        icon: 'vd-icon-help',
        confirmLabel: 'Save',
        cancelLabel: 'Discard',
      })
      .then((result) => {
        if (result === 'confirm') {
          alert('Changes saved');
        }
      });
  }

  openErrorExample(): void {
    this.vdConfirmationDialog
      .confirm({
        title: 'Delete Account',
        description:
          'Are you sure you want to delete your account? This action is permanent and cannot be undone.',
        color: 'error',
        icon: 'vd-icon-error-filled',
        confirmLabel: 'Delete',
        cancelLabel: 'Cancel',
      })
      .then((result) => {
        if (result === 'confirm') {
          alert('Account deleted');
        }
      });
  }

  openPlainExample(): void {
    this.vdConfirmationDialog
      .confirm({
        title: 'Confirm Action',
        description: 'Please confirm that you want to proceed with this action.',
      })
      .then((result) => {
        if (result === 'confirm') {
          alert('Action confirmed');
        }
      });
  }

  openLogoutExample(): void {
    this.vdConfirmationDialog
      .confirm({
        title: 'Logout Confirmation',
        description: 'Are you sure you want to logout from your account?',
        icon: 'vd-icon-logout',
        cancelLabel: 'Stay Logged In',
        confirmLabel: 'Logout',
      })
      .then((result) => {
        if (result === 'confirm') {
          alert('Logged out successfully');
        }
      });
  }
}
