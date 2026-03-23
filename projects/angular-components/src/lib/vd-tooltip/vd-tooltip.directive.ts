import {
  Directive,
  Input,
  ElementRef,
  HostListener,
  OnDestroy,
  ViewContainerRef,
  inject,
} from '@angular/core';
import { Overlay, OverlayRef, ConnectedPosition } from '@angular/cdk/overlay';
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
      .withPositions([POSITIONS[this.vdTooltipPosition]])
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

const POSITIONS: Record<TooltipPosition, ConnectedPosition> = {
  'top-center': {
    originX: 'center',
    originY: 'top',
    overlayX: 'center',
    overlayY: 'bottom',
    offsetY: -8,
  },
  'top-left': {
    originX: 'start',
    originY: 'top',
    overlayX: 'start',
    overlayY: 'bottom',
    offsetY: -8,
  },
  'top-right': {
    originX: 'end',
    originY: 'top',
    overlayX: 'end',
    overlayY: 'bottom',
    offsetY: -8,
  },
  'bottom-center': {
    originX: 'center',
    originY: 'bottom',
    overlayX: 'center',
    overlayY: 'top',
    offsetY: 8,
  },
  'bottom-left': {
    originX: 'start',
    originY: 'bottom',
    overlayX: 'start',
    overlayY: 'top',
    offsetY: 8,
  },
  'bottom-right': {
    originX: 'end',
    originY: 'bottom',
    overlayX: 'end',
    overlayY: 'top',
    offsetY: 8,
  },
  'center-left': {
    originX: 'start',
    originY: 'center',
    overlayX: 'end',
    overlayY: 'center',
    offsetX: -8,
  },
  'center-right': {
    originX: 'end',
    originY: 'center',
    overlayX: 'start',
    overlayY: 'center',
    offsetX: 8,
  },
};
