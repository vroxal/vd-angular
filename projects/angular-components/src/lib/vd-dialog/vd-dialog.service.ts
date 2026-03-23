import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { Dialog } from '@angular/cdk/dialog';
import { Overlay, ScrollStrategy, ScrollStrategyOptions } from '@angular/cdk/overlay';
import { firstValueFrom } from 'rxjs';
import { VdDialog, VdDialogConfig, VdDialogResult } from './vd-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class VdDialogService {
  private scrollStrategy: ScrollStrategy;

  constructor(
    private dialog: Dialog,
    private overlay: Overlay,
    private scrollStrategyOptions: ScrollStrategyOptions,
    @Inject(DOCUMENT) private document: Document,
  ) {
    // Keep body layout stable and rely on modal backdrop for interaction lock.
    this.scrollStrategy = this.scrollStrategyOptions.noop();
  }

  open<T = unknown>(config: VdDialogConfig<T>): Promise<VdDialogResult> {
    this.blurActiveElement();
    const positionStrategy = this.overlay
      .position()
      .global()
      .top('var(--vd-scale-spacing-1800)')
      .centerHorizontally();

    const dialogRef = this.dialog.open<VdDialogResult, VdDialogConfig<T>, VdDialog<T>>(
      VdDialog,
      {
        data: config,
        hasBackdrop: true,
        disableClose: true,
        autoFocus: false,
        backdropClass: 'vd-dialog-backdrop',
        panelClass: ['vd-dialog-panel'],
        scrollStrategy: this.scrollStrategy,
        positionStrategy,
      },
    );

    return firstValueFrom(dialogRef.closed).then((result) => result ?? 'close');
  }

  private blurActiveElement(): void {
    const activeElement = this.document.activeElement;
    if (activeElement instanceof HTMLElement) {
      activeElement.blur();
    }
  }
}
