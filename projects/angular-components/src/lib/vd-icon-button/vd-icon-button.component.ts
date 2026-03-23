import { Component, Input, ElementRef, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VdIcon } from '../vd-icon/vd-icon.component';

type ButtonVariant = 'solid' | 'subtle' | 'outline' | 'transparent';
type ButtonColor = 'primary' | 'neutral' | 'error';
type ButtonSize = 'sm' | 'md' | 'lg';
type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

@Component({
  selector: 'vd-icon-button',
  standalone: true,
  imports: [CommonModule, VdIcon],
  templateUrl: './vd-icon-button.component.html',
  styleUrls: ['./vd-icon-button.component.scss'],
})
export class VdIconButton {
  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
  ) {}

  ngAfterViewInit() {
    const buttonEl = this.el.nativeElement.querySelector('button');
    if (buttonEl) {
      requestAnimationFrame(() => {
        buttonEl.classList.remove('not-initialized');
      });
    }
  }
  @Input() icon!: string;
  @Input() ariaLabel!: string;
  @Input() variant?: ButtonVariant = 'solid';
  @Input() color?: ButtonColor = 'primary';
  @Input() size?: ButtonSize = 'md';
  @Input() rounded?: boolean = false;
  @Input() disabled?: boolean = false;
  @Input() loading?: boolean = false;

  private buttonIconMap: Record<ButtonSize, IconSize> = {
    sm: 'md',
    md: 'md',
    lg: 'lg',
  };
  /** Effective icon size */
  get effectiveIconSize(): IconSize {
    return this.buttonIconMap[this.size ?? 'md'];
  }
}
