import { Component, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VdInput } from '../../vd-input/vd-input.component';

@Component({
  selector: 'vd-time-picker',
  standalone: true,
  imports: [CommonModule, VdInput],
  templateUrl: './vd-time-picker.component.html',
  styleUrl: './vd-time-picker.component.scss',
})
export class VdTimePicker {
  // Basic properties
  @Input() label?: string;
  @Input() hintText?: string; // ? icon tooltip content
  @Input() helperText?: string; // below-input text (validation / guidance)
  @Input() optional?: boolean;

  @Input() leadingIcon?: string;
  @Input() trailingActionIcon?: string;

  @Input() placeholder: string = '';
  @Input() type: 'text' | 'password' = 'text';
  @Input() value: string = '';
  @Input() maxInputCount?: number;

  @Input() disabled?: boolean;

  // State
  @Input() state: 'success' | 'error' | 'warning' | null = null;

  // Outputs
  @Output() valueChange = new EventEmitter<string>(); // live input
  @Output() valueCommit = new EventEmitter<string>(); // on blur
  @Output() trailingActionClick = new EventEmitter<void>();
  @Output() inputFocus = new EventEmitter<void>(); // optional focus event

  // Internal
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

  openTimePicker() {
    if (!this.disabled) {
      this.inputElement.nativeElement.focus();
      this.inputElement.nativeElement.showPicker();
    }
  }

  onBlur() {
    this.isFocused = false;
    this.valueCommit.emit(this.value); // emit value on blur
  }

  // Input handler
  onInput(event: Event) {
    let val = (event.target as HTMLInputElement).value;

    // enforce max input count
    if (this.maxInputCount) {
      val = val.slice(0, this.maxInputCount);
    }
    this.value = val;
    this.valueChange.emit(val); // emit live value
  }

  // Trailing action
  onTrailingActionClick(): void {
    this.trailingActionClick.emit();
    this.openTimePicker();
  }

  onInputFocus() {
    this.onFocus();
    this.openTimePicker();
  }

  onInputBlur() {
    this.onBlur();
  }

  toggleHint() {
    this.showHint = !this.showHint;
  }

  // Computed visual state (removes error while focused)
  get visualState(): 'success' | 'error' | 'warning' | null {
    if (this.state === 'error' && this.isFocused) return null;
    return this.state;
  }
}
