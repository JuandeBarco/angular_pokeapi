import { Component, Input, SimpleChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

  abilityDetails: any = null;
  abilityEffect: string = '';
  hiddenAbilityDetails: any = null;
  hiddenAbilityEffect: string = '';

  constructor(private http: HttpClient) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['pokemon'] && this.pokemon) {
      this.getAbilityInfo(this.pokemon.abilities[0].ability.url);
      if (this.pokemon.abilities.length > 1) {
        this.getHiddenAbilityInfo(this.pokemon.abilities[1].ability.url);
      } else {
        this.hiddenAbilityDetails = null;
        this.hiddenAbilityEffect = 'No hay información disponible.';
      }
    }
  }

  getAbilityInfo(url: string) : any {
    this.abilityDetails = null;
    this.abilityEffect = '';
    this.http.get(url).subscribe(data => {
      console.log('Ability data:', data);
      this.abilityDetails = data;

      if (this.abilityDetails.effect_entries.length > 0) {
        this.abilityEffect = this.abilityDetails.effect_entries.find((entry: any) => entry.language.name === 'en').effect;
      } else {
        this.abilityEffect = 'No hay información disponible.';
      }
    });
  }

  getHiddenAbilityInfo(url: string) : any {
    this.hiddenAbilityDetails = null;
    this.hiddenAbilityEffect = '';
    this.http.get(url).subscribe(data => {
      console.log('Hidden ability data:', data);
      this.hiddenAbilityDetails = data;

      if (this.hiddenAbilityDetails.effect_entries.length > 0) {
        this.hiddenAbilityEffect = this.hiddenAbilityDetails.effect_entries.find((entry: any) => entry.language.name === 'en').effect;
      } else {
        this.hiddenAbilityEffect = 'No hay información disponible.';
      }
    });
  }
}
