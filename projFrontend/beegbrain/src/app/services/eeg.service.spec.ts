import { TestBed } from '@angular/core/testing';

import { EegService } from './eeg.service';

describe('EegService', () => {
  let service: EegService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EegService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
