import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChannelService {

  private BASE_URL = 'http://localhost:8000/api/';

  constructor(private http: HttpClient) { }

  getLabelsFromEEG(id: number, token: string) : Observable<String[]> {
      return this.http.get<String[]>(this.BASE_URL+'labels?eeg='+id,{ 
        headers: new HttpHeaders({
          'Authorization': 'Token ' + token,
          'Content-Type': 'application/json',
        }),
      });
  }

  getDataAboutLabel(eegId : any, channel: any, token: string, end: number, initial: number): Observable<Number[]>{
    console.log("[API] >> pedido para as labels: ", channel)
    let tmp='';

    for (var i of channel) {
      tmp+='&labels='+i
    }
    
    return this.http.get<Number[]>(this.BASE_URL+'channelsByLabels?eeg='+ eegId + tmp +"&start="+initial+"&end="+end,{ 
      headers: new HttpHeaders({
        'Authorization': 'Token ' + token,
        'Content-Type': 'application/json',
      }),
    })
  }
  
  
}
