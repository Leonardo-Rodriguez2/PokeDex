import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonsListService {

  private apiUrl = 'https://pokeapi.co/api/v2/';

  constructor(private http: HttpClient) { }

  listPokemons(): Observable<any> {
    return this.http.get('https://pokeapi.co/api/v2/pokemon?limit=15');
  }

  getPokemonDetails(url: string): Observable<any> {
    return this.http.get(url);
  }
}
