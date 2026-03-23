import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';

let verificationCodeInputId = 0;

@Component({
  selector: 'vd-verification-code-input',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vd-verification-code-input.component.html',
  styleUrls: ['./vd-verification-code-input.component.scss'],
})
export class VdVerificationCodeInput implements AfterViewInit {
  /** Number of code input cells */
  @Input() length: 4 | 6 = 6;

  /** Current value (string of digits) */
  @Input() value: string = '';

  /** Whether the input is disabled */
  @Input() disabled: boolean = false;

  /** Error state */
  @Input() state: 'error' | null = null;

  /** Label text displayed above the input */
  @Input() label?: string;

  /** Helper text displayed below the input */
  @Input() helperText?: string;

  /** Whether to auto-focus the first cell on init */
  @Input() autoFocus: boolean = false;

  /** Whether to mask the entered digits */
  @Input() mask: boolean = false;

  /** Emitted on every value change */
  @Output() valueChange = new EventEmitter<string>();

  /** Emitted when all cells are filled */
  @Output() completed = new EventEmitter<string>();

  @ViewChild('codeInput') hiddenInput!: ElementRef<HTMLInputElement>;

  /** Tracks if input is focused */
  focused: boolean = false;

  /** Caret index for visual focus */
  caretIndex: number = 0;

  /** Unique id for input + helper text */
  inputId = `vd-verification-code-input-${verificationCodeInputId++}`;
  helperTextId = `${this.inputId}-helper`;

  /** Array representing the number of cells */
  get cells() {
    return Array.from({ length: this.length });
  }

  ngAfterViewInit(): void {
    if (this.autoFocus && !this.disabled) {
      setTimeout(() => this.focusInput());
    }
  }

  // focusInput(): void {
  //   if (this.disabled) return;
  //   this.hiddenInput.nativeElement.focus();
  //   this.setCaret(this.value.length);
  // }
  focusInput(): void {
    if (this.disabled) return;
    const index = Math.min(this.value.length, this.length - 1); // <-- cap to last cell
    this.setCaret(index);
    this.hiddenInput.nativeElement.focus();
  }

  onFocus(): void {
    this.focused = true;
    const index = Math.min(this.value.length, this.length - 1);
    this.setCaret(index);
  }

  onBlur(): void {
    this.focused = false;
  }

  private setCaret(index: number) {
    this.caretIndex = index;
    const input = this.hiddenInput.nativeElement;
    input.setSelectionRange(index, index);
  }

  onKeyDown(event: KeyboardEvent): void {
    const allowed = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab', 'Home', 'End'];
    if (
      allowed.includes(event.key) ||
      ((event.ctrlKey || event.metaKey) && ['a', 'c', 'v', 'x'].includes(event.key))
    ) {
      return;
    }
    if (!/^[0-9]$/.test(event.key)) {
      event.preventDefault();
    }
  }

  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    let val = input.value.replace(/[^0-9]/g, '').slice(0, this.length);
    this.value = val;
    input.value = val;
    this.valueChange.emit(val);
    this.setCaret(val.length);

    if (val.length === this.length) {
      this.completed.emit(val);
    }
  }
}
