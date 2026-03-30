import {
  Directive,
  Input,
  ElementRef,
  HostListener,
  OnDestroy,
  ViewContainerRef,
  inject,
} from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { OVERLAY_POSITION_MAP } from '../shared/overlay-positions';
import { ComponentPortal } from '@angular/cdk/portal';
import { VdTooltip, TooltipPosition } from './vd-tooltip.component';

@Directive({
  selector: '[vdTooltip]',
  standalone: true,
})
export class VdTooltipDirective implements OnDestroy {
  @Input('vdTooltip') text = '';
  @Input() vdTooltipPosition: TooltipPosition = 'top-center';

  private overlayRef?: OverlayRef;

  private overlay = inject(Overlay);
  private elementRef = inject(ElementRef<HTMLElement>);
  private viewContainerRef = inject(ViewContainerRef);

  ngOnDestroy() {
    this.destroy();
  }

  @HostListener('mouseenter')
  show() {
    if (!this.text || this.overlayRef) return;

    const positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo(this.elementRef)
      .withPositions([OVERLAY_POSITION_MAP[this.vdTooltipPosition]])
      .withPush(false);

    this.overlayRef = this.overlay.create({
      positionStrategy,
      panelClass: 'vd-tooltip',
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
    });

    const portal = new ComponentPortal(VdTooltip, this.viewContainerRef);

    const tooltipRef = this.overlayRef.attach(portal);
    tooltipRef.instance.text = this.text;
    tooltipRef.instance.position = this.vdTooltipPosition;
  }

  @HostListener('mouseleave')
  hide() {
    this.destroy();
  }

  private destroy() {
    this.overlayRef?.dispose();
    this.overlayRef = undefined;
  }
}

