import {
  Component,
  EventEmitter,
  Input,
  Output,
  forwardRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import {
  VdSelectionCardItem,
  VdSelectionCardType,
} from './vd-selection-card-item/vd-selection-card-item.component';

export type VdSelectionCardDirection = 'vertical' | 'horizontal';

export interface VdSelectionCard {
  title: string;
  value: string | number;
  description?: string;
  icon?: string;
  disabled?: boolean;
}

let vdSelectionCardGroupId = 0;

@Component({
  selector: 'vd-selection-card-group',
  standalone: true,
  imports: [CommonModule, VdSelectionCardItem],
  templateUrl: './vd-selection-card.component.html',
  styleUrl: './vd-selection-card.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => VdSelectionCardGroup),
      multi: true,
    },
  ],
})
export class VdSelectionCardGroup implements ControlValueAccessor {
  @Input() items: VdSelectionCard[] = [];
  @Input() type: VdSelectionCardType = 'radio';
  @Input() direction: VdSelectionCardDirection = 'vertical';
  @Input() disabled = false;
  @Input() name = `vd-selection-card-group-${vdSelectionCardGroupId++}`;
  @Input() columns = 1;

  /** For radio mode: single value. For checkbox mode: array of values. */
  @Input() value: string | number | Array<string | number> | null = null;

  @Output() valueChange = new EventEmitter<string | number | Array<string | number>>();

  private onChange: (value: string | number | Array<string | number>) => void = () => {};
  private onTouched: () => void = () => {};

  onItemSelect(item: VdSelectionCard): void {
    if (this.disabled || item.disabled) {
      return;
    }

    if (this.type === 'radio') {
      this.value = item.value;
      this.onChange(this.value);
      this.onTouched();
      this.valueChange.emit(this.value);
    } else {
      // checkbox mode
      const currentValues = Array.isArray(this.value) ? [...this.value] : [];
      const index = currentValues.indexOf(item.value);
      if (index > -1) {
        currentValues.splice(index, 1);
      } else {
        currentValues.push(item.value);
      }
      this.value = currentValues;
      this.onChange(this.value);
      this.onTouched();
      this.valueChange.emit(this.value);
    }
  }

  isChecked(item: VdSelectionCard): boolean {
    if (this.type === 'radio') {
      return this.value === item.value;
    }
    return Array.isArray(this.value) && this.value.includes(item.value);
  }

  trackByItem = (_: number, item: VdSelectionCard): string | number => item.value;

  writeValue(value: string | number | Array<string | number>): void {
    this.value = value;
  }

  registerOnChange(fn: (value: string | number | Array<string | number>) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
