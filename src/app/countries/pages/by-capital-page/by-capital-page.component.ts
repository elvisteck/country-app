import { Component } from '@angular/core';
import { CountriesService } from '../../services/countries.services';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styles: ``
})
export class ByCapitalPageComponent {

  public countries:Country[] = [];

  constructor(private countriesService:CountriesService){

  }

  public searchByCapital(term:string):void {
    this.countriesService.searchByCapital(term)
      .subscribe( countriesResponse => this.countries = countriesResponse );

  }

}
