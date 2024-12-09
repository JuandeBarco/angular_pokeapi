import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { PokemonDetailsComponent } from '../pokemon-details/pokemon-details.component';

@Component({
  selector: 'app-pokemon-form',
  imports: [FormsModule, PokemonDetailsComponent, CommonModule],
  templateUrl: './pokemon-form.component.html',
  styleUrl: './pokemon-form.component.css'
})
export class PokemonFormComponent {
  pokemonName: string = '';
  pokemonData: any = null;
  errorMessage: string = '';
  loading: boolean = false;

  constructor(private http: HttpClient) {}

  searchPokemon() {
    console.log('Searching for: ' + this.pokemonName);
    this.errorMessage = '';
    this.loading = true;

    this.http.get('https://pokeapi.co/api/v2/pokemon/' + this.pokemonName).pipe(
      catchError((error) => {
        if (error.status === 404) {
          this.errorMessage = `Pokémon "${this.pokemonName}" no encontrado.`;
        } else {
          this.errorMessage = 'Ocurrió un error inesperado.';
        }
        this.loading = false;
        this.pokemonData = null; // Limpia los datos anteriores
        console.error('Error:', error);
        return of(null); // Devuelve un observable vacío para que el flujo continúe
      })
    ).subscribe(data => {
      if (data) {
        this.loading = false;
        this.pokemonData = data;
        this.errorMessage = ''; // Limpia el mensaje de error si todo salió bien
        console.log('Pokemon data: ', this.pokemonData);
      }
    });
  }
}