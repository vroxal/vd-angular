import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VdIcon } from '../vd-icon/vd-icon.component';

@Component({
  selector: 'vd-chip',
  standalone: true,
  imports: [CommonModule, VdIcon],
  templateUrl: './vd-chip.component.html',
  styleUrl: './vd-chip.component.scss',
})
export class VdChip {
  @Input({ required: true }) label!: string;
  @Input() selected: boolean = false;
  @Input() closable: boolean = true;
  @Input() icon: string = '';
  @Input() disabled: boolean = false;

  @Output() closed = new EventEmitter<void>();
  @Output() selectedChange = new EventEmitter<boolean>();

  onChipClick(): void {
    if (this.disabled) return;
    this.selected = !this.selected;
    this.selectedChange.emit(this.selected);
  }

  onCloseClick(event: MouseEvent): void {
    event.stopPropagation();
    if (this.disabled) return;
    this.closed.emit();
  }

  onKeyDown(event: KeyboardEvent): void {
    if (this.disabled) return;
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.onChipClick();
    }
  }
}
