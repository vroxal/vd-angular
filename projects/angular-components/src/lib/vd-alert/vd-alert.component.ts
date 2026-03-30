import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VdIcon } from '../vd-icon/vd-icon.component';
import { VdIconButton } from '../vd-icon-button/vd-icon-button.component';
import { VdButton } from '../vd-button/vd-button.component';

type AlertColor = 'primary' | 'success' | 'error' | 'warning' | 'info' | 'neutral';

@Component({
  selector: 'vd-alert',
  standalone: true,
  imports: [CommonModule, VdIcon, VdIconButton, VdButton],
  templateUrl: './vd-alert.component.html',
  styleUrl: './vd-alert.component.scss',
})
export class VdAlert {
  /** Alert title (optional) */
  @Input() title?: string;

  /** Alert description/content (required) */
  @Input() description!: string;

  /** Alert color variant */
  @Input() color: AlertColor = 'primary';

  /** Show action button */
  @Input() action: boolean = true;

  /** Show close button */
  @Input() closable: boolean = true;

  /** Action button text */
  @Input() actionLabel: string = 'Alert Action';

  /** Display action button inline */
  @Input() actionInline: boolean = false;

  /** Show icon */
  @Input() showIcon: boolean = true;

  /** Leading icon name - if not provided, defaults based on color */
  @Input() icon?: string;

  /** Emitted when close button is clicked */
  @Input() onClose?: () => void;

  /** Emitted when action button is clicked */
  @Input() onAction?: () => void;

  /** Get the icon name based on color or custom icon */
  get iconName(): string {
    if (this.icon) {
      return this.icon;
    }

    switch (this.color) {
      case 'success':
        return 'vd-icon-check-circle-filled';
      case 'error':
        return 'vd-icon-danger-circle-filled';
      case 'warning':
        return 'vd-icon-danger-triangle-filled';
      case 'info':
        return 'vd-icon-info-circle-filled';
      case 'primary':
      case 'neutral':
      default:
        return 'vd-icon-info-circle-filled';
    }
  }

  handleClose(): void {
    this.onClose?.();
  }

  handleAction(): void {
    this.onAction?.();
  }
}
