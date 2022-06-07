import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EEG } from '../classes/EEG';

@Injectable({
  providedIn: 'root'
})
export class WorkspaceService {
  getErrorEEGs() {
    throw new Error('Method not implemented.');
  }

  private BASE_URL = 'http://localhost:8000/api/';

  constructor(private http: HttpClient) { }

  getAllEEG(token : string, type : string, id : string) : Observable<EEG[]> {

    if (type === 'doctor') {

      return this.http.get<EEG[]>(this.BASE_URL + 'doctorSharedFolders?id=' + id , { 
        headers: new HttpHeaders({
          'Authorization': 'Token ' + token,
          'Content-Type': 'application/json',
        }),
      });

    } else {

      return this.http.get<EEG[]>(this.BASE_URL + 'operatorSharedFolders?id=' + id , { 
        headers: new HttpHeaders({
          'Authorization': 'Token ' + token,
          'Content-Type': 'application/json',
        }),
      });

    }
    
  }

  deleteEEG(id : number, token : string) {
    console.log("removing EEG<"+ id +">...")
    return this.http.delete<any>(this.BASE_URL + 'eeg?id='+id, { 
      headers: new HttpHeaders({
        'Authorization': 'Token ' + token,
        'Content-Type': 'application/json',
      })
    });
  }

}
