import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, Output, EventEmitter, ViewChild, ElementRef, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { VdIcon } from '../vd-icon/vd-icon.component';
import { VdTooltipDirective } from '../vd-tooltip/vd-tooltip.directive';
import { getTrailingStateIcon } from '../shared/visual-state';

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
  changeDetection: ChangeDetectionStrategy.OnPush,
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

  private _onChange: (value: T | null) => void = () => {};
  private _onTouched: () => void = () => {};

  constructor(private cdr: ChangeDetectorRef) {}

  writeValue(value: T | null): void {
    if (value !== undefined) {
      this.value = value;
      this.cdr.markForCheck();
    }
  }

  registerOnChange(fn: (value: T | null) => void): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this._onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
    this.cdr.markForCheck();
  }

  /** Returns the index of the currently selected option, or -1 if none. */
  get selectedOptionIndex(): number {
    if (this.value === null || this.value === undefined) return -1;
    return this.options.findIndex((o) => o.value === this.value);
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
  // Input handler — option DOM values are stored as their index in the options array
  onChange(event: Event) {
    const raw = (event.target as HTMLSelectElement).value;
    const idx = parseInt(raw, 10);
    const val: T | null = !isNaN(idx) && this.options[idx] !== undefined ? this.options[idx].value : null;

    this.value = val;
    this.valueChange.emit(val);
    this._onChange(val);
  }

  // Computed visual state (removes error while focused)
  get visualState(): 'success' | 'error' | 'warning' | null {
    if (this.state === 'error' && this.isFocused) return null;
    return this.state;
  }

  get trailingStateIcon(): string | null {
    return getTrailingStateIcon(this.visualState);
  }
}
