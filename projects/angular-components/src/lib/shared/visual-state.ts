export type VisualState = 'success' | 'error' | 'warning' | null;

export function getTrailingStateIcon(state: VisualState): string | null {
  switch (state) {
    case 'success':
      return 'vd-icon-tick-circle-filled';
    case 'error':
      return 'vd-icon-error-filled';
    case 'warning':
      return 'vd-icon-warning-filled';
    default:
      return null;
  }
}
