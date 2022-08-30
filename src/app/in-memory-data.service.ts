import { Injectable } from '@angular/core';
import { InMemoryDbService, RequestInfo } from 'angular-in-memory-web-api';
import { Observable } from 'rxjs';
import { Hero } from './hero';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  constructor() { }

  createDb(reqInfo?: RequestInfo | undefined): {} | Observable<{}> | Promise<{}> {
      const heroes : Hero[] = [
        {id: 12, name: 'Spider Man'},
        {id: 13, name: 'X Man'},
        {id: 14, name: 'Iron Man'},
        {id: 15, name: 'Iron Man'},
        {id: 16, name: 'Ant Man'},
      ];
      return {heroes};
  }
  genId(heroes : Hero[]) : number {
    return heroes.length > 0 ? Math.max(...heroes.map(hero => hero.id)) + 1 : 11;
  }
}
