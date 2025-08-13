import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importa CommonModule
import { PokemonsListService } from '../../services/pokemons.list/pokemons.list.service';
import { switchMap, catchError } from 'rxjs/operators';
import { of, forkJoin } from 'rxjs';

@Component({
  selector: 'app-pokemons.page',
  standalone: true,
  imports: [CommonModule], // Agrega CommonModule aquí
  templateUrl: './pokemons.page.component.html',
  styleUrl: './pokemons.page.component.css'
})
export class PokemonsPageComponent {
  public pokemons: any[] = [];
  public isLoading = true;
  public hasError = false;

  // Variables para la modal
  public isModalOpen = false;
  public selectedPokemon: any = null;
  public selectedPokemonDetails: any = null;

  public limit = 20;

  private pokemonsListService = inject(PokemonsListService);

  constructor() {
    this.fetchPokemons();
  }

  fetchPokemons(): void {
    this.isLoading = true;
    this.hasError = false;

    this.pokemonsListService.listPokemons(this.limit).pipe(
      switchMap(response => {
        const detailRequests = response.results.map((pokemon: any) =>
          this.pokemonsListService.getPokemonDetails(pokemon.url)
        );
        return forkJoin(detailRequests);
      }),
      catchError(error => {
        console.error('Error al obtener los datos de Pokémon:', error);
        this.hasError = true;
        this.isLoading = false;
        return of([]);
      })
    ).subscribe({
      next: (data: any) => {
        if (Array.isArray(data)) {
          this.pokemons = data.map((pokemon: any) => ({
            id: pokemon.id,
            name: pokemon.name,
            type : pokemon.types[0]?.type.name || 'Unknown',
            image: pokemon.sprites?.other?.['official-artwork']?.front_default || pokemon.sprites?.front_default || '',
            speciesUrl: pokemon.species.url, // Necesario para obtener detalles de la especie
            height: pokemon.height,
            weight: pokemon.weight,
          }));
          console.log(data);
        } else {
          console.error('Los datos recibidos no son un array:', data);
          this.hasError = true;
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error al cargar los Pokémon:', error);
        this.hasError = true;
        this.isLoading = false;
      }
    });
  }

  openModal(pokemon: any): void {
    this.selectedPokemon = pokemon;
    this.isLoading = true;
    this.isModalOpen = true;

    // Obtenemos los detalles de la especie
    this.pokemonsListService.getPokemonSpecies(pokemon.speciesUrl).subscribe({
      next: (speciesData: any) => {
        this.selectedPokemonDetails = {
          category: speciesData.genera.find((g: any) => g.language.name === 'en')?.genus || 'Unknown',
          gender: 'Male - Female', // Placeholder, ya que la API no da esta info de forma simple
          habitat: speciesData.habitat?.name || 'Unknown',
          color: speciesData.color?.name || 'Unknown',
          description: speciesData.flavor_text_entries.find((entry: any) => entry.language.name === 'en')?.flavor_text || 'No description available.',
          evolutionChainUrl: speciesData.evolution_chain.url
        };
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error al obtener los detalles de la especie:', error);
        this.hasError = true;
        this.isLoading = false;
      }
    });
  }

  // Método para cerrar la modal
  closeModal(): void {
    this.isModalOpen = false;
    this.selectedPokemon = null;
    this.selectedPokemonDetails = null;
  }
  
  
  // Nuevo método para cargar más Pokémon
  public showMorePokemons(): void {
    this.limit += 20;
    this.fetchPokemons();
  }

}  



