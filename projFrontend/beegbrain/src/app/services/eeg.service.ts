import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EEG } from '../classes/EEG';
import '../../assets/js/smtp.js'; 
import { Annotation } from '../classes/Annotation';
import { Patient } from '../classes/Patient';
import { Report } from '../classes/Report';

declare let Email : any;


@Injectable({
  providedIn: 'root'
})
export class EEGService {
  
  // http://20.214.248.142:8000
  private BASE_URL = 'http://localhost:8000/api/';

  constructor(private http: HttpClient) { }

  submitEEG(formData : FormData, token: string) : Observable<EEG> {
    return this.http.post<EEG>(this.BASE_URL + 'createEEG', formData, { 
      headers: new HttpHeaders({
        'Authorization': 'Token ' + token
      }),
    });
  }

  getEEGinfo(id:number, token: string) : Observable<EEG>{
    return this.http.get<EEG>(this.BASE_URL+'eeg?id='+id,{ 
      headers: new HttpHeaders({
        'Authorization': 'Token ' + token,
        'Content-Type': 'application/json',
      }),
    });
  }

  getEEGlength(id:number, token: string) : Observable<Number>{
    return this.http.get<Number>(this.BASE_URL+'eegLength?id='+id,{ 
      headers: new HttpHeaders({
        'Authorization': 'Token ' + token,
        'Content-Type': 'application/json',
      }),
    });
  }

  sendEmail(content: string) {
      var our_email= "beeg.br4in@gmail.com";
      var text = content;
      Email.send({
          Host: "smtp.gmail.com",
          Username : our_email,
          Password : "beeg.brain2021",
          To : 'joaoreis16@ua.pt', /* 'joaobernardo0@ua.pt, joaoreis16@ua.pt, marianarosa@ua.pt, ricardorodriguez@ua.pt' */
          From : our_email,
          Subject : "Dúvida BeegBrain!",
          Body : text,
      })
  }

  getAnotations(id: number, token: string) : Observable<Annotation[]>{
    return this.http.get<Annotation[]>(this.BASE_URL+'eegAnnotations?id='+id,{ 
      headers: new HttpHeaders({
        'Authorization': 'Token ' + token,
        'Content-Type': 'application/json',
      }),
    });
  }

  getReportbyID(id: number, token: string) : Observable<Report> {
    return this.http.get<Report>(this.BASE_URL+'report?id='+id, { 
      headers: new HttpHeaders({
        'Authorization': 'Token ' + token,
        'Content-Type': 'application/json',
      }),
    });

  }

  getPatientbyID(id: number, token: string) : Observable<Patient>{
    console.log(">> PEDIDO À API -  paciente ", id)
    return this.http.get<Patient>(this.BASE_URL+'patient/'+id,{ 
      headers: new HttpHeaders({
        'Authorization': 'Token ' + token,
        'Content-Type': 'application/json',
      }),
    });
  }

}
