import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pokemon-details-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pokemon.details.modal.component.html',
  styleUrls: ['./pokemon.details.modal.component.css']
})
export class PokemonDetailsModalComponent {
  @Input() pokemon: any;
  @Input() pokemonDetails: any;
  @Input() isModalOpen: boolean = false;
  @Output() closeModal = new EventEmitter<void>();

  onClose(): void {
    this.closeModal.emit();
  }

  onModalContentClick(event: Event): void {
    event.stopPropagation();
  }
}