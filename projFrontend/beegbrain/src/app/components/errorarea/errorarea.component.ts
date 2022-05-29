import { Component, Input, OnInit } from '@angular/core';
import { EEG } from 'src/app/classes/EEG';
import { Patient } from 'src/app/classes/Patient';

@Component({
  selector: 'app-errorarea',
  templateUrl: './errorarea.component.html',
  styleUrls: ['./errorarea.component.css']
})
export class ErrorareaComponent implements OnInit {

  @Input('allEEG') lst_EEG!: EEG[];
  @Input('allPatients') lst_Patients!: Patient[];

  constructor() { }

  ngOnInit(): void {
  }

}
