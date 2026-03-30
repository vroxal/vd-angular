import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VdIcon } from '../../vd-icon/vd-icon.component';
import { VdIconButton } from '../../vd-icon-button/vd-icon-button.component';

@Component({
  selector: 'vd-single-date-inline',
  standalone: true,
  imports: [CommonModule, VdIcon, VdIconButton],
  templateUrl: './vd-single-date-inline.component.html',
  styleUrl: './vd-single-date-inline.component.scss',
})
export class VdSingleDateInline implements OnInit {
  @Input() value: Date | null = null;
  @Input() showMonthYearSelector: boolean = false;
  @Input() minDate?: Date;
  @Input() maxDate?: Date;
  @Input() disabled: boolean = false;

  @Output() valueChange = new EventEmitter<Date | null>();

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
  years: number[] = [];

  calendarDays: Array<{
    date: Date;
    inMonth: boolean;
    isToday: boolean;
    isSelected: boolean;
    isDisabled: boolean;
  }> = [];

  ngOnInit() {
    this.resetCalendarView();
    this.generateYearsArray();
  }

  generateYearsArray() {
    const currentYear = new Date().getFullYear();
    const startYear = currentYear - 100;
    const endYear = currentYear + 100;
    this.years = [];
    for (let year = startYear; year <= endYear; year++) {
      this.years.push(year);
    }
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

  onMonthChange(event: Event) {
    event.stopPropagation();
    const target = event.target as HTMLSelectElement;
    const monthIndex = parseInt(target.value, 10);
    this.currentMonth = new Date(this.currentMonth.getFullYear(), monthIndex, 1);
    this.generateCalendar();
  }

  onYearChange(event: Event) {
    event.stopPropagation();
    const target = event.target as HTMLSelectElement;
    const year = parseInt(target.value, 10);
    this.currentMonth = new Date(year, this.currentMonth.getMonth(), 1);
    this.generateCalendar();
  }

  get currentMonthLabel(): string {
    return this.currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' });
  }

  get selectedMonth(): number {
    return this.currentMonth.getMonth();
  }

  get selectedYear(): number {
    return this.currentMonth.getFullYear();
  }

  get selectedMonthValue(): string {
    return this.selectedMonth.toString();
  }

  get selectedYearValue(): string {
    return this.selectedYear.toString();
  }

  generateCalendar() {
    this.calendarDays = this.generateMonthCalendar(
      this.currentMonth.getFullYear(),
      this.currentMonth.getMonth(),
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
  }> {
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const startDayOfWeek = firstDayOfMonth.getDay();

    const days: any[] = [];

    // Add previous month's days
    for (let i = startDayOfWeek - 1; i >= 0; i--) {
      const date = new Date(year, month, -i);
      days.push(this.createDayObject(date, false));
    }

    // Add current month's days
    for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
      const date = new Date(year, month, i);
      days.push(this.createDayObject(date, true));
    }

    // Add next month's days to fill the grid (6 rows * 7 days = 42 cells)
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

    if (this.value instanceof Date) {
      isSelected = this.isSameDay(date, this.value);
    }

    return {
      date,
      inMonth,
      isToday,
      isSelected,
      isDisabled,
    };
  }

  onDateClick(dayObj: any, event: Event) {
    if (dayObj.isDisabled) {
      return;
    }

    event.stopPropagation();
    this.value = dayObj.date;
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
    if (this.showMonthYearSelector) {
      if (this.value instanceof Date) {
        this.currentMonth = new Date(this.value);
      } else {
        const now = new Date();
        this.currentMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      }

      if (isNaN(this.currentMonth.getTime())) {
        this.currentMonth = new Date();
      }
      this.generateCalendar();
      return;
    }

    if (this.value instanceof Date) {
      this.currentMonth = new Date(this.value);
    } else {
      this.currentMonth = new Date();
    }

    if (isNaN(this.currentMonth.getTime())) {
      this.currentMonth = new Date();
    }
    this.generateCalendar();
  }
}
