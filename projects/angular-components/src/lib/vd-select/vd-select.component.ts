import { Component, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VdIcon } from '../vd-icon/vd-icon.component';
import { VdTooltipDirective } from '../vd-tooltip/vd-tooltip.directive';

export interface VdSelectOption<T = any> {
  label: string;
  value: T;
  disabled?: boolean;
}

@Component({
  selector: 'vd-select',
  standalone: true,
  imports: [CommonModule, VdIcon, VdTooltipDirective],
  templateUrl: './vd-select.component.html',
  styleUrls: ['./vd-select.component.scss'],
})
export class VdSelect<T = any> {
  // Basic properties
  @Input() label?: string;
  @Input() hintText?: string; // ? icon tooltip content
  @Input() helperText?: string; // below-input text (validation / guidance)
  @Input() optional?: boolean;

  @Input() leadingIcon?: string;

  @Input() placeholder: string = '';

  @Input() disabled?: boolean;

  @Input() options: VdSelectOption<T>[] = [];
  @Input() value: T | null = null;

  // State
  @Input() state: 'success' | 'error' | 'warning' | null = null;

  // Outputs
  @Output() valueChange = new EventEmitter<T | null>(); // live input
  @Output() valueCommit = new EventEmitter<T | null>(); // on blur
  @Output() inputFocus = new EventEmitter<void>(); // optional focus event

  // Internal
  selectId = 'vd-select-' + Math.random().toString(36).substring(2, 9);
  isFocused = false;

  // Focus / blur handling
  onFocus() {
    this.isFocused = true;
    this.inputFocus.emit();
  }

  onBlur() {
    this.isFocused = false;
    this.valueCommit.emit(this.value);
  }

  @ViewChild('selectElement', { static: true })
  selectElement!: ElementRef<HTMLSelectElement>;

  focusSelect() {
    if (!this.disabled) {
      if ('showPicker' in (this.selectElement.nativeElement as any)) {
        try {
          (this.selectElement.nativeElement as any).showPicker();
        } catch (error) {
          // Fallback if showPicker fails (e.g. not user activation)
          this.selectElement.nativeElement.focus();
        }
      } else {
        this.selectElement.nativeElement.focus();
      }
    }
  }
  // Input handler
  onChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    const selectedValue = target.value;

    // Map back to option type if not string
    const matched = this.options.find((o) => String(o.value) === selectedValue);
    const val: T | null = matched ? matched.value : null;

    this.value = val;
    this.valueChange.emit(val);
  }

  // Computed visual state (removes error while focused)
  get visualState(): 'success' | 'error' | 'warning' | null {
    if (this.state === 'error' && this.isFocused) return null;
    return this.state;
  }

  // Trailing state icon
  get trailingStateIcon(): string | null {
    switch (this.visualState) {
      case 'success':
        return 'vd-icon-tick-circle-filled';
      case 'error':
        return 'vd-icon-error-filled';
      case 'warning':
        return 'vd-icon-warning-filled';
      default:
        return null;
    }
  }
}
