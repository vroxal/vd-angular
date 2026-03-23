import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { Dialog } from '@angular/cdk/dialog';
import { Overlay, ScrollStrategy, ScrollStrategyOptions } from '@angular/cdk/overlay';
import { firstValueFrom } from 'rxjs';
import { VdDrawer, VdDrawerConfig, VdDrawerResult } from './vd-drawer.component';

@Injectable({
  providedIn: 'root',
})
export class VdDrawerService {
  private scrollStrategy: ScrollStrategy;
  private activeDrawerCount = 0;
  private removeScrollLockListeners: (() => void) | null = null;

  constructor(
    private dialog: Dialog,
    private overlay: Overlay,
    private scrollStrategyOptions: ScrollStrategyOptions,
    @Inject(DOCUMENT) private document: Document,
  ) {
    // Use noop to avoid body scrollbar/padding adjustments that can shift fixed headers/navbars.
    this.scrollStrategy = this.scrollStrategyOptions.noop();
  }

  open<T = unknown>(config: VdDrawerConfig<T>): Promise<VdDrawerResult> {
    this.lockBackgroundScroll();
    this.blurActiveElement();
    const positionStrategy = this.overlay.position().global().top('0').right('0');

    try {
      const dialogRef = this.dialog.open<VdDrawerResult, VdDrawerConfig<T>, VdDrawer>(
        VdDrawer,
        {
          data: config,
          hasBackdrop: true,
          disableClose: true,
          autoFocus: false,
          backdropClass: 'vd-drawer-backdrop',
          panelClass: ['vd-drawer-panel'],
          scrollStrategy: this.scrollStrategy,
          positionStrategy,
        },
      );

      return firstValueFrom(dialogRef.closed)
        .then((result) => result ?? 'close')
        .finally(() => {
          this.unlockBackgroundScroll();
        });
    } catch (error) {
      this.unlockBackgroundScroll();
      throw error;
    }
  }

  private lockBackgroundScroll(): void {
    this.activeDrawerCount += 1;
    if (this.activeDrawerCount > 1) return;

    const shouldPreventScrollForEvent = (target: EventTarget | null): boolean => {
      if (!(target instanceof Element)) return true;
      if (target.closest('.vd-drawer__content')) return false;

      // Allow wheel/touch scrolling in nested overlay panes opened from drawer content
      // (for example select/date dropdown panels rendered in the global overlay container).
      const overlayPane = target.closest('.cdk-overlay-pane');
      if (overlayPane && !overlayPane.classList.contains('vd-drawer-panel')) {
        return false;
      }

      return true;
    };

    const wheelAndTouchHandler = (event: Event): void => {
      if (shouldPreventScrollForEvent(event.target)) {
        event.preventDefault();
      }
    };

    const keydownHandler = (event: KeyboardEvent): void => {
      const scrollKeys = ['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' '];
      if (!scrollKeys.includes(event.key)) return;

      if (shouldPreventScrollForEvent(event.target)) {
        event.preventDefault();
      }
    };

    this.document.addEventListener('wheel', wheelAndTouchHandler, {
      passive: false,
      capture: true,
    });
    this.document.addEventListener('touchmove', wheelAndTouchHandler, {
      passive: false,
      capture: true,
    });
    this.document.addEventListener('keydown', keydownHandler, {
      passive: false,
      capture: true,
    });

    this.removeScrollLockListeners = () => {
      this.document.removeEventListener('wheel', wheelAndTouchHandler, true);
      this.document.removeEventListener('touchmove', wheelAndTouchHandler, true);
      this.document.removeEventListener('keydown', keydownHandler, true);
    };
  }

  private unlockBackgroundScroll(): void {
    this.activeDrawerCount = Math.max(0, this.activeDrawerCount - 1);
    if (this.activeDrawerCount > 0) return;

    if (this.removeScrollLockListeners) {
      this.removeScrollLockListeners();
      this.removeScrollLockListeners = null;
    }
  }

  private blurActiveElement(): void {
    const activeElement = this.document.activeElement;
    if (activeElement instanceof HTMLElement) {
      activeElement.blur();
    }
  }
}
