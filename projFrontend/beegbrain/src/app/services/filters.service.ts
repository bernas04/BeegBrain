import { RevisionCenter } from './../classes/RevisionCenter';
import { Operator } from './../classes/Operator';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EEG } from '../classes/EEG';
import { Patient } from '../classes/Patient';

@Injectable({
  providedIn: 'root'
})

export class FiltersService {

  private BASE_URL = 'http://localhost:8000/api/';

  constructor(private http: HttpClient) { }


  getTheirPatients(token:string){
    let type = ''+localStorage.getItem('type');
    let id = ''+localStorage.getItem('id');

    return this.http.get<Patient[]>(this.BASE_URL+ 'filter/patients?' + 'id=' + id  + '&type=' + type ,{ 
      headers: new HttpHeaders({
        'Authorization': 'Token ' + token,
        'Content-Type': 'application/json',
      }),
    });
  }

  getEEgOperators(token:string){
    let type = ''+localStorage.getItem('type');
    let id = ''+localStorage.getItem('id');

    return this.http.get<Operator[]>(this.BASE_URL+ 'filter/operators?' + 'id=' + id  + '&type=' + type ,{ 
      headers: new HttpHeaders({
        'Authorization': 'Token ' + token,
        'Content-Type': 'application/json',
      }),
    });
  }

  getRevisionCentersByDoctor(id:string,token:string): Observable<RevisionCenter[]>{
    return this.http.get<RevisionCenter[]>(this.BASE_URL+ 'filter/revcenter?' + 'id=' + id ,{ 
      headers: new HttpHeaders({
        'Authorization': 'Token ' + token,
        'Content-Type': 'application/json',
      }),
    });
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
