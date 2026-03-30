import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VdDivider } from '../../vd-divider/vd-divider.component';

@Component({
  selector: 'vd-dropdown-item-divider',
  standalone: true,
  imports: [CommonModule, VdDivider],
  template: ` <vd-divider class="vd-dropdown-item__divider" color="secondary"></vd-divider> `,
  styleUrl: './vd-dropdown-item.scss',
})
export class VdDropdownItemDivider {}
