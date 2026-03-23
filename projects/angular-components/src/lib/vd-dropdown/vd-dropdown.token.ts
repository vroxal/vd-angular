import { InjectionToken } from '@angular/core';

export interface VdDropdownControl {
  close(): void;
  id: string;
}

export const VD_DROPDOWN = new InjectionToken<VdDropdownControl>('VD_DROPDOWN');
