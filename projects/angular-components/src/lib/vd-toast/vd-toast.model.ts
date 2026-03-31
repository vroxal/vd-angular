//model
export type ToastColor = 'success' | 'error' | 'warning' | 'info';
export type ToastPosition =
  | 'top-right'
  | 'top-left'
  | 'bottom-right'
  | 'bottom-left'
  | 'top-center'
  | 'bottom-center';

export interface Toast {
  id?: string;
  color: ToastColor;
  title?: string;
  description: string;
  icon?: string; // only for neutral & primary
  autoDismiss?: boolean; // default true
  // internal
  isLeaving?: boolean;
  timeoutId?: ReturnType<typeof setTimeout>;
  remainingTime?: number;
  startTime?: number;
  position?: ToastPosition; // internal use only
}
