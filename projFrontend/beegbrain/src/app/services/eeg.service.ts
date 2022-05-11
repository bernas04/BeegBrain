import { HttpClient, HttpEventType, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EEGService {

  private BASE_URL = 'http://localhost:8000/api/';

  constructor(private http: HttpClient) { }

  submitEEG(formData : FormData) {

    return this.http.post<any>(this.BASE_URL + 'createEEG', formData, {
      reportProgress: true,
      observe: 'events'
    }).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        console.log('Upload progress: ' + (Math.round(event.loaded / event.total!) * 100 + "%"));
      } else if (event.type === HttpEventType.Response) {
        console.log(event);
      }
    });

  }

}