import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientinfoComponent } from './patientinfo.component';

describe('PatientinfoComponent', () => {
  let component: PatientinfoComponent;
  let fixture: ComponentFixture<PatientinfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientinfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
