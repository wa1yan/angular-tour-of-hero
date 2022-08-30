import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CountdownTimerComponent } from '../countdown-timer/countdown-timer.component';

@Component({
  selector: 'app-countdown-local-var-parent',
  templateUrl: './countdown-local-var-parent.component.html',
  styleUrls: ['./countdown-local-var-parent.component.css']
})
export class CountdownLocalVarParentComponent implements AfterViewInit {

  @ViewChild(CountdownTimerComponent)
  private timerComponet! : CountdownTimerComponent;

  seconds() {
    return 0;
  }
  constructor() { }

  ngAfterViewInit(): void {
      setInterval(()=> this.seconds = () => this.timerComponet.seconds,0);
  }

  start() {
    console.log('start');
    this.timerComponet.start();
  }

  stop() {
    console.log('stop');
    this.timerComponet.stop();
  }
}
