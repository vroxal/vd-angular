import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VdIcon } from '../vd-icon/vd-icon.component';

export type VdTabType = 'default' | 'boxed';
export type VdTabDirection = 'horizontal' | 'vertical';
export type VdTabColor = 'primary' | 'neutral';

export interface VdTabConfig {
  label: string;
  value: string;
  icon?: string;
  disabled?: boolean;
}

@Component({
  selector: 'vd-tab',
  standalone: true,
  imports: [CommonModule, VdIcon],
  templateUrl: './vd-tab.component.html',
  styleUrl: './vd-tab.component.scss',
})
export class VdTab implements OnInit {
  /** Array of tab configurations */
  @Input() tabs: VdTabConfig[] = [];

  /** Currently active tab value */
  @Input() value: string = '';

  /** Visual type: 'default' (underline) or 'boxed' (filled background) */
  @Input() type: VdTabType = 'default';

  /** Layout direction */
  @Input() direction: VdTabDirection = 'horizontal';

  /** Color variant: 'primary' (brand) or 'neutral' (gray) */
  @Input() color: VdTabColor = 'primary';

  /** Emitted when active tab changes */
  @Output() valueChange = new EventEmitter<string>();

  /** Emitted when a tab is selected */
  @Output() tabChange = new EventEmitter<VdTabConfig>();

  ngOnInit(): void {
    // If no value is set, default to the first tab
    if (!this.value && this.tabs.length > 0) {
      this.value = this.tabs[0].value;
    }
  }

  selectTab(tab: VdTabConfig): void {
    if (tab.disabled) return;

    this.value = tab.value;
    this.valueChange.emit(this.value);
    this.tabChange.emit(tab);
  }

  isActive(tab: VdTabConfig): boolean {
    return this.value === tab.value;
  }

  trackByTab(_: number, tab: VdTabConfig): string {
    return tab.value;
  }
}
