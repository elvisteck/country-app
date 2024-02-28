import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { Country } from '../interfaces/country';

@Injectable({providedIn: 'root'})
export class CountriesService {

  private apiUrl:string = 'https://restcountries.com/v3.1';

  private optionsSearch:string[] = ['capital', 'name', 'region'];

  constructor(private httpClient: HttpClient) { }

  public searchByCapital(term:string):Observable<Country[]> {
    return this.search(term, this.optionsSearch[0]);
  }


  public searchByCountry(term:string):Observable<Country[]> {
    return this.search(term, this.optionsSearch[1]);
  }


  public searchByRegion(term:string):Observable<Country[]> {
    return this.search(term, this.optionsSearch[2]);
  }


  private search(term:string, option:string){
    const url:string = `${this.apiUrl}/${option}/${term}`;
    return this.httpClient.get<Country[]>(url)
      .pipe(
        catchError(() => of([]))
      );
  }

}
