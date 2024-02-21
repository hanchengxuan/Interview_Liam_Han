import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http: HttpClient) { }

  getTransactions(): Observable<any[]> {
    return this.http.get<any[]>('https://github.com/a-tremblay/grid-poc/blob/7b6d89205db11eccd0bbfc60775a9211946c6901/data/transactions.json');
  }

  getAccounts(): Observable<any[]> {
    return this.http.get<any[]>('https://github.com/a-tremblay/grid-poc/blob/7b6d89205db11eccd0bbfc60775a9211946c6901/data/accounts.json');
  }
}
