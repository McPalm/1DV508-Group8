import { TestBed, inject } from '@angular/core/testing';

import { AdressService } from './adress.service';

describe('AdressService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdressService]
    });
  });

  it('should be created', inject([AdressService], (service: AdressService) => {
    expect(service).toBeTruthy();
  }));
});
