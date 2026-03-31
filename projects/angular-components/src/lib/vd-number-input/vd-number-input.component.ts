import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, Output, EventEmitter, ViewChild, ElementRef, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { VdIcon } from '../vd-icon/vd-icon.component';
import { VdIconButton } from '../vd-icon-button/vd-icon-button.component';
import { VdTooltipDirective } from '../vd-tooltip/vd-tooltip.directive';
import { getTrailingStateIcon } from '../shared/visual-state';

let vdNumberInputId = 0;

@Component({
  selector: 'vd-number-input',
  standalone: true,
  imports: [CommonModule, FormsModule, VdIcon, VdIconButton, VdTooltipDirective],
  templateUrl: './vd-number-input.component.html',
  styleUrl: './vd-number-input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => VdNumberInput),
      multi: true,
    },
  ],
})
export class VdNumberInput implements ControlValueAccessor {
  constructor(private cdr: ChangeDetectorRef) {}
  // Basic properties
  @Input() label?: string;
  @Input() hintText?: string; // ? icon tooltip content
  @Input() helperText?: string; // below-input text (validation / guidance)
  @Input() optional?: boolean;

  @Input() leadingIcon?: string;
  @Input() trailingActionIcon?: string;
  @Input() trailingActionAriaLabel: string = 'Action';

  @Input() placeholder: string = '';
  @Input() value: number | null = null;

  @Input() min?: number;
  @Input() max?: number;
  @Input() step?: number | 'any';

  @Input() readOnly?: boolean;
  @Input() disabled?: boolean;

  // State
  @Input() state: 'success' | 'error' | 'warning' | null = null;

  // Outputs
  @Output() valueChange = new EventEmitter<number | null>(); // live input
  @Output() valueCommit = new EventEmitter<number | null>(); // on blur
  @Output() trailingActionClick = new EventEmitter<void>();
  @Output() inputFocus = new EventEmitter<void>(); // optional focus event

  private onChange: (value: number | null) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: number | null): void {
    if (value !== undefined) {
      this.value = value;
      this.cdr.markForCheck();
    }
  }

  registerOnChange(fn: (value: number | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
    this.cdr.markForCheck();
  }

  // Internal
  inputId = `vd-number-input-${vdNumberInputId++}`;
  showHint = false;
  isFocused = false;

  // Focus / blur handling
  onFocus() {
    this.isFocused = true;
    this.inputFocus.emit();
  }
  @ViewChild('inputElement', { static: true })
  inputElement!: ElementRef<HTMLInputElement>;

  focusInput() {
    if (!this.disabled) {
      this.inputElement.nativeElement.focus();
    }
  }
  onBlur() {
    this.isFocused = false;

    // enforce min and max on blur
    if (this.value !== null) {
      let clamped = this.value;
      if (this.min !== undefined && clamped < this.min) {
        clamped = this.min;
      }
      if (this.max !== undefined && clamped > this.max) {
        clamped = this.max;
      }
      if (clamped !== this.value) {
        this.value = clamped;
        if (this.inputElement?.nativeElement) {
          this.inputElement.nativeElement.value = String(clamped);
        }
        this.valueChange.emit(this.value);
      }
    }

    this.onTouched();
    this.valueCommit.emit(this.value); // emit value on blur
  }

  // Input handler
  onInput(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const rawValue = inputElement.value;

    // We emit null if empty, otherwise parsed number
    const numVal: number | null = rawValue === '' ? null : Number(rawValue);

    this.value = numVal;
    this.valueChange.emit(this.value); // emit live value
    this.onChange(this.value);
  }

  // Trailing action
  onTrailingActionClick(): void {
    this.trailingActionClick.emit();
  }

  toggleHint() {
    this.showHint = !this.showHint;
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
