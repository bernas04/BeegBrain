import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EEG } from '../classes/EEG';
import '../../assets/js/smtp.js'; 

declare let Email : any;


@Injectable({
  providedIn: 'root'
})
export class EEGService {

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

  getEEGfiltered(id:string, patient_id:string, institution_id:string, date:string, operator_id:string, priority:string, report_status:string, token: string) : Observable<EEG[]>{
    
    let type = ''+localStorage.getItem('type');
    let idprof = ''+localStorage.getItem('id');


    return this.http.get<EEG[]>(this.BASE_URL+ 'filter?' +'id='+id + '&patient_id=' + patient_id + '&institution_id=' + institution_id +'&date=' + date + '&operator_id=' + operator_id + '&priority=' + priority + '&report_status=' + report_status + '&type=' + type + '&idprof=' + idprof , { 
      headers: new HttpHeaders({
        'Authorization': 'Token ' + token,
        'Content-Type': 'application/json',
      }),
    });
  }

}
