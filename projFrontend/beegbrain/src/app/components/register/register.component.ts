import { Institution } from './../../classes/Institution';
import { DoctorRevisionCenter } from './../../classes/DoctorRevisionCenter';
import { RegistrationService } from './../../services/registration.service';
import { Providence } from './../../classes/Providence';
import { Doctor } from './../../classes/Doctor';
import { Operator } from './../../classes/Operator';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  dropdownList: Providence[] = [];
  selectedItems: Providence[] = [];
  token = ''+localStorage.getItem('token');

  constructor(private service: RegistrationService) { }

  public listProvidences: Providence[] = []
  public listRevisions: Institution[] = []

  ngOnInit(): void {
    this.getProvidence()
  }
  

  operator_check: boolean = false;
  doctor_check: boolean = false;


  update_operator() {
    this.operator_check = true;
    this.doctor_check = false;
  }

  update_doctor() {
    this.doctor_check = true;
    this.operator_check = false;

  }

  getProvidence() {
    this.service.getInstituitions(this.token).subscribe((info) => {
      this.listProvidences = info;
      
    });
  }
  getDoctorRevisionCenter() {
    this.service.getInstituitions(this.token).subscribe((info) => {
      this.listRevisions = info;
    });
  }


register() {
  let email = (<HTMLInputElement>document.getElementById("email")).value
  let pass = (<HTMLInputElement>document.getElementById("pass")).value
  let birthday = (<HTMLInputElement>document.getElementById("birthday")).value
  let bDate = new Date(birthday);

  let health_number = (<HTMLInputElement>document.getElementById("healthnumber")).value
  let address = (<HTMLInputElement>document.getElementById("address")).value
  let health_prof_number = (<HTMLInputElement>document.getElementById("healthprofnumber")).value
  let phone_number = (<HTMLInputElement>document.getElementById("phonenumber")).value

  let gender = ""

  if ((<HTMLInputElement>document.getElementById("male")).checked) {
    gender = "M"
  }
  if ((<HTMLInputElement>document.getElementById("female")).checked) {
    gender = "F"

  }
  if ((<HTMLInputElement>document.getElementById("other")).checked) {
    gender = "O"
  }

  let prof = ""



  if ((<HTMLInputElement>document.getElementById("doctor")).checked) {
    //let doctor = new Doctor(health_number, email, pass, address, phone_number, bDate, gender, health_prof_number)
    //console.log(doctor)
  }

  if ((<HTMLInputElement>document.getElementById("operator")).checked) {

    let provAddress = (<HTMLInputElement>document.getElementById("providence")).value
    var result = this.listProvidences.filter(obj => {
      return obj.address === provAddress
    })
    let providence = result[0]
    let operator = new Operator(health_number, email, pass, address, phone_number, bDate, gender, health_prof_number, providence)
  }
}

  

}
