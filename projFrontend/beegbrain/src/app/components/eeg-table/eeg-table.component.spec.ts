import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EegTableComponent } from './eeg-table.component';

describe('EegTableComponent', () => {
  let component: EegTableComponent;
  let fixture: ComponentFixture<EegTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EegTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EegTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
