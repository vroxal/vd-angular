import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VdIcon } from '../../vd-icon/vd-icon.component';
import { VdCheckbox } from '../../vd-checkbox/vd-checkbox.component';
import { VdRadioButton } from '../../vd-radio-button/vd-radio-button.component';

export type VdSelectionCardType = 'radio' | 'checkbox';

let vdSelectionCardItemId = 0;

@Component({
  selector: 'vd-selection-card-item',
  standalone: true,
  imports: [CommonModule, VdIcon, VdCheckbox, VdRadioButton],
  templateUrl: './vd-selection-card-item.component.html',
  styleUrl: './vd-selection-card-item.component.scss',
})
export class VdSelectionCardItem implements OnInit {
  @Input() title = '';
  @Input() description?: string;
  @Input() icon?: string;
  @Input() value: string | number = '';
  @Input() checked = false;
  @Input() disabled = false;
  @Input() type: VdSelectionCardType = 'checkbox';
  @Input() name?: string;
  @Input() ariaLabel?: string;

  @Output() select = new EventEmitter<string | number>();

  inputId = '';

  ngOnInit(): void {
    this.inputId = `vd-selection-card-item-${vdSelectionCardItemId++}`;
  }

  onCardClick(): void {
    if (this.disabled) {
      return;
    }

    if (this.type === 'radio') {
      if (!this.checked) {
        this.select.emit(this.value);
      }
    } else {
      this.select.emit(this.value);
    }
  }

  onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.onCardClick();
    }
  }
}
