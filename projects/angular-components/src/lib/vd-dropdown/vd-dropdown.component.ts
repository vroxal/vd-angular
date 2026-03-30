import {
  Component,
  Input,
  ViewChild,
  TemplateRef,
  ElementRef,
  ViewContainerRef,
  OnInit,
  OnDestroy,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { OVERLAY_POSITION_MAP } from '../shared/overlay-positions';
import { TemplatePortal } from '@angular/cdk/portal';
import { Subject, takeUntil } from 'rxjs';
import { VdDropdownService } from './vd-dropdown.service';
import { VD_DROPDOWN } from './vd-dropdown.token';

let vdDropdownId = 0;

@Component({
  selector: 'vd-dropdown',
  standalone: true,
  imports: [CommonModule],
  providers: [
    {
      provide: VD_DROPDOWN,
      useExisting: VdDropdown,
    },
  ],
  templateUrl: './vd-dropdown.component.html',
  styleUrl: './vd-dropdown.component.scss',
})
export class VdDropdown implements OnInit, OnDestroy, OnChanges {
  @Input() position:
    | 'bottom-left'
    | 'bottom-center'
    | 'bottom-right'
    | 'top-left'
    | 'top-center'
    | 'top-right'
    | 'left-start'
    | 'right-start' = 'bottom-left';

  @ViewChild('dropdownTemplate') dropdownTemplate!: TemplateRef<any>;
  @ViewChild('trigger', { read: ElementRef }) trigger!: ElementRef<HTMLElement>;

  private overlayRef?: OverlayRef;
  private destroy$ = new Subject<void>();
  private id = `vd-dropdown-${vdDropdownId++}`;

  constructor(
    private overlay: Overlay,
    private vcr: ViewContainerRef,
    private dropdownService: VdDropdownService,
  ) {}

  ngOnInit() {
    this.dropdownService
      .changes()
      .pipe(takeUntil(this.destroy$))
      .subscribe((openId) => {
        if (openId !== this.id) {
          this.close();
        }
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['position'] && !changes['position'].firstChange) {
      // Position has changed, dispose the old overlay so a new one will be created with the new position
      this.close();
      if (this.overlayRef) {
        this.overlayRef.dispose();
        this.overlayRef = undefined;
      }
    }
  }

  toggle() {
    this.overlayRef?.hasAttached() ? this.close() : this.open();
  }

  open() {
    if (this.overlayRef?.hasAttached()) return;

    if (!this.overlayRef || this.overlayRef.hostElement === null) {
      this.overlayRef = this.overlay.create({
        positionStrategy: this.overlay
          .position()
          .flexibleConnectedTo(this.trigger)
          .withPositions([OVERLAY_POSITION_MAP[this.position]])
          .withFlexibleDimensions(true)
          .withGrowAfterOpen(true)
          .withPush(false),
        scrollStrategy: this.overlay.scrollStrategies.reposition(),
        hasBackdrop: false,
      });

      this.overlayRef
        .outsidePointerEvents()
        .pipe(takeUntil(this.destroy$))
        .subscribe((event) => {
          // Don't close if clicking on the trigger element
          if (!this.trigger.nativeElement.contains(event.target as Node)) {
            this.close();
          }
        });
    }

    const portal = new TemplatePortal(this.dropdownTemplate, this.vcr);

    this.overlayRef.attach(portal);
    this.dropdownService.open(this.id);
  }

  close() {
    if (!this.overlayRef) return;

    this.overlayRef.detach();
    this.dropdownService.close(this.id);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    this.overlayRef?.dispose();
  }
}

