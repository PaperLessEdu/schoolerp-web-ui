import { TestBed, inject } from '@angular/core/testing';

import { StudentListService } from './student-list.service';

describe('StudentListService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StudentListService]
    });
  });

  it('should be created', inject([StudentListService], (service: StudentListService) => {
    expect(service).toBeTruthy();
  }));
});
