import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

@Component({
  selector: 'vd-icon',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vd-icon.component.html',
  styleUrl: './vd-icon.component.scss',
})
export class VdIcon {
  /** CSS class for the icon (e.g., "vd-icon-save") */
  @Input() name!: string;
  @Input() size?: IconSize;
  @Input() color?: string;
  /** Compute CSS class for size */
  get sizeClass(): string {
    if (!this.size) {
      return '';
    }
    return `vd-icon--${this.size}`;
  }
}
