import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VdDivider } from '../../vd-divider/vd-divider.component';

@Component({
  selector: 'vd-dropdown-item-group',
  standalone: true,
  imports: [CommonModule, VdDivider],
  template: ` <div class="vd-dropdown-item__group">
    <div *ngIf="name" class="vd-dropdown-item__group-title-row">
      <div class="vd-dropdown-item__group-title body-small">{{ name }}</div>
      <vd-divider
        class="vd-dropdown-item__divider"
        color="secondary"
        [inset]="true"
      ></vd-divider>
    </div>
    <ng-content></ng-content>
  </div>`,
  styleUrls: ['./vd-dropdown-item.scss'],
})
export class VdDropdownItemGroup {
  @Input() name?: string;
}
