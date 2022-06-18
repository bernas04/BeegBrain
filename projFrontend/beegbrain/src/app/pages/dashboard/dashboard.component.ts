import { Component, OnInit } from '@angular/core';
import { Doctor } from 'src/app/classes/Doctor';
import { EEG } from 'src/app/classes/EEG';
import { Event } from 'src/app/classes/Event';
import { Operator } from 'src/app/classes/Operator';
import { Report } from 'src/app/classes/Report';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  token = '' + localStorage.getItem('token');
  type = '' + localStorage.getItem('type');
  id = '' + localStorage.getItem('id');

  lst_doctors: Doctor[]= [];
  lst_operators: Operator[] = [];
  eegs: EEG[] = []; 
  events: Event[] = [];
  reports: Report[] = [];

  constructor(private service: EventService) { }

  ngOnInit(): void {
    this.getPersons();
    this.getAllEegs();
    this.getEvents();
    this.getAllReports();
  }

  getPersons() {
    this.service.getDoctor(this.token).subscribe((info) => {
      this.lst_doctors = info;
    });

    this.service.getOperator(this.token).subscribe((info) => {
      this.lst_operators = info;
    });
  }

  getAllEegs() {
    this.service.getAllEegs(this.id, this.type, this.token).subscribe((info) => {
      this.eegs = info;
    });
  }

  getEvents() {
    this.service.getAllEvents(this.token).subscribe((info) => {
      this.events = info;
    });
  }

  getAllReports() {
    this.service.getAllReport(this.token).subscribe((info) => {
      this.reports = info;
    });
  }

}
