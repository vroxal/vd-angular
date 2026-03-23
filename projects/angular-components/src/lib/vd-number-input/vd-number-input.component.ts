import { Component, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { VdIcon } from '../vd-icon/vd-icon.component';
import { VdIconButton } from '../vd-icon-button/vd-icon-button.component';
import { VdTooltipDirective } from '../vd-tooltip/vd-tooltip.directive';

@Component({
  selector: 'vd-number-input',
  standalone: true,
  imports: [CommonModule, FormsModule, VdIcon, VdIconButton, VdTooltipDirective],
  templateUrl: './vd-number-input.component.html',
  styleUrls: ['./vd-number-input.component.scss'],
})
export class VdNumberInput {
  // Basic properties
  @Input() label?: string;
  @Input() hintText?: string; // ? icon tooltip content
  @Input() helperText?: string; // below-input text (validation / guidance)
  @Input() optional?: boolean;

  @Input() leadingIcon?: string;
  @Input() trailingActionIcon?: string;

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

  // Internal
  inputId = 'vd-number-input-' + Math.random().toString(36).substring(2, 9);
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

    this.valueCommit.emit(this.value); // emit value on blur
  }

  // Input handler
  onInput(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const rawValue = inputElement.value;

    // We emit null if empty, otherwise parsed number
    let numVal: number | null = rawValue === '' ? null : Number(rawValue);

    // Enforce max immediately on input
    if (numVal !== null && this.max !== undefined && numVal > this.max) {
      numVal = this.max;
      inputElement.value = String(numVal);
    }

    this.value = numVal;
    this.valueChange.emit(this.value); // emit live value
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
