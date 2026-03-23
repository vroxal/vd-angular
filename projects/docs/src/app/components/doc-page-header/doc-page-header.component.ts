import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-doc-page-header',
  templateUrl: './doc-page-header.component.html',
  styleUrls: ['./doc-page-header.component.scss'],
  imports: [CommonModule],
})
export default class DocPageHeaderComponent {
  @Input() title!: string;
  @Input() subtitle?: string;
}
