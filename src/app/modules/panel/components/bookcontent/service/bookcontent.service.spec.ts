import { TestBed } from '@angular/core/testing';

import { BookcontentService } from './bookcontent.service';

describe('BookcontentService', () => {
  let service: BookcontentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookcontentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
