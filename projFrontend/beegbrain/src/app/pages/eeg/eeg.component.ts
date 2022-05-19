import { Options } from '@angular-slider/ngx-slider';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-eeg',
  templateUrl: './eeg.component.html',
  styleUrls: ['./eeg.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EegComponent implements OnInit {

  constructor() { }
  
  ngOnInit(): void {
    
  }
  
  speed: number = 1000; // default: 1 segundo
  options: Options = {
    floor: 0,
    ceil: 1000,
    step: 50,         // de 0.05 em 0.05 segundos
    rightToLeft: true,
    translate: (value: number): string => {
      return value +' ms';
    },
  };
  
  window_size: number=1;
  
  
  getInputValue(event:any){
    this.window_size = event.target.value;

  }

  update() {
    console.log("new speed value: "+ this.speed)
  }

}
