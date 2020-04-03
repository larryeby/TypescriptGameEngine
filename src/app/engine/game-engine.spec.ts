import { TestBed } from '@angular/core/testing';

import { GameEngineService } from './game-engine';

describe('RenderingService', () => {
  let service: GameEngineService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameEngineService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
