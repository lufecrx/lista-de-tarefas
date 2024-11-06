import { TestBed } from '@angular/core/testing';

import { TarefasRestService } from './tarefas-rest-service';

describe('ActivitiesRestService', () => {
  let service: TarefasRestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TarefasRestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
