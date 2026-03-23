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
import { Overlay, OverlayRef, ConnectedPosition } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { Subject, takeUntil } from 'rxjs';
import { VdDropdownService } from './vd-dropdown.service';
import { VD_DROPDOWN } from './vd-dropdown.token';

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
  styleUrls: ['./vd-dropdown.component.scss'],
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
  private id = Math.random().toString(36).slice(2);

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
          .withPositions([POSITION_MAP[this.position]])
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

const POSITION_MAP: Record<string, ConnectedPosition> = {
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
  'left-start': {
    originX: 'start',
    originY: 'top',
    overlayX: 'end',
    overlayY: 'top',
    offsetX: -8,
  },
  'right-start': {
    originX: 'end',
    originY: 'top',
    overlayX: 'start',
    overlayY: 'top',
    offsetX: 8,
  },
};
