import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EegFiltersComponent } from './eeg-filters.component';

describe('EegFiltersComponent', () => {
  let component: EegFiltersComponent;
  let fixture: ComponentFixture<EegFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EegFiltersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EegFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
