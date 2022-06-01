import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Report } from '../classes/Report';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  private BASE_URL = 'http://localhost:8000/api/';

  constructor(private http: HttpClient) { }

  getReport(id:number) : Observable<Report>{
    return this.http.get<Report>(this.BASE_URL + 'report/'+id);
  }

  setReport(report : Report) {
    return this.http.post<any>(this.BASE_URL + 'report/'+report.id, report);
  }


}
