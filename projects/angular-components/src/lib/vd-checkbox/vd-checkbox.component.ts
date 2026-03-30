import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
  forwardRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { VdIcon } from '../vd-icon/vd-icon.component';

let vdCheckboxId = 0;

@Component({
  selector: 'vd-checkbox',
  standalone: true,
  imports: [CommonModule, VdIcon],
  templateUrl: './vd-checkbox.component.html',
  styleUrl: './vd-checkbox.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => VdCheckbox),
      multi: true,
    },
  ],
})
export class VdCheckbox implements ControlValueAccessor, OnInit, OnChanges {
  @Input() label?: string;
  @Input() description?: string;
  @Input() checked = false;
  @Input() indeterminate = false;
  @Input() disabled = false;
  @Input() id?: string;
  @Input() name?: string;
  @Input() ariaLabel?: string;

  @Output() change = new EventEmitter<boolean>();

  @ViewChild('inputRef', { static: true }) inputRef!: ElementRef<HTMLInputElement>;

  inputId = '';

  private onChange: (value: boolean) => void = () => {};
  private onTouched: () => void = () => {};

  ngOnInit(): void {
    this.inputId = this.id ?? `vd-checkbox-${vdCheckboxId++}`;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.inputRef) {
      const input = this.inputRef.nativeElement;
      if (changes['checked']) {
        input.checked = this.checked;
      }
      if (changes['indeterminate']) {
        input.indeterminate = this.indeterminate;
      }
    }
  }

  onInputChange(event: Event): void {
    event.stopPropagation();

    if (this.disabled) {
      return;
    }

    const input = event.target as HTMLInputElement;

    if (this.indeterminate) {
      this.indeterminate = false;
      this.checked = true;
      input.checked = true;
      input.indeterminate = false;
    } else {
      this.checked = input.checked;
    }

    this.onChange(this.checked);
    this.change.emit(this.checked);
  }

  onBlur(): void {
    this.onTouched();
  }

  writeValue(value: boolean): void {
    this.checked = !!value;
    if (this.checked) {
      this.indeterminate = false;
    }
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
}
