import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { PokemonDetailsComponent } from '../pokemon-details/pokemon-details.component';

@Component({
  selector: 'app-pokemon-form',
  imports: [FormsModule, PokemonDetailsComponent],
  templateUrl: './pokemon-form.component.html',
  styleUrl: './pokemon-form.component.css'
})
export class PokemonFormComponent {
  pokemonName: string = '';
  pokemonData: any = null;

  constructor(private http: HttpClient) {}

  searchPokemon() {
    console.log('Searching for: ' + this.pokemonName);

    this.http.get('https://pokeapi.co/api/v2/pokemon/' + this.pokemonName).subscribe(data => {
      this.pokemonData = data;
      console.log('Pokemon data: ', this.pokemonData);
    });
  }
}