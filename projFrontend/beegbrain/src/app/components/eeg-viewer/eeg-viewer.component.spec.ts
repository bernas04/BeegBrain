import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EEGViewerComponent } from './eeg-viewer.component';

describe('EegTableComponent', () => {
  let component: EEGViewerComponent;
  let fixture: ComponentFixture<EEGViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EEGViewerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EEGViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
