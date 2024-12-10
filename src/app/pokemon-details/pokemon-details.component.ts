import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PokemonTypeComponent } from '../pokemon-type/pokemon-type.component';

@Component({
  selector: 'app-pokemon-details',
  imports: [CommonModule, PokemonTypeComponent],
  templateUrl: './pokemon-details.component.html',
  styleUrl: './pokemon-details.component.css'
})
export class PokemonDetailsComponent {
  @Input() pokemon: any = null;
}
