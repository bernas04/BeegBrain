import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Operator } from 'src/app/classes/Operator';
import { PersonService } from 'src/app/services/person.services';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public infoPerson!: Operator

  token = ''+localStorage.getItem('token');
  name = <string>localStorage.getItem('name');


  constructor(private router : Router, private personService: PersonService) { }

  ngOnInit(): void {
  }

  clearInfo(){
      localStorage.clear();
  }

}
