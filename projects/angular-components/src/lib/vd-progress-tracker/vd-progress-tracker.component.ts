import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VdIcon } from '../vd-icon/vd-icon.component';

export type VdProgressTrackerState = 'default' | 'active' | 'completed' | 'error' | 'disabled';
export type VdProgressTrackerDirection = 'horizontal' | 'vertical';
export type VdProgressTrackerIndicatorType = 'number' | 'icon';
export type VdProgressTrackerSize = 'sm' | 'lg';

export interface VdProgressTrackerItem {
  title: string;
  description?: string;
  state?: VdProgressTrackerState;
  indicatorLabel?: string | number;
  icon?: string;
}

@Component({
  selector: 'vd-progress-tracker',
  standalone: true,
  imports: [CommonModule, VdIcon],
  templateUrl: './vd-progress-tracker.component.html',
  styleUrls: ['./vd-progress-tracker.component.scss'],
})
export class VdProgressTracker {
  @Input() items: VdProgressTrackerItem[] = [];
  @Input() direction: VdProgressTrackerDirection = 'vertical';
  @Input() indicatorType: VdProgressTrackerIndicatorType = 'number';
  @Input() showDescription = true;
  @Input() showConnector = true;
  @Input() defaultIcon = 'vd-icon-placeholder';

  @Output() itemClick = new EventEmitter<number>();

  private readonly completedIcon = 'vd-icon-check';
  private readonly errorIcon = 'vd-icon-danger-circle-filled';

  get indicatorSize(): VdProgressTrackerSize {
    return this.direction === 'horizontal' ? 'sm' : 'lg';
  }

  getItemState(item: VdProgressTrackerItem): VdProgressTrackerState {
    return item.state ?? 'default';
  }

  getIndicatorLabel(item: VdProgressTrackerItem, index: number): string {
    if (item.indicatorLabel !== undefined && item.indicatorLabel !== null) {
      return String(item.indicatorLabel);
    }

    return String(index + 1);
  }

  shouldShowLabel(item: VdProgressTrackerItem): boolean {
    const state = this.getItemState(item);
    const type = this.indicatorType;

    return type === 'number' && state !== 'completed' && state !== 'error';
  }

  shouldShowIcon(item: VdProgressTrackerItem): boolean {
    const state = this.getItemState(item);
    const type = this.indicatorType;

    return type === 'icon' || state === 'completed' || state === 'error';
  }

  getIndicatorIcon(item: VdProgressTrackerItem): string {
    const state = this.getItemState(item);
    const type = this.indicatorType;

    if (state === 'completed') {
      return this.completedIcon;
    }

    if (state === 'error') {
      return this.errorIcon;
    }

    if (type === 'icon') {
      return item.icon ?? this.defaultIcon;
    }

    return this.defaultIcon;
  }

  onItemClick(item: VdProgressTrackerItem, index: number): void {
    const state = this.getItemState(item);
    if (state === 'disabled' || state === 'active') {
      return;
    }
    this.itemClick.emit(index);
  }

  trackByIndex(index: number): number {
    return index;
  }
}
