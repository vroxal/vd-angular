import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class VdDropdownService {
  private openDropdownId$ = new BehaviorSubject<string | null>(null);

  open(id: string) {
    this.openDropdownId$.next(id);
  }

  close(id: string) {
    if (this.openDropdownId$.value === id) {
      this.openDropdownId$.next(null);
    }
  }
  closeAll() {
    this.openDropdownId$.next(null);
  }
  changes() {
    return this.openDropdownId$.asObservable();
  }

  isOpen(id: string): boolean {
    return this.openDropdownId$.value === id;
  }
}
