import { RevisionCenter } from './../../classes/RevisionCenter';
import { Institution } from './../../classes/Institution';
import { DoctorRevisionCenter } from './../../classes/DoctorRevisionCenter';
import { RegistrationService } from './../../services/registration.service';
import { Providence } from './../../classes/Providence';
import { Doctor } from './../../classes/Doctor';
import { Operator } from './../../classes/Operator';
import { Component, OnInit } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { subscribeOn } from 'rxjs';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  selectedItems: RevisionCenter[] = [];
  dropdownSettings: IDropdownSettings = {};
  dropdownList: String[] = [];
  listChosenRevisions: RevisionCenter[] = [];
  registerForm ! : FormGroup;
  error_name: Boolean = false;
  error_email: Boolean = false;
  error_password: Boolean = false;
  error_health_number: Boolean = false;
  error_birthday: Boolean = false;
  error_gender: Boolean = false;
  error_telephone: Boolean = false;
  error_address: Boolean = false;
  error_profession: Boolean = false;
  error_medicalNumber: Boolean = false;
  error_institutions: Boolean = false;

  constructor(private fb: FormBuilder, private service: RegistrationService, private router : Router) { 

    this.registerForm = this.fb.group({
      name: [null],
      email: [null],
      password:[null],
      health_number: [null],
      birthday:[null],
      gender: [null],
      telephone:[null],
      address: [null],
      profession: [null],
      medicalNumber:[null],
      institutions:[null]
    });

  }

  public listProvidences: Providence[] = []
  public listRevisions: RevisionCenter[] = []
  public listRevName: String[] = []
  public revisionCenter!: RevisionCenter

  ngOnInit(): void {
    this.getProvidence()
    this.getDoctorRevisionCenter()
    this.getListRevisionCenter()
    this.dropdownList = this.listRevName;
  }

  revision() {

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
    console.log(this.selectedItems)
  }

  submit(): void{
    this.error_name = false
    this.error_email = false;
    this.error_password = false;
    this.error_health_number = false;
    this.error_birthday = false;
    this.error_gender = false;
    this.error_telephone = false;
    this.error_address = false;
    this.error_profession = false;
    this.error_medicalNumber = false;
    this.error_institutions = false;

    let error = false;

    if (this.registerForm.value["name"] === null || this.registerForm.value["name"].trim() === "") {
      console.log("erro")
      error = true;
      this.error_name = true;
    }

    if (this.registerForm.value["email"] === null || this.registerForm.value["email"].trim() === "") {
      console.log("erro")
      error = true;
      this.error_email = true;
    }
    if (this.registerForm.value["password"] === null || this.registerForm.value["password"].trim() === "") {
      console.log("erro")
      error = true;
      this.error_password = true;
    }
    if (this.registerForm.value["health_number"] === null || this.registerForm.value["health_number"].trim() === "") {
      console.log("erro")
      error = true;
      this.error_health_number = true;
    }
    console.log(this.registerForm.value["health_number"])


    if (this.registerForm.value["gender"] === null) {
      console.log("erro")
      error = true;
      this.error_gender= true;
    }
    if (this.registerForm.value["birthday"] === null || this.registerForm.value["birthday"].trim() === "") {
      console.log("erro")
      error = true;
      this.error_birthday= true;
    }

    if (this.registerForm.value["telephone"] === null || this.registerForm.value["telephone"].trim() === "") {
      console.log("erro")
      error = true;
      this.error_telephone= true;
    }

    if (this.registerForm.value["address"] === null || this.registerForm.value["address"].trim() === "") {
      console.log("erro")
      error = true;
      this.error_address= true;
    }
    if (this.registerForm.value["profession"] === null || this.registerForm.value["profession"].trim() === "") {
      console.log("erro")
      error = true;
      this.error_profession= true;
    }
    if (this.registerForm.value["medicalNumber"] === null || this.registerForm.value["medicalNumber"].trim() === "") {
      console.log("erro")
      error = true;
      this.error_medicalNumber= true;
    }
    if (this.registerForm.value["institutions"] === null ) {
      console.log("erro")
      error = true;
      this.error_institutions= true;
    }


    if (!error){
      if (this.registerForm.value["profession"] == "doctor") {
        this.service.createDoctor(this.registerForm.value["name"],this.registerForm.value["email"],this.registerForm.value["password"],this.registerForm.value["birthday"],this.registerForm.value["gender"],this.registerForm.value["health_number"],this.registerForm.value["telephone"],this.registerForm.value["address"],this.registerForm.value["medicalNumber"], this.registerForm.value["institutions"]).
        subscribe({
          next: (data) => {

            let data_user_json = JSON.parse(JSON.stringify(data))

            console.log(data_user_json['id']);
  
            localStorage.setItem('token', data_user_json['token']);
            localStorage.setItem('id', data_user_json['id']);
            localStorage.setItem('type', data_user_json['type']);
            this.router.navigate(['/']);
            
          },
          error: () => {
            console.log("deu erro")
          }
        })
      }
      else{
        this.service.createOperator(this.registerForm.value["name"],this.registerForm.value["email"],this.registerForm.value["password"],this.registerForm.value["birthday"],this.registerForm.value["gender"],this.registerForm.value["health_number"],this.registerForm.value["telephone"],this.registerForm.value["address"],this.registerForm.value["medicalNumber"], this.registerForm.value["institutions"] ).
        subscribe({
          next: (data) => {

            let data_user_json = JSON.parse(JSON.stringify(data))

            localStorage.setItem('token', data_user_json['token']);
            localStorage.setItem('id', data_user_json['id']);
            localStorage.setItem('type', data_user_json['type']);
            this.router.navigate(['/']);
            
          },
          error: () => {
            console.log("deu erro")
          }
        })
      }
    }
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
    });
  }

  getListRevisionCenter() {
    //names of all revision centers
    for (var i = 0; i < this.listRevisions.length; i++) {
      this.listRevName.push(this.listRevisions[i]["name"]);
    }
    return this.listRevName
  }

  //geting the list of all the revision centers available
  getDoctorRevisionCenter() {
    this.service.getRevisionCenter().subscribe((info) => {
      this.listRevisions = info;
      this.getListRevisionCenter()

    });

  }

  getUserRevisionCenter(revision: String) {
    var result = this.listRevisions.filter(obj => {
      console.log(result)
      return obj.name === revision
    })
    return result
  }

  register() {

    console.log("Register")
    console.log(this.registerForm);

  //   this.showError = false

  //   this.service.createDoctor(this.registerForm.value["email"], this.registerForm.value["password"]).subscribe({
  //     next: (data) => {

  //       let data_json = JSON.parse(JSON.stringify(data));
  //       this.token = data_json.token;
  //       localStorage.setItem('token', this.token);
  //       localStorage.setItem('email', this.registerForm.value["email"]);

  //       this.loginService.getUserInfo(this.registerForm.value["email"], this.token).subscribe({
  //         next: (data_user) => {
  //           let data_user_json = JSON.parse(JSON.stringify(data_user));
  //           localStorage.setItem('id', data_user_json.id);
  //           this.router.navigate(['/dashboard']);
  //         },
  //         error: () => {
  //           this.registerForm.reset();
  //           this.showError = true
  //         }
  //       });

  //     },
  //     error: () => {
  //       this.showError = true
  //       this.registerForm.reset();
  //     }
  //   });

  // }
    
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

      /*   this.listRevisions.filter(this.selectedItems[0]["name"])
        
        this.selectedItems.push(result); */

      } 


      let doctor = new Doctor(health_number, email, pass, address, phone_number, bDate, gender, health_prof_number,this.selectedItems)
    
    }

    // if ((<HTMLInputElement>document.getElementById("operator")).checked) {

    //   let provName = (<HTMLInputElement>document.getElementById("providence")).value
    //   var result = this.listProvidences.filter(obj => {
    //     return obj.address === provName
    //   })
    //   let providence = result[0]
    //   let operator = new Operator(health_number, email, pass, address, phone_number, bDate, gender, health_prof_number, providence)
    // }
  }




