import { TestBed, inject } from '@angular/core/testing';

import { ExaminationListService } from './examination-list.service';

describe('ExaminationListService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ExaminationListService]
    });
  });

  it('should be created', inject([ExaminationListService], (service: ExaminationListService) => {
    expect(service).toBeTruthy();
  }));
});
