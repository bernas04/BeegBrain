import { Component, Input, OnInit } from '@angular/core';
import { EEGService } from 'src/app/services/eeg.service';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  @Input() patientID! : string;
  @Input() operatorID! : string;
  @Input() priority! : string;
  files : File[] = [];
  token = ''+localStorage.getItem('token');
  type = ''+localStorage.getItem('type');
  id = ''+localStorage.getItem('id');
  health_number = ''+localStorage.getItem('health_number');

  public form!: FormGroup;

  constructor(private eegService: EEGService, private router: Router, private eventService: EventService) {

    if (this.token === null || this.type !== 'operator' ) {
      this.router.navigate(['/']);
    }

  }

  ngOnInit(): void {
  }

  getFiles(files : any[]) {
    this.files = files;
  }

  submitEEG() {

    console.log("Submitting EEG")
    console.log(this.id)
    console.log(this.patientID)

    const formData = new FormData();
    formData.append('operatorID', this.health_number);
    formData.append('patientID', this.patientID);
    formData.append('priority', this.priority);
    for (let file of this.files) {
      console.log(file.name)
      formData.append('file', file, file.name);
    }
    
    console.log(this.token)

    this.eegService.submitEEG(formData, this.token).subscribe({
      next: (eeg) => {
        console.log("FETCH SUCCESS")
        console.log(eeg);

        let json = { "type": "EEG uploaded", "person": this.id, "eeg_id": ''+eeg.id}
        let jsonObject = <JSON><unknown>json;
        this.eventService.addEvent(jsonObject, this.token).subscribe();

        this.router.navigate(['/workspace']);
      },
      error: (error) => {
        console.log(error);
      }
    });

    

  }
  
}
