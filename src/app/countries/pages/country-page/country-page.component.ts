import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { CountriesService } from '../../services/countries.services';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html',
  styles: ``
})
export class CountryPageComponent implements OnInit {

public country?:Country;

constructor(private activatedRoute:ActivatedRoute,
            private countriesService:CountriesService,
            private router: Router
) {}

ngOnInit(): void {
  this.activatedRoute.params
    .pipe(
      switchMap(({varByUrl}) => this.countriesService.searchByAlphaCode(varByUrl))
    )
    .subscribe( country => { //Aqui estoy destructurando el paramsVar ['varByUrl'], es decir, es lo mismo
      if (!country) return this.router.navigateByUrl(''); //Aqu[i va el path declarado en mi routing module

      return this.country = country;


    });
}



}
