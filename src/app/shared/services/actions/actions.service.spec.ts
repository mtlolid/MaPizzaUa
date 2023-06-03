import { TestBed } from '@angular/core/testing';

import { ActionsService } from './actions.service';
import { Firestore } from '@angular/fire/firestore';

describe('ActionsService', () => {
  let service: ActionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: Firestore, useValue: {}}
      ]
    });
    service = TestBed.inject(ActionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
