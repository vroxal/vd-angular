import { Component, TemplateRef, ViewChild, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  VdButton,
  VdDatatable,
  VdDatatableColumn,
  VdSelect,
  VdSelectOption,
  VdSwitch,
  VdBadge,
  VdInput,
  VdToastService,
} from 'vd-angular';

import DocPageHeader from '../../../components/doc-page-header/doc-page-header.component';
import CodeContainer from '../../../components/code-container/code-container.component';

type ToastColor = 'success' | 'error' | 'warning' | 'info';
type ToastPosition =
  | 'top-right'
  | 'top-left'
  | 'bottom-right'
  | 'bottom-left'
  | 'top-center'
  | 'bottom-center';

@Component({
  selector: 'app-toast-page',
  standalone: true,
  imports: [
    VdButton,
    VdDatatable,
    VdSelect,
    VdSwitch,
    VdBadge,
    VdInput,
    FormsModule,
    CommonModule,
    DocPageHeader,
    CodeContainer,
  ],
  templateUrl: './toast.page.html',
  styleUrl: './toast.page.scss',
})
export default class ToastPage {
  constructor(private toastService: VdToastService) {
    this.toastService.configure({ placement: 'bottom-right', maxStack: 20 });
  }

  toastColor: ToastColor = 'success';
  toastPosition: ToastPosition = 'top-right';
  toastTitle = 'Success';
  toastDescription = 'Your operation was completed successfully';
  autoDismiss = true;

  @ViewChild('propertyBadge', { static: true }) propertyBadge!: TemplateRef<any>;
  @ViewChild('typeBadge', { static: true }) typeBadge!: TemplateRef<any>;

  // Code snippets
  importCodeSnippet = `import { VdToastService } from "vd-angular";`;

  basicImplementationSnippet = `<!-- Add toast container to your layout or component template -->
<vd-toast></vd-toast>`;

  componentSetupSnippet = `import { VdToastService } from 'vd-angular';

export class MyComponent {
  constructor(private toastService: VdToastService) {}
}`;

  triggerSnippet = `<!-- HTML Template - Add buttons to trigger toasts -->
<button (click)="showToast()">Show Toast</button>`;

  typeScriptTriggerSnippet = `// TypeScript Component - Methods to show different toasts
export class MyComponent {
  constructor(private toastService: VdToastService) {}

  showToast() {
    this.toastService.show({
      color: 'success',
      title: 'Success',
      description: 'Your action was completed successfully',
    });
  }
}`;

  colorStatesSnippet = `// Success toast
this.toastService.show({
  color: 'success',
  title: 'Success',
  description: 'Operation completed successfully',
});

// Error toast
this.toastService.show({
  color: 'error',
  title: 'Error',
  description: 'Something went wrong',
});

// Warning toast
this.toastService.show({
  color: 'warning',
  title: 'Warning',
  description: 'Please review your input',
});

// Info toast
this.toastService.show({
  color: 'info',
  title: 'Information',
  description: 'Here is some useful information',
});`;

  persistentToastSnippet = `// Persistent toast (does not auto-dismiss)
this.toastService.show({
  color: 'warning',
  title: 'Persistent Message',
  description: 'This toast will not auto-dismiss',
  autoDismiss: false,
});`;

  globalConfigSnippet = `// In your app initialization or component setup
import { VdToastService } from "vd-angular";

export class AppComponent implements OnInit {
  constructor(private toastService: VdToastService) {
   this.toastService.configure({
      placement: 'bottom-right',  // Position where all toasts will appear
      maxStack: 3,                 // Max 3 toasts visible at once
    });
  }

  showToast() {
    // All toasts will now appear at bottom-right
    this.toastService.show({
      color: 'success',
      description: 'This appears at bottom-right',
    });
  }
}`;

  // API Reference data
  toastInterfaceData = [
    {
      property: 'color',
      type: "'success' | 'error' | 'warning' | 'info'",
      description: 'Toast color',
      required: 'Yes',
      default: '-',
    },
    {
      property: 'title',
      type: 'string',
      description: 'Optional toast title',
      required: 'No',
      default: '—',
    },
    {
      property: 'description',
      type: 'string',
      description: 'Toast message content',
      required: 'Yes',
      default: '—',
    },
    {
      property: 'autoDismiss',
      type: 'boolean',
      description: 'Auto dismiss after 5 seconds',
      required: 'No',
      default: 'true',
    },
  ];

  configInterfaceData = [
    {
      property: 'placement',
      type: " | 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center'",
      description: 'Position where toasts will appear',
      required: 'No',
      default: 'top-right',
    },
    {
      property: 'maxStack',
      type: 'number',
      description: 'Maximum toasts visible at once',
      required: 'No',
      default: '5',
    },
  ];

  toastInterfaceColumns: VdDatatableColumn[] = [
    { key: 'property', title: 'Property' },
    { key: 'type', title: 'Type' },
    { key: 'description', title: 'Description' },
    { key: 'required', title: 'Required' },
    { key: 'default', title: 'Default' },
  ];

  serviceMethodsColumns: VdDatatableColumn[] = [
    { key: 'method', title: 'Method' },
    { key: 'description', title: 'Description' },
    { key: 'returns', title: 'Returns' },
  ];

  configColumns: VdDatatableColumn[] = [
    { key: 'property', title: 'Property' },
    { key: 'type', title: 'Type' },
    { key: 'description', title: 'Description' },
    { key: 'required', title: 'Required' },
    { key: 'default', title: 'Default' },
  ];

  toastInterfaceColumnsWithTemplate: VdDatatableColumn[] = [];
  serviceMethodsColumnsWithTemplate: VdDatatableColumn[] = [];
  configColumnsWithTemplate: VdDatatableColumn[] = [];

  colorOptions: VdSelectOption<ToastColor>[] = [
    { label: 'Success', value: 'success' },
    { label: 'Error', value: 'error' },
    { label: 'Warning', value: 'warning' },
    { label: 'Info', value: 'info' },
  ];

  positionOptions: VdSelectOption<ToastPosition>[] = [
    { label: 'Top Right', value: 'top-right' },
    { label: 'Top Left', value: 'top-left' },
    { label: 'Top Center', value: 'top-center' },
    { label: 'Bottom Right', value: 'bottom-right' },
    { label: 'Bottom Left', value: 'bottom-left' },
    { label: 'Bottom Center', value: 'bottom-center' },
  ];
  showSuccessToast() {
    this.toastService.show({
      color: 'success',
      title: 'Success',
      description: 'Your operation was completed successfully',
    });
  }
  showErrorToast() {
    this.toastService.show({
      color: 'error',
      title: 'Error',
      description: 'An error occurred while processing your request',
    });
  }
  showInfoToast() {
    this.toastService.show({
      color: 'info',
      title: 'Information',
      description: 'Here is some helpful information',
    });
  }
  showWarningToast() {
    this.toastService.show({
      color: 'warning',
      title: 'Warning',
      description: 'Please review your input before continuing',
    });
  }
  showMaxStackToast(message: string, maxStack: number) {
    this.toastService.configure({ maxStack: maxStack });
    for (let i = 1; i <= maxStack; i++) {
      setTimeout(() => {
        this.toastService.show({
          color: 'info',
          title: `Toast ${i}`,
          description: `This is toast number ${i}`,
        });
      }, i * 200); // 200ms delay between each toast
    }
  }
  showTopRight() {
    this.toastService.configure({ placement: 'top-right' });
    this.toastService.show({
      color: 'info',
      title: `Toast positioned at top-right`,
      description: `This toast is positioned at top-right`,
    });
  }
  showTopCenter() {
    this.toastService.configure({ placement: 'top-center' });
    this.toastService.show({
      color: 'info',
      title: `Toast positioned at top-center`,
      description: `This toast is positioned at top-center`,
    });
  }
  showTopLeft() {
    this.toastService.configure({ placement: 'top-left' });
    this.toastService.show({
      color: 'info',
      title: `Toast positioned at top-left`,
      description: `This toast is positioned at top-left`,
    });
  }
  showBottomRight() {
    this.toastService.configure({ placement: 'bottom-right' });
    this.toastService.show({
      color: 'info',
      title: `Toast positioned at bottom-right`,
      description: `This toast is positioned at bottom-right`,
    });
  }
  showBottomLeft() {
    this.toastService.configure({ placement: 'bottom-left' });
    this.toastService.show({
      color: 'info',
      title: `Toast positioned at bottom-left`,
      description: `This toast is positioned at bottom-left`,
    });
  }
  showBottomCenter() {
    this.toastService.configure({ placement: 'bottom-center' });
    this.toastService.show({
      color: 'info',
      title: `Toast positioned at bottom-center`,
      description: `This toast is positioned at bottom-center`,
    });
  }
  showPersistentToast() {
    this.toastService.show({
      color: 'warning',
      title: 'Persistent Message',
      description: 'This toast will not auto-dismiss',
      autoDismiss: false,
    });
  }
  showDemoToast() {
    this.toastService.configure({ placement: this.toastPosition });
    this.toastService.show({
      color: this.toastColor,
      title: this.toastTitle,
      description: this.toastDescription,
      autoDismiss: this.autoDismiss,
    });
  }

  get codeSnippet(): string {
    let code = `// First configure the position
this.toastService.configure({
  placement: '${this.toastPosition}',
});

// Then show the toast
this.toastService.show({
  color: '${this.toastColor}',
  title: '${this.toastTitle}',
  description: '${this.toastDescription}',`;

    if (this.autoDismiss !== true) {
      code += `\n  autoDismiss: ${this.autoDismiss},`;
    }

    code += `\n});`;

    return code;
  }

  ngOnInit(): void {
    this.toastInterfaceColumnsWithTemplate = this.toastInterfaceColumns.map((col) =>
      col.key === 'property' ? { ...col, template: this.propertyBadge } : col,
    );
    this.serviceMethodsColumnsWithTemplate = this.serviceMethodsColumns.map((col) =>
      col.key === 'method' ? { ...col, template: this.propertyBadge } : col,
    );
    this.configColumnsWithTemplate = this.configColumns.map((col) =>
      col.key === 'property' ? { ...col, template: this.propertyBadge } : col,
    );
  }
}
