import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  forwardRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { VdIcon } from '../vd-icon/vd-icon.component';
import { VdIconButton } from '../vd-icon-button/vd-icon-button.component';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

let vdSearchInputId = 0;

@Component({
  selector: 'vd-search-input',
  standalone: true,
  imports: [CommonModule, VdIcon, VdIconButton],
  templateUrl: './vd-search-input.component.html',
  styleUrl: './vd-search-input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => VdSearchInput),
      multi: true,
    },
  ],
})
export class VdSearchInput implements ControlValueAccessor {
  @Input() placeholder: string = 'Search';
  @Input() value: string = '';
  @Input() disabled?: boolean;

  // Custom icon inputs with defaults

  @Output() valueChange = new EventEmitter<string>(); // live input
  @Output() searchCommit = new EventEmitter<string>(); // on blur or enter

  onChange: any = () => {};
  onTouched: any = () => {};

  inputId = `vd-search-${vdSearchInputId++}`;
  isFocused = false;

  @ViewChild('inputElement', { static: true })
  inputElement!: ElementRef<HTMLInputElement>;

  // ControlValueAccessor methods
  writeValue(value: any): void {
    if (value !== undefined) {
      this.value = value;
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  focusInput() {
    if (!this.disabled) {
      this.inputElement.nativeElement.focus();
    }
  }

  onFocus() {
    this.isFocused = true;
  }

  onBlur() {
    this.isFocused = false;
    this.searchCommit.emit(this.value);
    this.onTouched();
  }

  onInput(event: Event) {
    const val = (event.target as HTMLInputElement).value;
    this.value = val;
    this.valueChange.emit(val);
    this.onChange(val);
  }

  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.searchCommit.emit(this.value);
    }
  }

  clearAction() {
    if (!this.disabled) {
      this.value = '';
      this.valueChange.emit(this.value);
      this.onChange(this.value);
      this.searchCommit.emit(this.value);
      this.focusInput();
    }
  }
}
