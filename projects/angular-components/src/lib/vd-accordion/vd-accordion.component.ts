import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VdIcon } from '../vd-icon/vd-icon.component';
import { VdDivider } from '../vd-divider/vd-divider.component';

type AccordionStyle = 'filled' | 'divided';

@Component({
  selector: 'vd-accordion',
  standalone: true,
  imports: [CommonModule, VdIcon, VdDivider],
  templateUrl: './vd-accordion.component.html',
  styleUrl: './vd-accordion.component.scss',
})
export class VdAccordion {
  @Input() title: string = 'Title';
  @Input() variant: AccordionStyle = 'filled';
  @Input() icon?: string;
  @Input() active: boolean = false;
  toggle(): void {
    this.active = !this.active;
  }
}
