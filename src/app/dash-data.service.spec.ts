import { TestBed, inject } from '@angular/core/testing';

import { DashDataService } from './dash-data.service';

describe('DashDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DashDataService]
    });
  });

  it('should be created', inject([DashDataService], (service: DashDataService) => {
    expect(service).toBeTruthy();
  }));
});
