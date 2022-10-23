import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectTypeDialogComponent } from './select-type-dialog.component';

describe('SelectTypeDialogComponent', () => {
  let component: SelectTypeDialogComponent;
  let fixture: ComponentFixture<SelectTypeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectTypeDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectTypeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
