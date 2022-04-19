import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EegComponent } from './eeg.component';

describe('EegComponent', () => {
  let component: EegComponent;
  let fixture: ComponentFixture<EegComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EegComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
