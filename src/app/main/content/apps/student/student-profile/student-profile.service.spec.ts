import { TestBed, inject } from '@angular/core/testing';

import { StudentProfileService } from './student-profile.service';

describe('StudentProfileService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StudentProfileService]
    });
  });

  it('should be created', inject([StudentProfileService], (service: StudentProfileService) => {
    expect(service).toBeTruthy();
  }));
});
