import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  TemplateRef,
  ElementRef,
  ViewContainerRef,
  OnInit,
  OnChanges,
  SimpleChanges,
  OnDestroy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { OVERLAY_POSITION_MAP } from '../../shared/overlay-positions';
import { TemplatePortal } from '@angular/cdk/portal';
import { VdSingleDateInline } from '../vd-single-date-inline/vd-single-date-inline.component';
import {
  VdRangeDateInline,
  DateRange,
} from '../vd-range-date-inline/vd-range-date-inline.component';
import { VdTimePicker } from '../vd-time-picker/vd-time-picker.component';
import { VdInput } from '../../vd-input/vd-input.component';
import { VdDivider } from '../../vd-divider/vd-divider.component';

@Component({
  selector: 'vd-date-time-picker',
  standalone: true,
  imports: [
    CommonModule,
    VdSingleDateInline,
    VdRangeDateInline,
    VdTimePicker,
    VdInput,
    VdDivider,
  ],
  templateUrl: './vd-date-time-picker.component.html',
  styleUrl: './vd-date-time-picker.component.scss',
})
export class VdDateTimePicker implements OnInit, OnChanges, OnDestroy {
  // Mode Configuration
  @Input() mode: 'single' | 'range' = 'single';
  @Input() withTime: boolean = false;

  // Basic Inputs
  @Input() label?: string;
  @Input() hintText?: string;
  @Input() helperText?: string;
  @Input() optional?: boolean;
  @Input() placeholder: string = 'Select date';
  @Input() disabled: boolean = false;
  @Input() leadingIcon?: string;
  @Input() showMonthYearSelector: boolean = false;
  @Input() dropdownPosition:
    | 'bottom-left'
    | 'bottom-center'
    | 'bottom-right'
    | 'top-left'
    | 'top-center'
    | 'top-right' = 'bottom-left';
  @Input() minDate?: Date;
  @Input() maxDate?: Date;

  // Value
  @Input() value: Date | { start: Date | null; end: Date | null } | null = null;

  // State
  @Input() state: 'success' | 'error' | 'warning' | null = null;

  // Outputs
  @Output() valueChange = new EventEmitter<
    Date | { start: Date | null; end: Date | null } | null
  >();
  @Output() inputFocus = new EventEmitter<void>();
  @Output() inputBlur = new EventEmitter<void>();

  // Internal State
  isOpen = false;
  isFocused = false;
  @ViewChild('trigger', { read: ElementRef, static: true }) trigger!: ElementRef<HTMLElement>;
  @ViewChild('calendarPopupTemplate') calendarPopupTemplate!: TemplateRef<unknown>;
  private overlayRef?: OverlayRef;
  private readonly onAnyScroll = () => this.overlayRef?.updatePosition();

  // Time values
  timeValue: string = '';
  startTimeValue: string = '';
  endTimeValue: string = '';

  // Computed visual state (removes error while focused)
  get visualState(): 'success' | 'error' | 'warning' | null {
    if (this.state === 'error' && this.isFocused) return null;
    return this.state;
  }

  constructor(
    private overlay: Overlay,
    private viewContainerRef: ViewContainerRef,
  ) {}

  ngOnInit() {
    this.extractTimeFromValue();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['dropdownPosition'] && !changes['dropdownPosition'].firstChange) {
      this.overlayRef?.updatePositionStrategy(this.getPositionStrategy());
      this.overlayRef?.updatePosition();
    }
  }

  // Extract time from the value if it exists
  private extractTimeFromValue() {
    if (!this.value) {
      this.timeValue = '';
      this.startTimeValue = '';
      this.endTimeValue = '';
      return;
    }

    if (this.mode === 'single' && this.value instanceof Date) {
      this.timeValue = this.formatTime(this.value);
    } else if (this.mode === 'range') {
      const range = this.value as DateRange;
      if (range.start) {
        this.startTimeValue = this.formatTime(range.start);
      }
      if (range.end) {
        this.endTimeValue = this.formatTime(range.end);
      }
    }
  }

  // Format time as HH:MM
  private formatTime(date: Date): string {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }

  // Parse time string and apply to date
  private applyTimeToDate(date: Date | null, timeStr: string): Date | null {
    if (!date || !timeStr) return date;

    const parts = timeStr.split(':');
    if (parts.length !== 2) return date;

    const hours = parseInt(parts[0], 10);
    const minutes = parseInt(parts[1], 10);

    if (isNaN(hours) || isNaN(minutes)) return date;

    const result = new Date(date);
    result.setHours(hours, minutes, 0, 0);
    return result;
  }

  // Display value for input
  get displayValue(): string {
    if (!this.value) return '';

    if (this.mode === 'single') {
      const date = this.value as Date;
      if (!date) return '';

      const dateStr = this.formatDate(date);
      if (!this.withTime || !this.timeValue) return dateStr;
      return `${dateStr} ${this.timeValue}`;
    } else {
      const range = this.value as DateRange;
      if (!range.start && !range.end) return '';

      const startStr = range.start ? this.formatDate(range.start) : '';
      const endStr = range.end ? this.formatDate(range.end) : '';

      if (startStr && endStr) {
        if (this.withTime && (this.startTimeValue || this.endTimeValue)) {
          const startTime = this.startTimeValue || '00:00';
          const endTime = this.endTimeValue || '00:00';
          return `${startStr} ${startTime} - ${endStr} ${endTime}`;
        }
        return `${startStr} - ${endStr}`;
      }
      return startStr ? `${startStr} - ` : '';
    }
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

  // Toggle calendar
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

  // Handle date change from picker
  onDateChange(newDate: Date | DateRange | null) {
    this.value = newDate;
    this.emitValue();
  }

  // Handle time change
  onTimeChange(timeStr: string) {
    this.timeValue = timeStr;
    this.emitValue();
  }

  // Handle time commit (blur)
  onTimeCommit(timeStr: string) {
    this.timeValue = timeStr;
    this.emitValue();
  }

  // Handle start time change
  onStartTimeChange(timeStr: string) {
    this.startTimeValue = timeStr;
    this.emitValue();
  }

  // Handle start time commit
  onStartTimeCommit(timeStr: string) {
    this.startTimeValue = timeStr;
    this.emitValue();
  }

  // Handle end time change
  onEndTimeChange(timeStr: string) {
    this.endTimeValue = timeStr;
    this.emitValue();
  }

  // Handle end time commit
  onEndTimeCommit(timeStr: string) {
    this.endTimeValue = timeStr;
    this.emitValue();
  }

  // Emit combined value
  private emitValue() {
    if (this.mode === 'single') {
      const date = this.value as Date;
      const finalValue = this.withTime ? this.applyTimeToDate(date, this.timeValue) : date;
      this.valueChange.emit(finalValue);
    } else {
      const range = this.value as DateRange;
      if (this.withTime) {
        const startWithTime = range.start
          ? this.applyTimeToDate(range.start, this.startTimeValue)
          : null;
        const endWithTime = range.end ? this.applyTimeToDate(range.end, this.endTimeValue) : null;
        this.valueChange.emit({ start: startWithTime, end: endWithTime });
      } else {
        this.valueChange.emit(range);
      }
    }
  }

  // Helper getters for template binding
  get singleDateValue(): Date | null {
    return this.mode === 'single' ? (this.value as Date) : null;
  }

  get rangeDateValue(): DateRange | null {
    return this.mode === 'range' ? (this.value as DateRange) : null;
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

      this.overlayRef.outsidePointerEvents().subscribe((event) => {
        const target = event.target as Node | null;

        // Keep the panel open when interacting with the trigger itself.
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
      .withPositions([OVERLAY_POSITION_MAP[this.dropdownPosition]])
      .withFlexibleDimensions(false)
      .withGrowAfterOpen(true)
      .withPush(false);
  }

  private getOverlayOriginElement(): HTMLElement {
    return (
      this.trigger.nativeElement.querySelector('.vd-input__container') ??
      this.trigger.nativeElement
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

