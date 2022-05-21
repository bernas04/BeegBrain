import { Component, OnInit, Input} from '@angular/core';
import { EEG } from 'src/app/classes/EEG';
import { Product, TopSelling } from './top-selling-data';

@Component({
  selector: 'app-eeg-table',
  templateUrl: './eeg-table.component.html',
  styleUrls: ['./eeg-table.component.css']
})
export class EegTableComponent implements OnInit {

  topSelling: Product[];
  @Input('allEEG') lst_EEG!: EEG[];

  constructor() { 

    this.topSelling=TopSelling;
  }

  ngOnInit(): void {
  }

}
