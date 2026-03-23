import { Component, Input } from '@angular/core';

@Component({
  selector: 'vd-navbar',
  standalone: true,
  templateUrl: './vd-navbar.component.html',
  styleUrls: ['./vd-navbar.component.scss'],
})
export class VdNavbar {
  @Input() logoUrl?: string;
  @Input() logoAlt?: string = 'Brand Logo';
}
