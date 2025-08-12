import { TestBed } from '@angular/core/testing';

import { PokemonsListService } from './pokemons.list.service';

describe('PokemonsListService', () => {
  let service: PokemonsListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PokemonsListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
