import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  VdProgressTracker,
  VdProgressTrackerItem,
  VdInput,
  VdSelect,
  VdSelectOption,
  VdSwitch,
  VdButton,
} from 'vd-angular';

@Component({
  selector: 'app-progress-tracker-usage-example',
  standalone: true,
  imports: [CommonModule, VdProgressTracker, VdInput, VdSelect, VdSwitch, VdButton],
  templateUrl: './progress-tracker-usage-example.component.html',
  styleUrl: './progress-tracker-usage-example.component.scss',
})
export default class ProgressTrackerUsageExample implements OnInit {
  private readonly usageFormKeys = [
    'email',
    'password',
    'businessName',
    'businessType',
    'idNumber',
    'acceptTerms',
  ] as const;

  private readonly usageFormDefaults = {
    email: '',
    password: '',
    businessName: '',
    businessType: null as string | null,
    idNumber: '',
    acceptTerms: false,
  };

  usageExampleActiveIndex = 0;
  usageExampleBaseItems: VdProgressTrackerItem[] = [
    {
      title: 'Account Setup',
      description: 'Create login credentials',
    },
    {
      title: 'Business Details',
      description: 'Provide business information',
    },
    {
      title: 'Identity Verification',
      description: 'Upload verification documents',
    },
    {
      title: 'Review & Submit',
      description: 'Confirm and submit application',
    },
  ];
  usageExampleItems: VdProgressTrackerItem[] = [];
  usageStepErrors: Record<number, boolean> = {};
  completedSteps: Record<number, boolean> = {};

  usageForm: {
    email: string;
    password: string;
    businessName: string;
    businessType: string | null;
    idNumber: string;
    acceptTerms: boolean;
  } = { ...this.usageFormDefaults };

  usageTouched: Record<(typeof this.usageFormKeys)[number], boolean> = {
    email: false,
    password: false,
    businessName: false,
    businessType: false,
    idNumber: false,
    acceptTerms: false,
  };

  businessTypeOptions: VdSelectOption<string>[] = [
    { label: 'Select business type', value: '' },
    { label: 'Sole Proprietorship', value: 'sole' },
    { label: 'Partnership', value: 'partnership' },
    { label: 'Private Limited', value: 'private' },
    { label: 'Other', value: 'other' },
  ];

  ngOnInit(): void {
    this.updateUsageExampleItems();
  }

  updateUsageExampleItems(): void {
    this.usageExampleItems = this.usageExampleBaseItems.map((item, index) => {
      let state: VdProgressTrackerItem['state'] = 'default';
      const isValid = this.isStepValid(index);
      const hasError = this.usageStepErrors[index] && !isValid;

      if (hasError) {
        state = 'error';
      } else if (this.completedSteps[index]) {
        state = 'completed';
      }

      if (index === this.usageExampleActiveIndex) {
        state = hasError ? 'error' : 'active';
      }

      return {
        ...item,
        state,
      };
    });
  }

  onUsageExampleClick(index: number): void {
    for (let i = 0; i <= index; i += 1) {
      this.markStepTouched(i);
      this.usageStepErrors[i] = !this.isStepValid(i);
      if (this.isStepValid(i)) {
        this.completedSteps[i] = true;
      }
    }
    this.usageExampleActiveIndex = index;
    this.updateUsageExampleItems();
  }

  onUsageExampleNext(): void {
    this.markStepTouched(this.usageExampleActiveIndex);
    if (!this.isStepValid(this.usageExampleActiveIndex)) {
      this.usageStepErrors[this.usageExampleActiveIndex] = true;
      this.updateUsageExampleItems();
      return;
    }
    this.usageStepErrors[this.usageExampleActiveIndex] = false;
    this.completedSteps[this.usageExampleActiveIndex] = true;
    if (this.usageExampleActiveIndex < this.usageExampleBaseItems.length - 1) {
      this.usageExampleActiveIndex += 1;
    }
    this.updateUsageExampleItems();
  }

  onUsageExamplePrev(): void {
    if (this.usageExampleActiveIndex > 0) {
      this.usageExampleActiveIndex -= 1;
      this.updateUsageExampleItems();
    }
  }

  onUsageFieldChange(field: keyof typeof this.usageForm, value: string | boolean | null): void {
    (this.usageForm[field] as typeof value) = value;
    this.usageTouched[field] = true;
    this.updateUsageExampleItems();
  }

  markStepTouched(stepIndex: number): void {
    if (stepIndex === 0) {
      this.usageTouched.email = true;
      this.usageTouched.password = true;
      return;
    }

    if (stepIndex === 1) {
      this.usageTouched.businessName = true;
      this.usageTouched.businessType = true;
      return;
    }

    if (stepIndex === 2) {
      this.usageTouched.idNumber = true;
      return;
    }

    if (stepIndex === 3) {
      this.usageTouched.acceptTerms = true;
    }
  }

  isStepValid(stepIndex: number): boolean {
    switch (stepIndex) {
      case 0:
        return this.isEmailValid() && this.isPasswordValid();
      case 1:
        return this.isBusinessNameValid() && this.isBusinessTypeValid();
      case 2:
        return this.isIdNumberValid();
      case 3:
        return this.isAcceptTermsValid();
      default:
        return false;
    }
  }

  isEmailValid(): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.usageForm.email.trim());
  }

  isPasswordValid(): boolean {
    return this.usageForm.password.trim().length >= 8;
  }

  isBusinessNameValid(): boolean {
    return this.usageForm.businessName.trim().length > 0;
  }

  isBusinessTypeValid(): boolean {
    return !!this.usageForm.businessType;
  }

  isIdNumberValid(): boolean {
    return this.usageForm.idNumber.trim().length >= 6;
  }

  isAcceptTermsValid(): boolean {
    return this.usageForm.acceptTerms;
  }

  getFieldState(field: keyof typeof this.usageForm): 'error' | 'success' | null {
    const isTouched = this.usageTouched[field];
    if (!isTouched) {
      return null;
    }

    switch (field) {
      case 'email':
        return this.isEmailValid() ? 'success' : 'error';
      case 'password':
        return this.isPasswordValid() ? 'success' : 'error';
      case 'businessName':
        return this.isBusinessNameValid() ? 'success' : 'error';
      case 'businessType':
        return this.isBusinessTypeValid() ? 'success' : 'error';
      case 'idNumber':
        return this.isIdNumberValid() ? 'success' : 'error';
      case 'acceptTerms':
        return this.isAcceptTermsValid() ? 'success' : 'error';
      default:
        return null;
    }
  }

  getFieldHelperText(field: keyof typeof this.usageForm): string {
    if (!this.usageTouched[field]) {
      return '';
    }

    switch (field) {
      case 'email':
        return this.isEmailValid() ? '' : 'Enter a valid email address';
      case 'password':
        return this.isPasswordValid() ? '' : 'Password must be at least 8 characters';
      case 'businessName':
        return this.isBusinessNameValid() ? '' : 'Business name is required';
      case 'businessType':
        return this.isBusinessTypeValid() ? '' : 'Select a business type';
      case 'idNumber':
        return this.isIdNumberValid() ? '' : 'ID number must be at least 6 characters';
      case 'acceptTerms':
        return this.isAcceptTermsValid() ? '' : 'Accept the terms to continue';
      default:
        return '';
    }
  }
}
