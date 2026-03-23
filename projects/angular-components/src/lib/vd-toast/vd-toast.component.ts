//toast component
import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VdToastService } from './vd-toast.service';
import { Toast, ToastPosition } from './vd-toast.model';
import { VdIconButton } from '../vd-icon-button/vd-icon-button.component';
import { VdIcon } from '../vd-icon/vd-icon.component';
import { map } from 'rxjs/operators';

@Component({
  selector: 'vd-toast',
  standalone: true,
  imports: [CommonModule, VdIconButton, VdIcon],
  templateUrl: './vd-toast.component.html',
  styleUrls: ['./vd-toast.component.scss'],
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

  // 🔑 must be public for template access
  constructor(public toastService: VdToastService) {}

  ngOnInit() {
    // Configure toast service with component inputs if provided
    if (this.maxStack !== undefined) {
      this.toastService.configure({
        maxStack: this.maxStack,
      });
    }
  }

  get toastsByPosition$() {
    return this.toastService.toasts$.pipe(
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
        return 'vd-icon-tick-circle-filled';
      case 'error':
        return 'vd-icon-error-filled';
      case 'warning':
        return 'vd-icon-warning-filled';
      case 'info':
        return 'vd-icon-info-circle-filled';
      default:
        return '';
    }
  }
}
