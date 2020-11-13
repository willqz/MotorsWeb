import { TestBed } from '@angular/core/testing';
import { WebmotorsService } from './webmotors.service';

describe('WebmotorsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WebmotorsService = TestBed.get(WebmotorsService);
    expect(service).toBeTruthy();
  });
});
