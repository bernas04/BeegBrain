import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  token! : string;
  showError : boolean = false

  constructor(private fb: FormBuilder, private loginService: LoginService, private router : Router) { }

  contactForm !:FormGroup;

  ngOnInit(): void {

    this.contactForm = this.fb.group({
      email: [null],
      password:[null],
    });

  }

  public submit(): void{
    
    this.showError = false

    this.loginService.logIn(this.contactForm.value["email"], this.contactForm.value["password"]).subscribe({
      next: (data) => {

        let data_json = JSON.parse(JSON.stringify(data));
        this.token = data_json.token;

        localStorage.setItem('token', this.token);
        localStorage.setItem('email', this.contactForm.value["email"]);

        this.loginService.getUserInfo(this.contactForm.value["email"], this.token).subscribe({
          next: (data_user) => {
            let data_user_json = JSON.parse(JSON.stringify(data_user));
            localStorage.setItem('id', data_user_json.id);
            localStorage.setItem('type', data_user_json.type);
            localStorage.setItem('health_number', data_user_json.health_number);
            this.router.navigate(['/dashboard']);
          },
          error: () => {
            this.contactForm.reset();
            this.showError = true
          }
        });

      },
      error: () => {
        this.showError = true
        this.contactForm.reset();
      }
    });

  }

}
