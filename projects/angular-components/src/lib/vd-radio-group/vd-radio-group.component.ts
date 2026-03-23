import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  forwardRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { VdRadioButton } from '../vd-radio-button/vd-radio-button.component';

export type VdRadioGroupDirection = 'vertical' | 'horizontal';

export interface VdRadioGroupItem {
  label: string;
  value: string | number;
  description?: string;
  disabled?: boolean;
}

@Component({
  selector: 'vd-radio-group',
  standalone: true,
  imports: [CommonModule, VdRadioButton],
  templateUrl: './vd-radio-group.component.html',
  styleUrls: ['./vd-radio-group.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => VdRadioGroup),
      multi: true,
    },
  ],
})
export class VdRadioGroup implements ControlValueAccessor, OnChanges {
  @Input() items: VdRadioGroupItem[] = [];
  @Input() direction: VdRadioGroupDirection = 'vertical';
  @Input() value: string | number | null = null;
  @Input() disabled = false;
  @Input() name = `vd-radio-group-${Math.random().toString(36).substring(2, 9)}`;

  @Output() valueChange = new EventEmitter<string | number>();

  private onChange: (value: string | number) => void = () => {};
  private onTouched: () => void = () => {};

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['value']) {
      this.onChange(this.value as string | number);
    }
  }

  onItemSelect(item: VdRadioGroupItem): void {
    if (this.disabled || item.disabled) {
      return;
    }

    this.value = item.value;
    this.onChange(this.value);
    this.onTouched();
    this.valueChange.emit(this.value);
  }

  isChecked(item: VdRadioGroupItem): boolean {
    return this.value === item.value;
  }

  trackByItem = (_: number, item: VdRadioGroupItem): string | number => item.value;

  writeValue(value: string | number): void {
    this.value = value;
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
