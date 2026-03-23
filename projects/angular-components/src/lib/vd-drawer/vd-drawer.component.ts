import { ChangeDetectorRef, Component, Inject, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Subject, takeUntil } from 'rxjs';
import { VdButton } from '../vd-button/vd-button.component';
import { VdIconButton } from '../vd-icon-button/vd-icon-button.component';

export type VdDrawerSize = 'sm' | 'md' | 'lg';
export type VdDrawerResult = 'primary' | 'secondary' | 'close';

export interface VdDrawerConfig<T = unknown> {
  title: string;
  size?: VdDrawerSize;
  contentTemplate: TemplateRef<T>;
  context?: T;
  primaryActionLabel?: string;
  secondaryActionLabel?: string;
}

interface ResolvedConfig<T> extends VdDrawerConfig<T> {
  size: VdDrawerSize;
}

@Component({
  selector: 'vd-drawer',
  standalone: true,
  imports: [CommonModule, VdButton, VdIconButton],
  templateUrl: './vd-drawer.component.html',
  styleUrls: ['./vd-drawer.component.scss'],
})
export class VdDrawer<T = unknown> implements OnInit, OnDestroy {
  readonly config: ResolvedConfig<T>;
  isClosing = false;
  private destroy$ = new Subject<void>();

  constructor(
    @Inject(DIALOG_DATA) data: VdDrawerConfig<T>,
    private dialogRef: DialogRef<VdDrawerResult>,
    private cdr: ChangeDetectorRef,
  ) {
    this.config = {
      ...data,
      size: data.size ?? 'md',
    };
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
    this.closeDrawer('close');
  }

  handlePrimaryAction(): void {
    this.closeDrawer('primary');
  }

  handleSecondaryAction(): void {
    this.closeDrawer('secondary');
  }

  private closeDrawer(result: VdDrawerResult): void {
    if (this.isClosing) return;

    this.isClosing = true;
    this.cdr.detectChanges();

    setTimeout(() => {
      this.dialogRef.close(result);
    }, 150);
  }
}
