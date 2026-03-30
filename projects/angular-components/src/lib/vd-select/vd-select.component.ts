import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { VdIcon } from '../vd-icon/vd-icon.component';
import { VdTooltipDirective } from '../vd-tooltip/vd-tooltip.directive';

export interface VdSelectOption<T = any> {
  label: string;
  value: T;
  disabled?: boolean;
}

let vdSelectId = 0;

@Component({
  selector: 'vd-select',
  standalone: true,
  imports: [CommonModule, VdIcon, VdTooltipDirective],
  templateUrl: './vd-select.component.html',
  styleUrl: './vd-select.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => VdSelect),
      multi: true,
    },
  ],
})
export class VdSelect<T = any> implements ControlValueAccessor {
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

  _onChange: any = () => {};
  _onTouched: any = () => {};

  writeValue(value: any): void {
    if (value !== undefined) {
      this.value = value;
    }
  }

  registerOnChange(fn: any): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this._onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  // Internal
  selectId = `vd-select-${vdSelectId++}`;
  isFocused = false;

  // Focus / blur handling
  onFocus() {
    this.isFocused = true;
    this.inputFocus.emit();
  }

  onBlur() {
    this.isFocused = false;
    this._onTouched();
    this.valueCommit.emit(this.value);
  }

  @ViewChild('selectElement', { static: true })
  selectElement!: ElementRef<HTMLSelectElement>;

  focusSelect() {
    if (!this.disabled) {
      const el = this.selectElement.nativeElement as HTMLSelectElement & { showPicker?: () => void };
      if (el.showPicker) {
        try {
          el.showPicker();
        } catch (error) {
          // Fallback if showPicker fails (e.g. not user activation)
          el.focus();
        }
      } else {
        el.focus();
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
    this._onChange(val);
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
