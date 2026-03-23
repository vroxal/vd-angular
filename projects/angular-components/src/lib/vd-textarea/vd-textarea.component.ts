import { Component, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VdIcon } from '../vd-icon/vd-icon.component';
import { VdIconButton } from '../vd-icon-button/vd-icon-button.component';
import { VdTooltipDirective } from '../vd-tooltip/vd-tooltip.directive';

@Component({
  selector: 'vd-textarea',
  standalone: true,
  imports: [CommonModule, VdIcon, VdIconButton, VdTooltipDirective],
  templateUrl: './vd-textarea.component.html',
  styleUrls: ['./vd-textarea.component.scss'],
})
export class VdTextarea {
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
  inputId = 'vd-textarea-' + Math.random().toString(36).substring(2, 9);
  showHint = false;
  isFocused = false;

  // Focus / blur handling
  onFocus() {
    this.isFocused = true;
    this.inputFocus.emit();
  }

  onBlur() {
    this.isFocused = false;
    this.valueCommit.emit(this.value); // emit value on blur
  }
  @ViewChild('inputElement', { static: true })
  textareaElement!: ElementRef<HTMLTextAreaElement>;

  focusInput() {
    if (!this.disabled) {
      this.textareaElement.nativeElement.focus();
    }
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
