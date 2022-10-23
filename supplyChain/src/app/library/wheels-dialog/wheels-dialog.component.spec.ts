import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WheelsDialogComponent } from './wheels-dialog.component';

describe('WheelsDialogComponent', () => {
  let component: WheelsDialogComponent;
  let fixture: ComponentFixture<WheelsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WheelsDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WheelsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
