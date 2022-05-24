import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { EEG } from 'src/app/classes/EEG';
import { TableService } from 'src/app/services/table.service'

@Component({
  selector: 'app-eeg-table',
  templateUrl: './eeg-table.component.html',
  styleUrls: ['./eeg-table.component.css']
})
export class EegTableComponent implements OnInit {

  @Input('allEEG') lst_EEG!: EEG[];
  @Output() eeg_deleted = new EventEmitter<any>();
  private id! : number;


  constructor() { }

  ngOnInit(): void {
  }


  delete() {
    this.eeg_deleted.emit(this.id);
  }
  
  save2delete(id : number) {
    this.id = id;
  }

}
