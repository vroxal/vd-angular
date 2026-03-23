import { CommonModule } from '@angular/common';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { ChangeDetectorRef, Component, Inject, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { VdButton } from '../vd-button/vd-button.component';
import { VdIconButton } from '../vd-icon-button/vd-icon-button.component';

export type VdDialogResult = 'primary' | 'secondary' | 'close';

export interface VdDialogConfig<T = unknown> {
  title: string;
  contentTemplate: TemplateRef<T>;
  context?: T;
  primaryActionLabel?: string;
  secondaryActionLabel?: string;
}

@Component({
  selector: 'vd-dialog',
  standalone: true,
  imports: [CommonModule, VdButton, VdIconButton],
  templateUrl: './vd-dialog.component.html',
  styleUrls: ['./vd-dialog.component.scss'],
})
export class VdDialog<T = unknown> implements OnInit, OnDestroy {
  readonly config: VdDialogConfig<T>;
  isClosing = false;
  private destroy$ = new Subject<void>();

  constructor(
    @Inject(DIALOG_DATA) data: VdDialogConfig<T>,
    private dialogRef: DialogRef<VdDialogResult>,
    private cdr: ChangeDetectorRef,
  ) {
    this.config = data;
  }

  get hasActions(): boolean {
    return Boolean(this.config.primaryActionLabel || this.config.secondaryActionLabel);
  }

  ngOnInit(): void {
    this.dialogRef.backdropClick.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.handleClose();
    });

    this.dialogRef.keydownEvents.pipe(takeUntil(this.destroy$)).subscribe((event) => {
      if (event.key === 'Escape') {
        this.handleClose();
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  handleClose(): void {
    this.closeDialog('close');
  }

  handlePrimaryAction(): void {
    this.closeDialog('primary');
  }

  handleSecondaryAction(): void {
    this.closeDialog('secondary');
  }

  private closeDialog(result: VdDialogResult): void {
    if (this.isClosing) return;

    this.isClosing = true;
    this.cdr.detectChanges();

    setTimeout(() => {
      this.dialogRef.close(result);
    }, 150);
  }
}
