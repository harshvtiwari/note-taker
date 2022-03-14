import { TestBed } from '@angular/core/testing';

import { NotesdataService } from './notesdata.service';

describe('NotesdataService', () => {
  let service: NotesdataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotesdataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
