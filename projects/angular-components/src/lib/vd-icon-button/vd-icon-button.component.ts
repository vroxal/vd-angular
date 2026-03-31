import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, Input, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
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
  styleUrl: './vd-icon-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VdIconButton implements AfterViewInit {
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

  @Input({ required: true }) icon!: string;
  @Input({ required: true }) ariaLabel!: string;
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
