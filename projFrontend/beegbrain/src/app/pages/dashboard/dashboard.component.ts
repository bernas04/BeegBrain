import { Component, OnInit } from '@angular/core';
import { Doctor } from 'src/app/classes/Doctor';
import { Operator } from 'src/app/classes/Operator';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  token = '' + localStorage.getItem('token');
  lst_doctors: Doctor[]= [];
  lst_operators: Operator[] = [];

  constructor(private service: EventService) { }

  ngOnInit(): void {
    this.getPersons();
  }

  getPersons() {
    this.service.getDoctor(this.token).subscribe((info) => {
      this.lst_doctors = info;
    });

    this.service.getOperator(this.token).subscribe((info) => {
      this.lst_operators = info;
    });
  }

}
