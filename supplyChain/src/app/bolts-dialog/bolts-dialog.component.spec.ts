import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoltsDialogComponent } from './bolts-dialog.component';

describe('BoltsDialogComponent', () => {
  let component: BoltsDialogComponent;
  let fixture: ComponentFixture<BoltsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoltsDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoltsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
