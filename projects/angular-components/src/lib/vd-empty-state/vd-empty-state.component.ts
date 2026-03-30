import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { VdButton } from '../vd-button/vd-button.component';
import { VdIcon } from '../vd-icon/vd-icon.component';

@Component({
  selector: 'vd-empty-state',
  standalone: true,
  imports: [CommonModule, VdIcon, VdButton],
  templateUrl: './vd-empty-state.component.html',
  styleUrl: './vd-empty-state.component.scss',
})
export class VdEmptyState {
  /** Heading shown as the primary message. */
  @Input({ required: true }) title!: string;

  /** Supporting description shown below the title (optional). */
  @Input() description?: string;

  /** Icon name rendered at the top of the empty state. */
  @Input() icon = 'vd-icon-placeholder';

  /** Show or hide the icon container. */
  @Input() showIcon = true;

  /** Boxed container style with padding, border and background. */
  @Input() boxed = true;

  /** Primary action button text. Button is visible only when label is provided. */
  @Input() primaryActionLabel = '';

  /** Secondary action button text. Button is visible only when label is provided. */
  @Input() secondaryActionLabel = '';

  /** Emitted when the primary action button is clicked. */
  @Output() primaryActionClick = new EventEmitter<void>();

  /** Emitted when the secondary action button is clicked. */
  @Output() secondaryActionClick = new EventEmitter<void>();

  get hasPrimaryAction(): boolean {
    return !!this.primaryActionLabel?.trim();
  }

  get hasSecondaryAction(): boolean {
    return !!this.secondaryActionLabel?.trim();
  }

  onPrimaryActionClick(): void {
    this.primaryActionClick.emit();
  }

  onSecondaryActionClick(): void {
    this.secondaryActionClick.emit();
  }
}
