import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'vd-loading-state',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vd-loading-state.component.html',
  styleUrls: ['./vd-loading-state.component.scss'],
})
export class VdLoadingState {
  /** Heading shown as the primary message. */
  @Input({ required: true }) title!: string;

  /** Supporting description shown below the title (optional). */
  @Input() description?: string;
}
