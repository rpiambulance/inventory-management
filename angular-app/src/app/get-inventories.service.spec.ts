import { TestBed } from '@angular/core/testing';

import { GetInventoriesService } from './get-inventories.service';

describe('GetInventoriesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetInventoriesService = TestBed.get(GetInventoriesService);
    expect(service).toBeTruthy();
  });
});
