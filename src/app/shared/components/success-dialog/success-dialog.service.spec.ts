import { TestBed } from '@angular/core/testing';

import { SuccessDialogService } from './success-dialog.service';

describe('SuccessDialogService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SuccessDialogService = TestBed.get(SuccessDialogService);
    expect(service).toBeTruthy();
  });
});
