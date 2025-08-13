import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonsListService {

  private apiUrl = 'https://pokeapi.co/api/v2/';

  constructor(private http: HttpClient) { }

  listPokemons(limit:number): Observable<any> {
    // Aumentamos el límite para obtener más Pokémon
    return this.http.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`);
  }

  getPokemonDetails(url: string): Observable<any> {
    return this.http.get(url);
  }

  // Nuevo método para obtener detalles de la especie del Pokémon
  getPokemonSpecies(url: string): Observable<any> {
    return this.http.get(url);
  }
}
