import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  TemplateRef,
  ElementRef,
  ViewContainerRef,
  OnChanges,
  SimpleChanges,
  OnDestroy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Overlay, OverlayRef, ConnectedPosition } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { VdInput } from '../../vd-input/vd-input.component';
import {
  VdRangeDateInline,
  DateRange,
} from '../vd-range-date-inline/vd-range-date-inline.component';

// Re-export DateRange for backward compatibility
export type { DateRange } from '../vd-range-date-inline/vd-range-date-inline.component';

@Component({
  selector: 'vd-range-date-picker',
  standalone: true,
  imports: [CommonModule, VdInput, VdRangeDateInline],
  templateUrl: './vd-range-date-picker.component.html',
  styleUrls: ['./vd-range-date-picker.component.scss'],
})
export class VdRangeDatePicker implements OnChanges, OnDestroy {
  // Basic Inputs
  @Input() label?: string;
  @Input() hintText?: string;
  @Input() helperText?: string;
  @Input() optional?: boolean;
  @Input() placeholder: string = 'Select date range';
  @Input() disabled: boolean = false;
  @Input() leadingIcon?: string;
  @Input() dropdownPosition:
    | 'bottom-left'
    | 'bottom-center'
    | 'bottom-right'
    | 'top-left'
    | 'top-center'
    | 'top-right' = 'bottom-left';
  @Input() minDate?: Date;
  @Input() maxDate?: Date;

  // Value - DateRange
  @Input() value: DateRange | null = null;

  // State
  @Input() state: 'success' | 'error' | 'warning' | null = null;

  // Outputs
  @Output() valueChange = new EventEmitter<DateRange | null>();
  @Output() inputFocus = new EventEmitter<void>();
  @Output() inputBlur = new EventEmitter<void>();

  // Internal State
  isOpen = false;
  isFocused = false;
  @ViewChild('trigger', { read: ElementRef, static: true }) trigger!: ElementRef<HTMLElement>;
  @ViewChild('calendarPopupTemplate') calendarPopupTemplate!: TemplateRef<unknown>;
  private overlayRef?: OverlayRef;
  private readonly onAnyScroll = () => this.overlayRef?.updatePosition();

  // Computed visual state (removes error while focused)
  get visualState(): 'success' | 'error' | 'warning' | null {
    if (this.state === 'error' && this.isFocused) return null;
    return this.state;
  }

  constructor(
    private overlay: Overlay,
    private viewContainerRef: ViewContainerRef,
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['dropdownPosition'] && !changes['dropdownPosition'].firstChange) {
      this.overlayRef?.updatePositionStrategy(this.getPositionStrategy());
      this.overlayRef?.updatePosition();
    }
  }

  // Value Formatting
  get displayValue(): string {
    if (!this.value) return '';

    const range = this.value as DateRange;
    if (range.start && range.end) {
      return `${this.formatDate(range.start)} - ${this.formatDate(range.end)}`;
    } else if (range.start) {
      return `${this.formatDate(range.start)} - `;
    }
    return '';
  }

  private formatDate(date: Date): string {
    if (!date) return '';

    const dateObj = date instanceof Date ? date : new Date(date);
    if (isNaN(dateObj.getTime())) return '';

    const d = dateObj.getDate().toString().padStart(2, '0');
    const m = (dateObj.getMonth() + 1).toString().padStart(2, '0');
    const y = dateObj.getFullYear();

    return `${d}/${m}/${y}`;
  }

  // Focus Handling
  toggleCalendar() {
    if (this.disabled) return;

    if (this.isOpen) {
      this.closeCalendar();
      return;
    }

    this.openCalendar();
  }

  onInputFocus() {
    if (this.disabled) return;
    this.isFocused = true;
    this.inputFocus.emit();
    if (!this.isOpen) {
      this.openCalendar(false);
    }
  }

  onInputBlur() {
    if (!this.isOpen) {
      this.isFocused = false;
      this.inputBlur.emit();
    }
  }

  // Handle date selection from inline component
  onDateSelect(range: DateRange | null) {
    this.value = range;
    this.valueChange.emit(this.value);
    // Close only when both dates are selected
    if (range?.start && range?.end) {
      this.closeCalendar();
    }
  }

  ngOnDestroy() {
    this.stopScrollTracking();
    this.overlayRef?.dispose();
  }

  private openCalendar(emitFocus: boolean = true) {
    if (!this.trigger?.nativeElement) return;

    if (!this.overlayRef || this.overlayRef.hostElement === null) {
      this.overlayRef = this.overlay.create({
        positionStrategy: this.getPositionStrategy(),
        scrollStrategy: this.overlay.scrollStrategies.reposition(),
        hasBackdrop: false,
      });
      this.overlayRef.hostElement.style.zIndex = '999';

      this.overlayRef.outsidePointerEvents().subscribe((event) => {
        const target = event.target as Node | null;

        // Keep popup open when interacting with trigger
        if (target && this.trigger?.nativeElement.contains(target)) {
          return;
        }

        this.closeCalendar();
      });
    }

    if (!this.overlayRef.hasAttached()) {
      const portal = new TemplatePortal(this.calendarPopupTemplate, this.viewContainerRef);
      this.overlayRef.attach(portal);
    }

    this.isOpen = true;
    this.isFocused = true;
    if (emitFocus) {
      this.inputFocus.emit();
    }
    this.startScrollTracking();
    this.overlayRef.updatePosition();
  }

  private closeCalendar() {
    const wasOpen = this.isOpen;
    if (this.overlayRef?.hasAttached()) {
      this.overlayRef.detach();
    }
    this.isOpen = false;
    this.isFocused = false;
    this.stopScrollTracking();
    if (wasOpen) {
      this.inputBlur.emit();
    }
  }

  private getPositionStrategy() {
    return this.overlay
      .position()
      .flexibleConnectedTo(this.getOverlayOriginElement())
      .withPositions([POSITION_MAP[this.dropdownPosition]])
      .withFlexibleDimensions(false)
      .withGrowAfterOpen(true)
      .withPush(false);
  }

  private getOverlayOriginElement(): HTMLElement {
    return (
      this.trigger.nativeElement.querySelector('.vd-input__container') ?? this.trigger.nativeElement
    );
  }

  private startScrollTracking() {
    if (typeof window === 'undefined') return;
    window.addEventListener('scroll', this.onAnyScroll, true);
  }

  private stopScrollTracking() {
    if (typeof window === 'undefined') return;
    window.removeEventListener('scroll', this.onAnyScroll, true);
  }
}

const POSITION_MAP: Record<
  'bottom-left' | 'bottom-center' | 'bottom-right' | 'top-left' | 'top-center' | 'top-right',
  ConnectedPosition
> = {
  'bottom-left': {
    originX: 'start',
    originY: 'bottom',
    overlayX: 'start',
    overlayY: 'top',
    offsetY: 8,
  },
  'bottom-center': {
    originX: 'center',
    originY: 'bottom',
    overlayX: 'center',
    overlayY: 'top',
    offsetY: 8,
  },
  'bottom-right': {
    originX: 'end',
    originY: 'bottom',
    overlayX: 'end',
    overlayY: 'top',
    offsetY: 8,
  },
  'top-left': {
    originX: 'start',
    originY: 'top',
    overlayX: 'start',
    overlayY: 'bottom',
    offsetY: -8,
  },
  'top-center': {
    originX: 'center',
    originY: 'top',
    overlayX: 'center',
    overlayY: 'bottom',
    offsetY: -8,
  },
  'top-right': {
    originX: 'end',
    originY: 'top',
    overlayX: 'end',
    overlayY: 'bottom',
    offsetY: -8,
  },
};
