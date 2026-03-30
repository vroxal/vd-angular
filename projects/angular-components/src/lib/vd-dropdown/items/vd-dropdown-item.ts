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
      (click)="onClick()"
    >
      <vd-icon *ngIf="icon" class="vd-dropdown-item__icon" [name]="icon"></vd-icon>
      <div *ngIf="title || description" class="vd-dropdown-item__content">
        <div *ngIf="title" class="vd-dropdown-item__title label-medium">{{ title }}</div>
        <div *ngIf="description" class="vd-dropdown-item__description body-small">
          {{ description }}
        </div>
      </div>
    </div>
  `,
  styleUrl: './vd-dropdown-item.scss',
})
export class VdDropdownItem {
  @Input() title!: string;
  @Input() description?: string;
  @Input() icon?: string;
  @Input() disabled = false;

  @Output() select = new EventEmitter<void>();

  constructor(@Optional() @Inject(VD_DROPDOWN) private dropdown: VdDropdownControl | null) {}

  onClick() {
    if (this.disabled) return;
    this.select.emit();
    this.dropdown?.close(); // close the parent dropdown
  }
}
