/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { Error.interceptor.tsService } from './error.interceptor.ts.service';

describe('Service: Error.interceptor.ts', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Error.interceptor.tsService]
    });
  });

  it('should ...', inject([Error.interceptor.tsService], (service: Error.interceptor.tsService) => {
    expect(service).toBeTruthy();
  }));
});
