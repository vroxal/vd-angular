import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'vd-divider',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vd-divider.component.html',
  styleUrl: './vd-divider.component.scss',
})
export class VdDivider {
  /** CSS class for the icon (e.g., "vd-icon-save") */
  @Input() dashed?: boolean = false;
  @Input() color?: string = 'primary';
  @Input() direction?: string = 'horizontal';
  @Input() inset?: boolean = false;
}
