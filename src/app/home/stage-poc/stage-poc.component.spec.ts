import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StagePOCComponent } from './stage-poc.component';

describe('StagePOCComponent', () => {
  let component: StagePOCComponent;
  let fixture: ComponentFixture<StagePOCComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StagePOCComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StagePOCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
