import { Component } from '@angular/core';
import { CountriesService } from '../../services/countries.services';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
  styles: ``
})
export class ByCountryPageComponent {

  public countries:Country[] = [];

  constructor(private countriesService:CountriesService) {

  }

  public searchByCountryName(term:string):void{
    this.countriesService.searchByCountry(term).subscribe(respCountries => this.countries = respCountries);
  }

}
