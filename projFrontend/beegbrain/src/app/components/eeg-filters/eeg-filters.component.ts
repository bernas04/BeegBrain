import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-eeg-filters',
  templateUrl: './eeg-filters.component.html',
  styleUrls: ['./eeg-filters.component.css'],
  
})
export class EegFiltersComponent implements OnInit {
  token = ''+localStorage.getItem('token');
  
  idSearch = '';

  constructor() { }

  ngOnInit(): void {

  }




  @Output() searchIdEvent = new EventEmitter<any>();

  onKeyId(value: string) {
    this.idSearch += value + ' | ';
    console.log(this.idSearch)
    this.searchIdEvent.emit(value);
  }

  @Output() searchPriority = new EventEmitter<any>();

  selectPriority(value: string) {
    console.log(value)
    this.searchPriority.emit(value);
  }

  @Output() filterByDateEvent = new EventEmitter<any>();

  selectData(value: string){
    var myDate = new Date(value);
    console.log("tou na componente dos filtros")
    console.log(value)
    this.filterByDateEvent.emit(myDate)
  }
 


}
