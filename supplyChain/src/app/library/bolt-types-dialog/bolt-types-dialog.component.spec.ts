import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoltTypesDialogComponent } from './bolt-types-dialog.component';

describe('BoltTypesDialogComponent', () => {
  let component: BoltTypesDialogComponent;
  let fixture: ComponentFixture<BoltTypesDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoltTypesDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoltTypesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
