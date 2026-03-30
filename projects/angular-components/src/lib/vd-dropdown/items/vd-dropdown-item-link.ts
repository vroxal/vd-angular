import { Component, Optional, Inject, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'vd-dropdown-item-link',
  standalone: true,
  imports: [CommonModule],
  template: `
    <a
      class="vd-dropdown-item vd-dropdown-item__link"
      [class.vd-dropdown-item--disabled]="disabled"
      [href]="disabled ? null : href"
      [target]="target"
      (click)="onClick($event)"
    >
      <div class="vd-dropdown-item__content">
        <div class="vd-dropdown-item__title label-medium">{{ title }}</div>
      </div>
    </a>
  `,
  styleUrl: './vd-dropdown-item.scss',
})
export class VdDropdownItemLink {
  @Input() href!: string;
  @Input() target?: string;
  @Input() title!: string;
  @Input() disabled = false;

  @Output() select = new EventEmitter<Event>();

  onClick(event: Event) {
    if (this.disabled) {
      event.preventDefault();
      return;
    }
    this.select.emit(event);
  }
}
