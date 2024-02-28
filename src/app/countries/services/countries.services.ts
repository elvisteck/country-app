import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, delay, map, of, tap } from 'rxjs';
import { Country } from '../interfaces/country';
import { CacheStore } from '../interfaces/cache-store.interface';
import { Region } from '../interfaces/region.type';

@Injectable({providedIn: 'root'})
export class CountriesService {

  private apiUrl:string = 'https://restcountries.com/v3.1';

  private optionsSearch:string[] = ['capital', 'name', 'region', 'alpha'];

  private saveToLocalStorage():void {
    localStorage.setItem('cacheStore', JSON.stringify(this.cacheStore));
  }

  private loadFromLocalStorage():void {
    if(!localStorage.getItem('cacheStore')) return;
    this.cacheStore = JSON.parse(localStorage.getItem('cacheStore')!);
  }


  public cacheStore: CacheStore = {
    byCapital: {term: '', countries:[]},
    byCountries: {term: '', countries:[]},
    byRegion:  {region: '', countries:[]}
  }


  constructor(private httpClient: HttpClient) {
    console.log('CountriesServices Init');
    this.loadFromLocalStorage();

  }

  public searchByAlphaCode(term:string):Observable<Country | null> {
    const url:string = `${this.apiUrl}/${this.optionsSearch[3]}/${term}`;

    return this.httpClient.get<Country[]>(url)
    .pipe(
      map(countries => countries.length > 0 ? countries[0]:null),
      catchError(() => of(null))
    );
  }

  public searchByCapital(term:string):Observable<Country[]> {
    return this.search(term, this.optionsSearch[0])
      .pipe(
        tap(countries => this.cacheStore.byCapital = {
          term:term,
          countries:countries
        }),
        tap(() => this.saveToLocalStorage())
      );
  }


  public searchByCountry(term:string):Observable<Country[]> {
    return this.search(term, this.optionsSearch[1])
    .pipe(
      tap(countries => this.cacheStore.byCountries = {
        term:term,
        countries:countries
      }),
      tap(() => this.saveToLocalStorage())
    );
  }


  public searchByRegion(term:Region):Observable<Country[]> {
    return this.search(term, this.optionsSearch[2])
      .pipe(
        tap(countries => this.cacheStore.byRegion = {
          region:term,
          countries:countries
        }),
        tap(() => this.saveToLocalStorage())
      );
  }


  private search(term:string, option:string):Observable<Country[]>{
    const url:string = `${this.apiUrl}/${option}/${term}`;
    return this.httpClient.get<Country[]>(url)
      .pipe(
        catchError(() => of([]))
      );
  }

}
