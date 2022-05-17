import { Options } from '@angular-slider/ngx-slider';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-eeg',
  templateUrl: './eeg.component.html',
  styleUrls: ['./eeg.component.css']
})
export class EegComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  initial_speed: number = 1000;
  options: Options = {
    floor: 100,
    ceil: 5000,
    step: 100
  };

}
