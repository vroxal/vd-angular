//toast component
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VdToastService } from './vd-toast.service';
import { Toast, ToastPosition } from './vd-toast.model';
import { VdIconButton } from '../vd-icon-button/vd-icon-button.component';
import { VdIcon } from '../vd-icon/vd-icon.component';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'vd-toast',
  standalone: true,
  imports: [CommonModule, VdIconButton, VdIcon],
  templateUrl: './vd-toast.component.html',
  styleUrl: './vd-toast.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VdToast implements OnInit {
  @Input() maxStack?: number;

  positions: ToastPosition[] = [
    'top-right',
    'top-left',
    'top-center',
    'bottom-right',
    'bottom-left',
    'bottom-center',
  ];

  toastsByPosition$!: Observable<Record<ToastPosition, Toast[]>>;

  constructor(public toastService: VdToastService) {}

  ngOnInit() {
    if (this.maxStack !== undefined) {
      this.toastService.configure({
        maxStack: this.maxStack,
      });
    }

    this.toastsByPosition$ = this.toastService.toasts$.pipe(
      map((toasts) => {
        const grouped: Record<ToastPosition, Toast[]> = {
          'top-right': [],
          'top-left': [],
          'top-center': [],
          'bottom-right': [],
          'bottom-left': [],
          'bottom-center': [],
        };

        toasts.forEach((toast) => {
          const position = toast.position || 'top-right';
          grouped[position].push(toast);
        });

        return grouped;
      }),
    );
  }

  trackById(_: number, toast: Toast) {
    return toast.id;
  }

  close(id: string) {
    this.toastService.dismiss(id);
  }

  onMouseEnter(toast: Toast) {
    this.toastService.pause(toast.id!);
  }

  onMouseLeave(toast: Toast) {
    this.toastService.resume(toast.id!);
  }

  getIconName(toast: Toast): string {
    switch (toast.color) {
      case 'success':
        return 'vd-icon-check-circle-filled';
      case 'error':
        return 'vd-icon-danger-circle-filled';
      case 'warning':
        return 'vd-icon-danger-triangle-filled';
      case 'info':
        return 'vd-icon-info-circle-filled';
      default:
        return '';
    }
  }
}
