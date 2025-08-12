import { Component, inject } from '@angular/core';
import { PokemonsListService } from '../../services/pokemons.list/pokemons.list.service';
import { switchMap, catchError } from 'rxjs/operators';
import { of, forkJoin } from 'rxjs';

@Component({
  selector: 'app-pokemons.page',
  standalone: true,
  imports: [],
  templateUrl: './pokemons.page.component.html',
  styleUrl: './pokemons.page.component.css'
})
export class PokemonsPageComponent {
  public pokemons: any[] = [];
  public isLoading = true;
  public hasError = false;

  private pokemonsListService = inject(PokemonsListService);

  constructor() {
    this.fetchPokemons();
  }

  fetchPokemons(): void {

    this.pokemonsListService.listPokemons().pipe(
      switchMap(response => {
        const detailRequests = response.results.map((pokemon: any) =>
          this.pokemonsListService.getPokemonDetails(pokemon.url)
        );
        return forkJoin(detailRequests);
      }), 
      catchError(error => {
        console.error('Error al obtener los datos de Pokémon:', error);
        return of([]);
      })
    ).subscribe({
      next: (data: any) => {
        if (Array.isArray(data)) {
          this.pokemons = data.map((pokemon: any) => ({
            id: pokemon.id,
            name: pokemon.name,
            type : pokemon.types[0]?.type.name || 'Unknown',
            // Agregamos una lógica para priorizar la imagen oficial, y si no existe, usar el sprite frontal
            image: pokemon.sprites?.other?.['official-artwork']?.front_default || pokemon.sprites?.front_default || '',
          }));
          console.log(data);
        } else {
          console.error('Los datos recibidos no son un array:', data);
        }
      },
      error: (error) => {
        console.error('Error al cargar los Pokémon:', error);

      }
    });
  }
}
