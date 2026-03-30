import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VdIconButton } from '../../vd-icon-button/vd-icon-button.component';

export interface DateRange {
  start: Date | null;
  end: Date | null;
}

@Component({
  selector: 'vd-range-date-inline',
  standalone: true,
  imports: [CommonModule, VdIconButton],
  templateUrl: './vd-range-date-inline.component.html',
  styleUrl: './vd-range-date-inline.component.scss',
})
export class VdRangeDateInline implements OnInit {
  @Input() value: DateRange | null = null;
  @Input() minDate?: Date;
  @Input() maxDate?: Date;
  @Input() disabled: boolean = false;

  @Output() valueChange = new EventEmitter<DateRange | null>();

  // Calendar View State
  currentMonth: Date = new Date();
  today: Date = new Date();

  // Calendar Data
  weekDays: string[] = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  months: string[] = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  calendarDays: Array<{
    date: Date;
    inMonth: boolean;
    isToday: boolean;
    isSelected: boolean;
    isRangeStart: boolean;
    isRangeEnd: boolean;
    isInRange: boolean;
    isDisabled: boolean;
  }> = [];

  nextMonthCalendarDays: Array<{
    isDisabled: boolean;
    date: Date;
    inMonth: boolean;
    isToday: boolean;
    isSelected: boolean;
    isRangeStart: boolean;
    isRangeEnd: boolean;
    isInRange: boolean;
  }> = [];

  ngOnInit() {
    this.resetCalendarView();
  }

  prevMonth(event?: Event) {
    event?.stopPropagation();
    this.currentMonth = new Date(
      this.currentMonth.getFullYear(),
      this.currentMonth.getMonth() - 1,
      1,
    );
    this.generateCalendar();
  }

  nextMonth(event?: Event) {
    event?.stopPropagation();
    this.currentMonth = new Date(
      this.currentMonth.getFullYear(),
      this.currentMonth.getMonth() + 1,
      1,
    );
    this.generateCalendar();
  }

  get currentMonthLabel(): string {
    return this.currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' });
  }

  get nextMonthLabel(): string {
    const nextMonth = new Date(
      this.currentMonth.getFullYear(),
      this.currentMonth.getMonth() + 1,
      1,
    );
    return nextMonth.toLocaleString('default', { month: 'long', year: 'numeric' });
  }

  generateCalendar() {
    this.calendarDays = this.generateMonthCalendar(
      this.currentMonth.getFullYear(),
      this.currentMonth.getMonth(),
    );

    const nextMonth = new Date(
      this.currentMonth.getFullYear(),
      this.currentMonth.getMonth() + 1,
      1,
    );
    this.nextMonthCalendarDays = this.generateMonthCalendar(
      nextMonth.getFullYear(),
      nextMonth.getMonth(),
    );
  }

  private generateMonthCalendar(
    year: number,
    month: number,
  ): Array<{
    isDisabled: boolean;
    date: Date;
    inMonth: boolean;
    isToday: boolean;
    isSelected: boolean;
    isRangeStart: boolean;
    isRangeEnd: boolean;
    isInRange: boolean;
  }> {
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const startDayOfWeek = firstDayOfMonth.getDay();

    const days: any[] = [];

    for (let i = startDayOfWeek - 1; i >= 0; i--) {
      const date = new Date(year, month, -i);
      days.push(this.createDayObject(date, false));
    }

    for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
      const date = new Date(year, month, i);
      days.push(this.createDayObject(date, true));
    }

    const remainingCells = 42 - days.length;
    for (let i = 1; i <= remainingCells; i++) {
      const date = new Date(year, month + 1, i);
      days.push(this.createDayObject(date, false));
    }

    return days;
  }

  createDayObject(date: Date, inMonth: boolean) {
    const isToday = this.isSameDay(date, this.today);
    let isSelected = false;
    let isRangeStart = false;
    let isRangeEnd = false;
    let isInRange = false;
    let isDisabled = false;

    const dateTime = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
    if (this.minDate) {
      const minTime = new Date(
        this.minDate.getFullYear(),
        this.minDate.getMonth(),
        this.minDate.getDate(),
      ).getTime();
      if (dateTime < minTime) {
        isDisabled = true;
      }
    }
    if (this.maxDate) {
      const maxTime = new Date(
        this.maxDate.getFullYear(),
        this.maxDate.getMonth(),
        this.maxDate.getDate(),
      ).getTime();
      if (dateTime > maxTime) {
        isDisabled = true;
      }
    }

    if (this.value && 'start' in this.value) {
      const range = this.value as DateRange;
      if (range.start) isRangeStart = this.isSameDay(date, range.start);
      if (range.end) isRangeEnd = this.isSameDay(date, range.end);

      isSelected = isRangeStart || isRangeEnd;

      if (range.start && range.end) {
        const time = date.getTime();
        isInRange = time > range.start.getTime() && time < range.end.getTime();
      }
    }

    return {
      date,
      inMonth,
      isToday,
      isSelected,
      isRangeStart,
      isRangeEnd,
      isInRange,
      isDisabled,
    };
  }

  onDateClick(dayObj: any, event: Event) {
    if (dayObj.isDisabled) {
      return;
    }

    const date = dayObj.date;
    event.stopPropagation();

    let range = (this.value as DateRange) || { start: null, end: null };

    if ((range.start && range.end) || !range.start) {
      range = { start: date, end: null };
    } else {
      if (date < range.start) {
        range = { start: date, end: null };
      } else {
        range = { start: range.start, end: date };
      }
    }

    this.value = range;
    this.valueChange.emit(this.value);
    this.generateCalendar();
  }

  isSameDay(d1: Date, d2: Date): boolean {
    if (!d1 || !d2) return false;
    return (
      d1.getDate() === d2.getDate() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getFullYear() === d2.getFullYear()
    );
  }

  resetCalendarView() {
    if (this.value?.start) {
      this.currentMonth = new Date(this.value.start);
    } else {
      this.currentMonth = new Date();
    }

    if (isNaN(this.currentMonth.getTime())) {
      this.currentMonth = new Date();
    }
    this.generateCalendar();
  }
}
