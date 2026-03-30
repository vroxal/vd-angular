//toast-service
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Toast, ToastPosition } from './vd-toast.model';

let vdToastId = 0;

const AUTO_DISMISS_DURATION = 5000;
const EXIT_ANIMATION_DURATION = 300;
const DEFAULT_MAX_TOASTS = 5;
const DEFAULT_POSITION: ToastPosition = 'top-right';

export interface ToastConfig {
  placement?: ToastPosition;
  maxStack?: number;
}

@Injectable({ providedIn: 'root' })
export class VdToastService {
  private toasts: Toast[] = [];
  private queue: Toast[] = [];
  private subject = new BehaviorSubject<Toast[]>([]);
  toasts$ = this.subject.asObservable();
  private maxToasts = DEFAULT_MAX_TOASTS;
  private defaultPlacement: ToastPosition = DEFAULT_POSITION;

  /**
   * Configure global toast settings
   * @param config Configuration options for toasts
   */
  configure(config: ToastConfig) {
    if (config.placement) {
      this.defaultPlacement = config.placement;
    }
    if (config.maxStack !== undefined && config.maxStack > 0) {
      this.maxToasts = config.maxStack;
    }
  }

  /**
   * Set the maximum number of toasts that can be displayed at once
   * @param max Maximum number of toasts (default: 5)
   */
  setMaxToasts(max: number) {
    this.maxToasts = max > 0 ? max : DEFAULT_MAX_TOASTS;
  }

  show(toast: Toast) {
    // Determine defaults
    let autoDismiss = toast.autoDismiss ?? true;
    // Position is now configuration-only, always use defaultPlacement
    let position = this.defaultPlacement;

    const newToast: Toast = {
      ...toast,
      id: this.generateId(),
      autoDismiss,
      position,
      isLeaving: false,
      remainingTime: AUTO_DISMISS_DURATION,
    };

    // Check if we've reached the max limit
    if (this.toasts.length >= this.maxToasts) {
      // Add to queue
      this.queue.push(newToast);
    } else {
      // Add to active toasts
      this.toasts = [...this.toasts, newToast];
      this.emit();

      if (newToast.autoDismiss) {
        this.startTimer(newToast);
      }
    }
  }

  private startTimer(toast: Toast) {
    toast.startTime = Date.now();
    clearTimeout(toast.timeoutId);

    toast.timeoutId = setTimeout(() => {
      this.dismiss(toast.id!);
    }, toast.remainingTime ?? AUTO_DISMISS_DURATION);
  }

  pause(id: string) {
    const toast = this.toasts.find((t) => t.id === id);
    if (!toast || !toast.autoDismiss || toast.isLeaving) return;

    clearTimeout(toast.timeoutId);

    const elapsed = Date.now() - (toast.startTime ?? Date.now());
    toast.remainingTime = Math.max((toast.remainingTime ?? AUTO_DISMISS_DURATION) - elapsed, 0);
  }

  resume(id: string) {
    const toast = this.toasts.find((t) => t.id === id);
    if (!toast || !toast.autoDismiss || toast.isLeaving) return;

    this.startTimer(toast);
  }

  dismiss(id: string) {
    const index = this.toasts.findIndex((t) => t.id === id);
    if (index === -1) return;

    const toast = this.toasts[index];
    if (toast.isLeaving) return;

    clearTimeout(toast.timeoutId);

    // ✅ immutable update so Angular detects class change
    const leavingToast: Toast = { ...toast, isLeaving: true };
    this.toasts = [...this.toasts.slice(0, index), leavingToast, ...this.toasts.slice(index + 1)];
    this.emit();

    // remove after animation
    setTimeout(() => {
      this.toasts = this.toasts.filter((t) => t.id !== id);
      this.emit();

      // Process queue if there are pending toasts
      this.processQueue();
    }, EXIT_ANIMATION_DURATION);
  }

  private processQueue() {
    if (this.queue.length > 0 && this.toasts.length < this.maxToasts) {
      const nextToast = this.queue.shift();
      if (nextToast) {
        this.toasts = [...this.toasts, nextToast];
        this.emit();

        if (nextToast.autoDismiss) {
          this.startTimer(nextToast);
        }
      }
    }
  }

  private emit() {
    this.subject.next([...this.toasts]);
  }

  private generateId(): string {
    return `vd-toast-${vdToastId++}`;
  }
}
