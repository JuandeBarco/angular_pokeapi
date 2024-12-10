import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pokemon-type',
  imports: [CommonModule],
  templateUrl: './pokemon-type.component.html',
  styleUrl: './pokemon-type.component.css'
})
export class PokemonTypeComponent {
  @Input() type: string = '';
  @Input() slot: number = 0;

  getTypeClass(): string {
    return `type-${this.type.toLowerCase()}`;
  }
}
