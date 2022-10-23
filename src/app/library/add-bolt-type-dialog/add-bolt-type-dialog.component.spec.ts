import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBoltTypeDialogComponent } from './add-bolt-type-dialog.component';

describe('AddBoltTypeDialogComponent', () => {
  let component: AddBoltTypeDialogComponent;
  let fixture: ComponentFixture<AddBoltTypeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddBoltTypeDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBoltTypeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
