import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VdCheckbox } from '../vd-checkbox/vd-checkbox.component';

export type VdCheckboxGroupDirection = 'vertical' | 'horizontal';

export interface VdCheckboxGroupItem {
  label: string;
  value?: string | number;
  description?: string;
  disabled?: boolean;
  children?: VdCheckboxGroupItem[];
}

@Component({
  selector: 'vd-checkbox-group',
  standalone: true,
  imports: [CommonModule, VdCheckbox],
  templateUrl: './vd-checkbox-group.component.html',
  styleUrl: './vd-checkbox-group.component.scss',
})
export class VdCheckboxGroup implements OnChanges {
  @Input() items: VdCheckboxGroupItem[] = [];
  @Input() direction: VdCheckboxGroupDirection = 'vertical';
  @Input() value: Array<string | number> = [];
  @Input() disabled = false;

  @Output() valueChange = new EventEmitter<Array<string | number>>();

  private selectedValues = new Set<string | number>();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['value'] || changes['items']) {
      this.syncSelectedValues();
    }
  }

  onItemChange(item: VdCheckboxGroupItem, checked: boolean): void {
    const targetValues = this.getSelectableValues(item);

    if (!targetValues.length) {
      return;
    }

    if (checked) {
      targetValues.forEach((value) => this.selectedValues.add(value));
    } else {
      targetValues.forEach((value) => this.selectedValues.delete(value));
    }

    this.emitValueChange();
  }

  isChecked(item: VdCheckboxGroupItem): boolean {
    const values = this.getSelectableValues(item);
    if (!values.length) {
      return item.value !== undefined ? this.selectedValues.has(item.value) : false;
    }

    return values.every((value) => this.selectedValues.has(value));
  }

  isIndeterminate(item: VdCheckboxGroupItem): boolean {
    const values = this.getSelectableValues(item);
    if (!values.length) {
      return false;
    }

    const selectedCount = values.filter((value) => this.selectedValues.has(value)).length;
    return selectedCount > 0 && selectedCount < values.length;
  }

  trackByItem = (_: number, item: VdCheckboxGroupItem): string | number =>
    item.value ?? item.label;

  private emitValueChange(): void {
    const orderedValues = this.getAllLeafValues(this.items).filter((value) =>
      this.selectedValues.has(value),
    );

    this.value = orderedValues;
    this.valueChange.emit([...orderedValues]);
  }

  private syncSelectedValues(): void {
    this.selectedValues = new Set(this.value ?? []);
    this.applyParentSelection(this.items);
  }

  private getSelectableValues(item: VdCheckboxGroupItem): Array<string | number> {
    if (item.children && item.children.length) {
      return this.getAllSelectableLeafValues(item.children, this.disabled || item.disabled);
    }

    if (this.disabled || item.disabled) {
      return [];
    }

    return [this.getItemValue(item)];
  }

  private getAllLeafValues(items: VdCheckboxGroupItem[]): Array<string | number> {
    return items.flatMap((item) => {
      if (item.children && item.children.length) {
        return this.getAllLeafValues(item.children);
      }

      return [this.getItemValue(item)];
    });
  }

  private getAllSelectableLeafValues(
    items: VdCheckboxGroupItem[],
    inheritedDisabled = false,
  ): Array<string | number> {
    return items.flatMap((item) => {
      const isDisabled = inheritedDisabled || this.disabled || item.disabled;

      if (item.children && item.children.length) {
        return this.getAllSelectableLeafValues(item.children, isDisabled);
      }

      if (isDisabled) {
        return [];
      }

      return [this.getItemValue(item)];
    });
  }

  private applyParentSelection(items: VdCheckboxGroupItem[], inheritedDisabled = false): void {
    items.forEach((item) => {
      const isDisabled = inheritedDisabled || this.disabled || item.disabled;

      if (item.children && item.children.length) {
        const parentValue = this.getItemValue(item);
        const childValues = this.getAllSelectableLeafValues(item.children, isDisabled);

        if (this.selectedValues.has(parentValue) && childValues.length) {
          childValues.forEach((value) => this.selectedValues.add(value));
        }

        this.applyParentSelection(item.children, isDisabled);
      }
    });
  }

  private getItemValue(item: VdCheckboxGroupItem): string | number {
    return item.value ?? item.label;
  }
}
