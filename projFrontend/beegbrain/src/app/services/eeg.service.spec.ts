import { TestBed } from '@angular/core/testing';

<<<<<<< HEAD
import { EegService } from './eeg.service';

describe('EegService', () => {
  let service: EegService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EegService);
=======
import { EEGService } from './eeg.service';

describe('EEGService', () => {
  let service: EEGService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EEGService);
>>>>>>> 5f3293f14fb8f47ece118157eaaa49fda5a9964e
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
