import { TestBed, inject } from '@angular/core/testing';

import { ScheduleExamService } from './schedule-exam.service';

describe('ScheduleExamService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ScheduleExamService]
    });
  });

  it('should be created', inject([ScheduleExamService], (service: ScheduleExamService) => {
    expect(service).toBeTruthy();
  }));
});
