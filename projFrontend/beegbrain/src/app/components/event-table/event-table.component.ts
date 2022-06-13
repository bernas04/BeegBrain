import { Component, Input, OnInit } from '@angular/core';
import { uniqueDates } from 'igniteui-angular/lib/core/utils';
import { Doctor } from 'src/app/classes/Doctor';
import { Event } from 'src/app/classes/Event';
import { Operator } from 'src/app/classes/Operator';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-event-table',
  templateUrl: './event-table.component.html',
  styleUrls: ['./event-table.component.css']
})
export class EventTableComponent implements OnInit {

  @Input("lst_operators") lst_operators!: Operator[]
  @Input("lst_doctors") lst_doctors!: Doctor[]
  config: any;
  map = new Map<number, string>();

  constructor(private service: EventService) { 
  }

  events!: Event[];
  token = '' + localStorage.getItem('token');

  ngOnInit(): void {

    this.config = {
      itemsPerPage: 10,
      currentPage: 1,
      totalItems: 0
    };

    this.getAllEvents();
  }

  getAllEvents() {
    this.service.getAllEvents(this.token).subscribe(data => {
      this.events = data;
      this.events.reverse(); 

      this.events.forEach((e) => {
        let person : any = this.lst_doctors.find(x => x.id == +e.person )
        let name = "Doctor ";

        if (person == undefined) {
          person = this.lst_operators.find(x => x.id == +e.person );
          name = "Operator ";
        }

        name += person.name
        let id = +e.person

        this.map.set(id, name);
      })

      this.config = {
        itemsPerPage: 10,
        currentPage: 1,
        totalItems: this.events.length
      };

    });
  }


  pageChanged(event: any){
    this.config.currentPage = event;
  }

}

