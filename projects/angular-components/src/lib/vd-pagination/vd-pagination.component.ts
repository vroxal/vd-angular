import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VdButton } from '../vd-button/vd-button.component'; // adjust path

@Component({
  selector: 'vd-pagination',
  standalone: true,
  imports: [CommonModule, VdButton],
  templateUrl: './vd-pagination.component.html',
  styleUrls: ['./vd-pagination.component.scss'],
})
export class VdPagination implements OnChanges {
  @Input() totalPages: number = 1;
  @Input() currentPage: number = 1;
  @Output() pageChange = new EventEmitter<number>();

  pagesToShow: (number | '...')[] = [];

  ngOnChanges() {
    this.generatePages();
  }

  private generatePages() {
    const pages: (number | '...')[] = [];

    if (this.totalPages <= 7) {
      // Show all pages if 7 or less
      for (let i = 1; i <= this.totalPages; i++) pages.push(i);
    } else {
      // Active page in first 4
      if (this.currentPage <= 4) {
        pages.push(1, 2, 3, 4, 5, '...', this.totalPages);
      }
      // Active page in last 4
      else if (this.currentPage >= this.totalPages - 3) {
        pages.push(
          1,
          '...',
          this.totalPages - 4,
          this.totalPages - 3,
          this.totalPages - 2,
          this.totalPages - 1,
          this.totalPages
        );
      }
      // Active page in the middle
      else {
        pages.push(
          1,
          '...',
          this.currentPage - 1,
          this.currentPage,
          this.currentPage + 1,
          '...',
          this.totalPages
        );
      }
    }

    this.pagesToShow = pages;
  }

  goToPage(page: number | '...') {
    if (page === '...') return;
    this.currentPage = page;
    this.pageChange.emit(page);
    this.generatePages();
  }

  goPrevious() {
    if (this.currentPage > 1) this.goToPage(this.currentPage - 1);
  }

  goNext() {
    if (this.currentPage < this.totalPages) this.goToPage(this.currentPage + 1);
  }
}
