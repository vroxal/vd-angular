import { Component, Input, ElementRef, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VdIcon } from '../vd-icon/vd-icon.component';

type ButtonVariant = 'solid' | 'subtle' | 'outline' | 'transparent';
type ButtonColor = 'primary' | 'neutral' | 'error';
type ButtonSize = 'sm' | 'md' | 'lg';
type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type ButtonType = 'button' | 'submit' | 'reset';

@Component({
  selector: 'vd-button',
  standalone: true, // standalone is required
  imports: [CommonModule, VdIcon], // for *ngIf and [class]
  templateUrl: './vd-button.component.html',
  styleUrls: ['./vd-button.component.scss'],
})
export class VdButton {
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
  @Input() label!: string;
  @Input() variant?: ButtonVariant;
  @Input() color?: ButtonColor;
  @Input() size?: ButtonSize;
  @Input() rounded?: boolean;
  @Input() disabled?: boolean;
  @Input() loading?: boolean;
  @Input() leftIcon?: string;
  @Input() rightIcon?: string;
  @Input() type: ButtonType = 'button';

  /** Map button size → default icon size */
  private buttonIconMap: Record<ButtonSize, IconSize> = {
    sm: 'xs',
    md: 'md',
    lg: 'lg',
  };
  /** Effective icon size */
  get effectiveIconSize(): IconSize {
    return this.buttonIconMap[this.size ?? 'md'];
  }
}
