import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vote-taker',
  templateUrl: './vote-taker.component.html',
  styleUrls: ['./vote-taker.component.css']
})
export class VoteTakerComponent implements OnInit {

  agreed = 0;
  disagreed = 0;

  voters = ['William','David','White'];

  constructor() { }

  ngOnInit(): void {
  }

  onVoted(agree : boolean){
    if(agree){
      this.agreed++;
    } else {
      this.disagreed++;
    }
  }


}
