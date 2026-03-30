import { Component, Inject, ChangeDetectorRef, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { VdIcon } from '../vd-icon/vd-icon.component';
import { VdButton } from '../vd-button/vd-button.component';
import { Subject, takeUntil } from 'rxjs';

export type DialogColor = 'default' | 'error';
// export type DialogPosition = 'top-center'; // Only top-center supported now

export interface VdConfirmationDialogConfig {
  title: string;
  description?: string;
  icon?: string;
  color?: DialogColor;
  cancelLabel?: string;
  confirmLabel?: string;
}

interface ResolvedConfig {
  title: string;
  description?: string;
  icon?: string;
  color: DialogColor;
  cancelLabel: string;
  confirmLabel: string;
}

@Component({
  selector: 'vd-confirmation-dialog',
  standalone: true,
  imports: [CommonModule, VdIcon, VdButton],
  templateUrl: './vd-confirmation-dialog.component.html',
  styleUrl: './vd-confirmation-dialog.component.scss',
})
export class VdConfirmationDialog implements OnInit, OnDestroy {
  readonly config: ResolvedConfig;
  isClosing = false;
  private destroy$ = new Subject<void>();

  constructor(
    @Inject(DIALOG_DATA) data: VdConfirmationDialogConfig,
    private dialogRef: DialogRef<'confirm' | 'cancel'>,
    private cdr: ChangeDetectorRef,
  ) {
    this.config = {
      title: data.title,
      description: data.description,
      icon: data.icon,
      color: data.color ?? 'default',
      cancelLabel: data.cancelLabel ?? 'Cancel',
      confirmLabel: data.confirmLabel ?? 'Confirm',
    };
  }

  ngOnInit() {
    this.dialogRef.backdropClick.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.handleCancel();
    });

    this.dialogRef.keydownEvents.pipe(takeUntil(this.destroy$)).subscribe((event) => {
      if (event.key === 'Escape') {
        this.handleCancel();
      }
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  handleCancel(): void {
    this.closeDialog('cancel');
  }

  handleConfirm(): void {
    this.closeDialog('confirm');
  }

  private closeDialog(result: 'confirm' | 'cancel'): void {
    if (this.isClosing) return;

    this.isClosing = true;
    this.cdr.detectChanges(); // Ensure UI updates immediately to trigger animation

    // Wait for animation to finish (300ms matches CSS animation)
    setTimeout(() => {
      this.dialogRef.close(result);
    }, 150);
  }
}
