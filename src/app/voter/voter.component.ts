import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-voter',
  templateUrl: './voter.component.html',
  styleUrls: ['./voter.component.css']
})
export class VoterComponent implements OnInit {

  @Input() name = '';
  @Output() voted = new EventEmitter();

  didVote = false;
  constructor() { }

  ngOnInit(): void {
  }

  vote(agreed : boolean){
    console.log("divVote : " + this.didVote + this.name);
    this.voted.emit(agreed);
    this.didVote = true;
  }

}
