import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'vd-switch',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vd-switch.component.html',
  styleUrls: ['./vd-switch.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => VdSwitch),
      multi: true,
    },
  ],
})
export class VdSwitch implements ControlValueAccessor {
  /** Optional label to display above the switch */
  @Input() label?: string;

  /** Whether the switch is active/enabled */
  @Input() checked: boolean = false;

  /** Whether the switch is disabled */
  @Input() disabled: boolean = false;

  /** Emitted when the switch state changes */
  @Output() change = new EventEmitter<boolean>();

  private onChange: (value: boolean) => void = () => {};
  private onTouched: () => void = () => {};

  /**
   * Toggle the switch state
   */
  toggle(): void {
    if (!this.disabled) {
      this.checked = !this.checked;
      this.onChange(this.checked);
      this.change.emit(this.checked);
    }
  }

  /**
   * ControlValueAccessor implementation
   */
  writeValue(value: boolean): void {
    this.checked = value;
  }

  registerOnChange(fn: (value: boolean) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  /**
   * Handle keyboard events (Space to toggle)
   */
  onKeyDown(event: KeyboardEvent): void {
    if (event.code === 'Space') {
      event.preventDefault();
      this.toggle();
    }
  }

  /**
   * Track blur event for ControlValueAccessor
   */
  onBlur(): void {
    this.onTouched();
  }
}
