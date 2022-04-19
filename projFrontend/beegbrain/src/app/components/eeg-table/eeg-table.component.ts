import { Component, OnInit } from '@angular/core';
import { Product, TopSelling } from './top-selling-data';

@Component({
  selector: 'app-eeg-table',
  templateUrl: './eeg-table.component.html',
  styleUrls: ['./eeg-table.component.css']
})
export class EegTableComponent implements OnInit {

  topSelling: Product[];

  constructor() { 

    this.topSelling=TopSelling;
  }

  ngOnInit(): void {
  }

}
