import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Country } from '../common/country';
import { State } from '../common/state';

@Injectable({
  providedIn: 'root',
})
export class ShopFormService {
  private baseUrl = environment.baseUrl;

  constructor(private httpClient: HttpClient) {}

  getCountries(): Observable<Country[]> {
    const contriesUrl = `${this.baseUrl}/country/all`;
    return this.httpClient.get<Country[]>(contriesUrl);
  }

  getStates(): Observable<State[]> {
    const statesSearchUrl = `${this.baseUrl}/states/all`;

    return this.httpClient.get<State[]>(statesSearchUrl);
  }

  getCreditCardMonths(startMonth: number): Observable<number[]> {
    let data: number[] = [];

    for (let theMonth = startMonth; theMonth <= 12; theMonth++) {
      data.push(theMonth);
    }

    return of(data);
  }

  getCreditCardYears(): Observable<number[]> {
    let data: number[] = [];

    const startYear: number = new Date().getFullYear();
    const endYear: number = startYear + 10;

    for (let theYear = startYear; theYear <= endYear; theYear++) {
      data.push(theYear);
    }

    return of(data);
  }
}
