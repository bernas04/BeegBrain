import { RevisionCenter } from './../../classes/RevisionCenter';
import { Institution } from './../../classes/Institution';
import { DoctorRevisionCenter } from './../../classes/DoctorRevisionCenter';
import { RegistrationService } from './../../services/registration.service';
import { Providence } from './../../classes/Providence';
import { Doctor } from './../../classes/Doctor';
import { Operator } from './../../classes/Operator';
import { Component, OnInit } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  selectedItems: RevisionCenter[] = [];
  dropdownSettings: IDropdownSettings = {};
  dropdownList: String[] = [];


  constructor(private service: RegistrationService) { }

  public listProvidences: Providence[] = []
  public listRevisions: RevisionCenter[] = []

  ngOnInit(): void {
    this.getProvidence()
    this.getDoctorRevisionCenter()
    this.dropdownList = this.getDoctorRevisionCenter();

  }

  revision() {
    console.log(this.dropdownList)
    console.log("hahaa")
    console.log(this.listRevisions)
    this.selectedItems = []
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
  }

  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
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
    this.service.getInstituitions().subscribe((info) => {
      this.listProvidences = info;
      //this.dropdownList = info;

    });
  }
  getDoctorRevisionCenter() {
    this.service.getRevisionCenter().subscribe((info) => {
      this.listRevisions = info;
      //this.dropdownList = info;
      console.log(this.dropdownList)
  
      console.log(this.listRevisions[0]["name"])
      
    });

    var results = [];
    for (var i = 0; i < this.listRevisions.length; i++) {
        results.push(this.listRevisions[i]["name"]);
        console.log(results)
    }
    return results

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
