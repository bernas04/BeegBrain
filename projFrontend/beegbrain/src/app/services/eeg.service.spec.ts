import { TestBed } from '@angular/core/testing';

import { EEGService } from './eeg.service';

describe('EEGService', () => {
  let service: EEGService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EEGService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
