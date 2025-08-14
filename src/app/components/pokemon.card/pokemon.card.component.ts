import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pokemon-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pokemon.card.component.html',
  styleUrls: ['./pokemon.card.component.css']
})
export class PokemonCardComponent {
  @Input() pokemons: any[] = [];
  // Usa @Output para emitir un evento
  @Output() cardClicked = new EventEmitter<any>();

  onCardClick(pokemon: any): void {
    // Cuando se hace clic, emite el evento con los datos del Pokémon
    this.cardClicked.emit(pokemon);
  }
}