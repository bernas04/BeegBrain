import { Component, OnInit } from '@angular/core';
import { Event } from 'src/app/classes/Event';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-event-table',
  templateUrl: './event-table.component.html',
  styleUrls: ['./event-table.component.css']
})
export class EventTableComponent implements OnInit {

  config: any;

  constructor(private service: EventService) { 
  }

  events! : Event[];
  token = '' + localStorage.getItem('token');

  ngOnInit(): void {
    this.getAllEvents();
  }

  getAllEvents() {
    this.service.getAllEvents(this.token).subscribe(data => {
      this.events = data;
      this.events.reverse(); 
      console.log(this.events)

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

