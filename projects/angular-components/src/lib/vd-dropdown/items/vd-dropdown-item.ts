import { Component, Optional, Inject, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VdIcon } from '../../vd-icon/vd-icon.component';
import { VD_DROPDOWN, VdDropdownControl } from '../vd-dropdown.token';

@Component({
  selector: 'vd-dropdown-item',
  standalone: true,
  imports: [CommonModule, VdIcon],
  template: `
    <div
      class="vd-dropdown-item"
      [class.vd-dropdown-item--disabled]="disabled"
      [class.vd-dropdown-item--selected]="selectable && selected"
      (click)="onClick()"
    >
      <vd-icon *ngIf="icon" class="vd-dropdown-item__icon" [name]="icon"></vd-icon>
      <div *ngIf="title || description" class="vd-dropdown-item__content">
        <div *ngIf="title" class="vd-dropdown-item__title label-medium">{{ title }}</div>
        <div *ngIf="description" class="vd-dropdown-item__description body-small">
          {{ description }}
        </div>
      </div>
      <vd-icon
        *ngIf="selectable && selected"
        class="vd-dropdown-item__check"
        name="vd-icon-check"
      ></vd-icon>
    </div>
  `,
  styleUrl: './vd-dropdown-item.scss',
})
export class VdDropdownItem {
  @Input() title!: string;
  @Input() description?: string;
  @Input() icon?: string;
  @Input() disabled = false;
  @Input() selectable = false;
  @Input() selected = false;

  @Output() select = new EventEmitter<void>();
  @Output() selectedChange = new EventEmitter<boolean>();

  constructor(@Optional() @Inject(VD_DROPDOWN) private dropdown: VdDropdownControl | null) {}

  onClick() {
    if (this.disabled) return;

    if (this.selectable) {
      this.selected = !this.selected;
      this.selectedChange.emit(this.selected);
      return;
    }

    this.select.emit();
    this.dropdown?.close();
  }
}
