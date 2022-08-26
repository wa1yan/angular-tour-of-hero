import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HEROES } from '../mock-heroes';
import { HeroService } from '../hero.service';
import { observable } from 'rxjs';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  selectedHero? : Hero;

  heroes : Hero[] = [];
  
  constructor(private heroService : HeroService,
      private messageService : MessageService) { }

  ngOnInit(): void {
     this.getHeroes();
  }

  onSelect(hero : Hero) : void {
    this.selectedHero = hero;
    this.messageService.add(`HeorComponent : Selected hero id=${hero.id}`);
  }

  add(name : string){
    if(!(name.trim())){
      return;
    }
    this.heroService.addHero({name} as Hero)
      .subscribe(hero => this.heroes.push(hero));
  }

  getHeroes() {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes  = heroes );
  }

  getHero(id : number) {
    this.heroService.getHero(id)
      .subscribe();
  }

  delete(hero : Hero) {
    console.log('Delete hero ' + hero);
    this.heroes = this.heroes.filter( oldhero => oldhero.id != hero.id);//state change
    this.heroService.deleteHero(hero.id).subscribe();
  }
}
