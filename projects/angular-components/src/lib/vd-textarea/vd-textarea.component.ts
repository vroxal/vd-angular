import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, Output, EventEmitter, ViewChild, ElementRef, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { VdIcon } from '../vd-icon/vd-icon.component';
import { VdIconButton } from '../vd-icon-button/vd-icon-button.component';
import { VdTooltipDirective } from '../vd-tooltip/vd-tooltip.directive';
import { getTrailingStateIcon } from '../shared/visual-state';

let vdTextareaId = 0;

@Component({
  selector: 'vd-textarea',
  standalone: true,
  imports: [CommonModule, VdIcon, VdIconButton, VdTooltipDirective],
  templateUrl: './vd-textarea.component.html',
  styleUrl: './vd-textarea.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => VdTextarea),
      multi: true,
    },
  ],
})
export class VdTextarea implements ControlValueAccessor {
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

  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: string): void {
    if (value !== undefined) {
      this.value = value;
      this.cdr.markForCheck();
    }
  }

  registerOnChange(fn: (value: string) => void): void {
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
  inputId = `vd-textarea-${vdTextareaId++}`;
  showHint = false;
  isFocused = false;

  // Focus / blur handling
  onFocus() {
    this.isFocused = true;
    this.inputFocus.emit();
  }

  onBlur() {
    this.isFocused = false;
    this.onTouched();
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
    let val = (event.target as HTMLTextAreaElement).value;

    // enforce max input count
    if (this.maxInputCount) {
      val = val.slice(0, this.maxInputCount);
    }
    this.value = val;
    this.valueChange.emit(val); // emit live value
    this.onChange(val);
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
