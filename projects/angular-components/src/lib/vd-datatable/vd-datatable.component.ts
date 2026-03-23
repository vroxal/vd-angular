import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TemplateRef } from '@angular/core';
import { VdPagination } from '../vd-pagination/vd-pagination.component';
import { VdDropdown } from '../vd-dropdown/vd-dropdown.component';
import { VdDropdownItem } from '../vd-dropdown/items/vd-dropdown-item';
import { VdIconButton } from '../vd-icon-button/vd-icon-button.component';

export interface VdDatatableColumn<T = any> {
  key: keyof T | string;
  title: string;
  cell?: (row: T) => string | number;
  template?: TemplateRef<DatatableCellContext<T>>;
}

export interface VdDatatableAction<T = any> {
  title: string;
  icon?: string;
  action: (row: T) => void;
  visible?: (row: T) => boolean;
  disabled?: (row: T) => boolean;
}
export interface DatatableCellContext<T> {
  $implicit: T;
  row: T;
  key: keyof T | string;
}
@Component({
  selector: 'vd-datatable',
  standalone: true,
  templateUrl: './vd-datatable.component.html',
  styleUrls: ['./vd-datatable.component.scss'],
  imports: [CommonModule, VdPagination, VdDropdown, VdDropdownItem, VdIconButton],
})
export class VdDatatable<T extends Record<string, any> = any> {
  @Input() data: T[] = [];

  @Input() columns: VdDatatableColumn<T>[] = [];
  @Input() expandedColumns: VdDatatableColumn<T>[] = [];

  @Input() actions: VdDatatableAction<T>[] = [];

  @Input() currentPage = 1;
  @Input() totalPages = 0;
  @Input() rowsPerPage = 10;
  @Input() totalRows = 0;

  @Output() actionTriggered = new EventEmitter<{ action: string; row: T }>();
  @Output() rowClicked = new EventEmitter<T>();
  @Output() pageChange = new EventEmitter<number>();

  expandedRow: T | null = null;

  get isExpandable(): boolean {
    return this.expandedColumns.length > 0;
  }

  get pagedData(): T[] {
    const start = (this.currentPage - 1) * this.rowsPerPage;
    return this.data.slice(start, start + this.rowsPerPage);
  }

  toggleExpand(row: T) {
    if (!this.isExpandable) {
      this.rowClicked.emit(row);
      return;
    }
    this.expandedRow = this.expandedRow === row ? null : row;
  }

  getRowActions(row: T): VdDatatableAction<T>[] {
    return this.actions.filter((a) => (a.visible ? a.visible(row) : true));
  }

  hasActions(row: T): boolean {
    return this.getRowActions(row).length > 0;
  }

  onActionClick(action: VdDatatableAction<T>, row: T) {
    action.action(row);
    this.actionTriggered.emit({ action: action.title, row });
  }

  onPageChanged(page: number) {
    this.pageChange.emit(page);
  }
  get rangeStart(): number {
    return (this.currentPage - 1) * this.rowsPerPage + 1;
  }

  get rangeEnd(): number {
    return Math.min(this.currentPage * this.rowsPerPage, this.totalRows);
  }
}
