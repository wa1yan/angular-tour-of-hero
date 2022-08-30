import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Hero } from './hero';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  url = "/api/heroes";

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type ': 'application/json' })
  }

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.url)
      .pipe(
        tap(_ => this.log('Fetched Heroes')),
        catchError(this.handleError<Hero[]>('getHeroes', []))
      );
  }

  getHeroNo404<Data>(id: number): Observable<Hero> {
    const url = `${this.url}/?id=${id}`;
    return this.http.get<Hero[]>(url)
      .pipe(
        map(heroes => heroes[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? 'fetched' : 'did not find';
          this.log(`${outcome} hero id=${id}`);
        }),
        catchError(this.handleError<Hero>(`getHero id=${id}`))
      );
  }
  
  getHero(id: number): Observable<Hero> {
    const url = `${this.url}/${id}`;
    return this.http.get<Hero>(url)
      .pipe(
        tap(_ => this.log(`Fetched hero id=${id}`)),
        catchError(this.handleError<Hero>('getHero'))
      );
  }

  addHero(hero: Hero) {
    console.log(hero);
    return this.http.post<Hero>(this.url, hero, this.httpOptions)
      .pipe(
        tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
        catchError(this.handleError<Hero>('addHero'))

      );
  }

  deleteHero(id: number) {
    const deleteUrl = `${this.url}/${id}`;
    return this.http.delete<Hero>(deleteUrl, this.httpOptions)
      .pipe(
        tap(_ => this.log(`deleted hero id=${id}`)),
        catchError(this.handleError('deleteHero'))
      )
  }

  updateHero(hero: Hero) {
    return this.http.put(this.url, hero, this.httpOptions)
      .pipe(
        tap(_ => this.log(`updated hero id=${hero.id}`)),
        catchError(this.handleError<any>('updateHero'))
      );
  }

  searchHeroes(term: string): Observable<Hero[]> {
    console.log('saearch ' + term);
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<Hero[]>(`${this.url}/?name=${term}`)
      .pipe(
        tap(
          result => result.length ? this.log(`found hero matching ${term}`) : this.log(`no hero matching ${term}`)
        ),
        catchError(this.handleError('searchHeroes', []))
      );
  }

  private log(message: string) {
    this.messageService.add(message);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      this.log(`${operation} failed : ${error.message}`);
      return of(result as T);
    }
  }

}
