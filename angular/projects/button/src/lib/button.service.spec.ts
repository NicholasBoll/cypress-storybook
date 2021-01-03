import { TestBed } from '@angular/core/testing';

import { ButtonService } from './button.service';

describe('ButtonService', () => {
  let service: ButtonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ButtonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
