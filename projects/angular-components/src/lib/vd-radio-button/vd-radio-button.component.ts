import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
  forwardRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'vd-radio-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vd-radio-button.component.html',
  styleUrls: ['./vd-radio-button.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => VdRadioButton),
      multi: true,
    },
  ],
})
export class VdRadioButton implements ControlValueAccessor, OnInit {
  @Input() label?: string;
  @Input() description?: string;
  @Input() value: string | number = '';
  @Input() checked = false;
  @Input() disabled = false;
  @Input() id?: string;
  @Input() name?: string;
  @Input() ariaLabel?: string;

  @Output() select = new EventEmitter<string | number>();

  @ViewChild('inputRef', { static: true }) inputRef!: ElementRef<HTMLInputElement>;

  inputId = '';

  private onChange: (value: string | number) => void = () => {};
  private onTouched: () => void = () => {};

  ngOnInit(): void {
    this.inputId = this.id ?? `vd-radio-${Math.random().toString(36).substring(2, 9)}`;
  }

  onInputChange(event: Event): void {
    event.stopPropagation();

    if (this.disabled) {
      return;
    }

    this.checked = true;
    this.onChange(this.value);
    this.select.emit(this.value);
  }

  onBlur(): void {
    this.onTouched();
  }

  writeValue(value: string | number): void {
    this.checked = this.value === value;
  }

  registerOnChange(fn: (value: string | number) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
