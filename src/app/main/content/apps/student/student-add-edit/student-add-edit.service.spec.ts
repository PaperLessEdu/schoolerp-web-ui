import { TestBed, inject } from '@angular/core/testing';

import { StudentAddEditService } from './student-add-edit.service';

describe('StudentAddEditService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StudentAddEditService]
    });
  });

  it('should be created', inject([StudentAddEditService], (service: StudentAddEditService) => {
    expect(service).toBeTruthy();
  }));
});
