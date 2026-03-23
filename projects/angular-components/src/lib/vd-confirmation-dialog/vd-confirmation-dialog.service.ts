import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { Dialog } from '@angular/cdk/dialog';
import { Overlay, ScrollStrategy, ScrollStrategyOptions } from '@angular/cdk/overlay';
import { firstValueFrom } from 'rxjs';
import {
  VdConfirmationDialog,
  VdConfirmationDialogConfig,
} from './vd-confirmation-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class VdConfirmationDialogService {
  private scrollStrategy: ScrollStrategy;

  constructor(
    private dialog: Dialog,
    private overlay: Overlay,
    private scrollStrategyOptions: ScrollStrategyOptions,
    @Inject(DOCUMENT) private document: Document,
  ) {
    this.scrollStrategy = this.scrollStrategyOptions.noop();
  }

  confirm(config: VdConfirmationDialogConfig): Promise<'confirm' | 'cancel'> {
    this.blurActiveElement();
    // FORCE top-center strategy
    const positionStrategy = this.overlay
      .position()
      .global()
      .top('var(--vd-scale-spacing-1800)')
      .centerHorizontally();

    const dialogRef = this.dialog.open<
      'confirm' | 'cancel',
      VdConfirmationDialogConfig,
      VdConfirmationDialog
    >(VdConfirmationDialog, {
      data: config,
      hasBackdrop: true,
      disableClose: true,
      autoFocus: false,
      panelClass: ['vd-dialog-panel'],
      backdropClass: 'vd-dialog-backdrop',
      scrollStrategy: this.scrollStrategy,
      positionStrategy: positionStrategy,
    });

    return firstValueFrom(dialogRef.closed).then((result) => result ?? 'cancel');
  }

  private blurActiveElement(): void {
    const activeElement = this.document.activeElement;
    if (activeElement instanceof HTMLElement) {
      activeElement.blur();
    }
  }
}
