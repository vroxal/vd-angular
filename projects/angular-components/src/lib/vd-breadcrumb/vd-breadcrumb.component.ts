import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { VdIcon } from '../vd-icon/vd-icon.component';
import { VdDropdown } from '../vd-dropdown/vd-dropdown.component';
import { VdDropdownItemLink } from '../vd-dropdown/items/vd-dropdown-item-link';
import { VdIconButton } from '../vd-icon-button/vd-icon-button.component';

export interface BreadcrumbItem {
  label: string;
  url?: string;
  [key: string]: any;
}

@Component({
  selector: 'vd-breadcrumb',
  standalone: true,
  imports: [CommonModule, VdIcon, VdDropdown, VdDropdownItemLink, VdIconButton],
  templateUrl: './vd-breadcrumb.component.html',
  styleUrl: './vd-breadcrumb.component.scss',
})
export class VdBreadcrumb {
  @Input() items: BreadcrumbItem[] = [];
  @Input() separatorIcon: string = 'vd-icon-caret-right';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';

  @Output() itemClick = new EventEmitter<BreadcrumbItem>();

  get maxItems(): number {
    return 4;
  }

  get showOverflow(): boolean {
    return this.items.length > this.maxItems;
  }

  get visibleItems(): BreadcrumbItem[] {
    if (!this.showOverflow) {
      return this.items;
    }
    // Show first item, overflow menu, and last 3 items
    return [this.items[0], ...this.items.slice(-2)];
  }

  get overflowItems(): BreadcrumbItem[] {
    if (!this.showOverflow) {
      return [];
    }
    // Items between the first and the last 3
    return this.items.slice(1, -2);
  }

  private router = inject(Router);

  onItemClick(event: Event, item: BreadcrumbItem) {
    event.preventDefault();
    if (item.url) {
      this.router.navigate([item.url]);
    }
    this.itemClick.emit(item);
  }
}
