import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VdIcon } from './vd-icon.component';

describe('VdIcon', () => {
  let component: VdIcon;
  let fixture: ComponentFixture<VdIcon>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VdIcon],
    }).compileComponents();

    fixture = TestBed.createComponent(VdIcon);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
