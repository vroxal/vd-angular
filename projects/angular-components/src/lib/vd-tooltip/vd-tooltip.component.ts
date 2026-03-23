import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

export type TooltipPosition =
  | 'top-center'
  | 'top-left'
  | 'top-right'
  | 'center-left'
  | 'center-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right';

@Component({
  selector: 'vd-tooltip',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="vd-tooltip" [attr.data-position]="position">
      <p class="vd-tooltip__text body-small">
        {{ text }}
      </p>
      <span class="vd-tooltip__arrow"></span>
    </div>
  `,
  styleUrls: ['./vd-tooltip.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VdTooltip {
  @Input() text = '';
  @Input() position: TooltipPosition = 'top-center';
}
