import { Component, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-countdown-timer',
  templateUrl: './countdown-timer.component.html',
  styleUrls: ['./countdown-timer.component.css']
})
export class CountdownTimerComponent implements OnDestroy {

  intervalId = 0;
  message = '';
  seconds = 11;

  constructor() { }

  ngOnDestroy(): void {
      this.clearTime();
  }

  start() {
    this.CountDown();
  }

  stop() {
    this.clearTime();
    this.message = `Holding at T-${this.seconds} seconds`;
  }

  private clearTime() {
    clearInterval(this.intervalId);
  }

  private CountDown() {
    this.clearTime();
    this.intervalId = window.setInterval(()=>{
      this.seconds -= 1;
      if(this.seconds === 0 ){
        this.message = 'Blast off!';
      } else {
        if(this.seconds < 0 ) {
          this.seconds = 10; 
        }
        this.message = `T-${this.seconds} seconds are counting`;
      }

    },1000);
  }

}
