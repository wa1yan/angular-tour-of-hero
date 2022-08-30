import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HEROES } from '../mock-heroes';
import { HeroService } from '../hero.service';
import { filter, map, observable, range, tap, of, concatMap, take, interval, distinctUntilChanged, fromEvent, takeLast, skip } from 'rxjs';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  selectedHero?: Hero;

  heroes: Hero[] = [];

  constructor(private heroService: HeroService,
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.getHeroes();
    this.test();
  }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
    this.messageService.add(`HeorComponent : Selected hero id=${hero.id}`);
  }

  //test rxjs
  test(): void {
    range(1, 200).pipe(
      filter(x => x % 2 == 1),
      tap(x => {
        console.log('orginal : ' + x);
        if (x > 198) {
          throw new TypeError(`Values ${x} is so high`);
        }
      }),
      map(x => x + x),
    )
      .subscribe({ next: console.log, error: error => console.log(error.message) });

    // of(1, 2, 3).pipe(
    //   concatMap(n => interval(2000).pipe(
    //     take(Math.round(Math.random() * 10)),
    //     map(() => 'X'),
    //     tap({next:(x)=> console.log('next: ' + x), complete: () => console.log(`Done with ${ n }`) })
    //   ))
    // )
    //.subscribe(console.log);

    console.log("distinctUntilChanged():")
    of(1, 1, 2, 3, 1, 2, 2, 3, 4, 5, 6, 4, 5, 6).pipe(
      distinctUntilChanged()
    ).subscribe(console.log);
  }

  add(name: string) {
    if (!(name.trim())) {
      return;
    }
    this.heroService.addHero({ name } as Hero)
      .subscribe(hero => this.heroes.push(hero));
  }

  getHeroes() {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
  }

  getHero(id: number) {
    this.heroService.getHero(id)
      .subscribe();
  }

  delete(hero: Hero) {
    console.log('Delete hero ' + hero);
    this.heroes = this.heroes.filter(oldhero => oldhero.id != hero.id);//state change
    this.heroService.deleteHero(hero.id).subscribe();
  }
}