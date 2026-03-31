import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
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

let vdRadioButtonId = 0;

@Component({
  selector: 'vd-radio-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vd-radio-button.component.html',
  styleUrl: './vd-radio-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => VdRadioButton),
      multi: true,
    },
  ],
})
export class VdRadioButton implements ControlValueAccessor, OnInit, OnChanges {
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

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    if (!this.inputId) {
      this.inputId = this.id ?? `vd-radio-${vdRadioButtonId++}`;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['id'] && !changes['id'].firstChange) {
      this.inputId = this.id ?? this.inputId;
      this.cdr.markForCheck();
    }
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
    this.cdr.markForCheck();
  }

  registerOnChange(fn: (value: string | number) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
    this.cdr.markForCheck();
  }
}
