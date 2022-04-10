import { TestBed } from '@angular/core/testing';

import { EducationProgramTypeService } from './education-program-type.service';

describe('EducationProgramTypeService', () => {
  let service: EducationProgramTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EducationProgramTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
