import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InteriorDialogComponent } from './interior-dialog.component';

describe('InteriorDialogComponent', () => {
  let component: InteriorDialogComponent;
  let fixture: ComponentFixture<InteriorDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InteriorDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InteriorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
