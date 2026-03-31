import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, Input, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
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
  styleUrl: './vd-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VdButton implements AfterViewInit {
  initialized = false;

  constructor(
    private cdr: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private platformId: object,
  ) {}

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      requestAnimationFrame(() => {
        this.initialized = true;
        this.cdr.markForCheck();
      });
    }
  }

  @Input({ required: true }) label!: string;
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
