import { Component, Input, OnInit } from '@angular/core';
import { Operator } from 'src/app/classes/Operator';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor() { }
  type!: string
  health_number!: string
  address!: string
  birthday!:string
  gender!:string
  telephone!: string
  workerNumber!:string
  name!: string
  email!:string
  isOperator!:boolean
  nameInstitution!:string
  
  ngOnInit(): void {
    this.type = <string>localStorage.getItem('type');
    this.email = <string>localStorage.getItem('email');
    this.health_number=<string>localStorage.getItem('health_number');
    this.address=<string>localStorage.getItem('address');
    this.birthday=<string>localStorage.getItem('birthday');
    this.gender=<string>localStorage.getItem('gender');
    this.name=<string>localStorage.getItem('name');
    this.telephone=<string>localStorage.getItem('telephone');

    if (this.type==="operator"){
      this.workerNumber=<string>localStorage.getItem('operator_number');
      this.nameInstitution=<string> localStorage.getItem('providenceName')
      this.isOperator=true;
    }
    else{
      this.workerNumber=<string>localStorage.getItem('medical_number');
    }
  }

}
