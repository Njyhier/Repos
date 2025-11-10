import { TestBed } from '@angular/core/testing';

import { Repos } from './repos';

describe('Repos', () => {
  let service: Repos;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Repos);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
