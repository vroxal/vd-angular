import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

type BadgeVariant = 'solid' | 'subtle';
type BadgeColor = 'primary' | 'neutral' | 'error' | 'success' | 'info' | 'warning';
type BadgeSize = 'sm' | 'md';

@Component({
  selector: 'vd-badge',
  standalone: true, // standalone is required
  imports: [CommonModule], // for *ngIf and [class]
  templateUrl: './vd-badge.component.html',
  styleUrl: './vd-badge.component.scss',
})
export class VdBadge {
  @Input() label: string = '';
  @Input() variant: BadgeVariant = 'solid';
  @Input() color: BadgeColor = 'primary';
  @Input() size: BadgeSize = 'md';
  @Input() rounded: boolean = false;
}
