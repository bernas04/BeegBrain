import { Component, Input, OnInit } from '@angular/core';
import { EEGService } from 'src/app/services/eeg.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

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

  //fileName = '';

  public form!: FormGroup;

  constructor(private formBuilder: FormBuilder, private eegService: EEGService, private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
  }

  getFiles(files : any[]) {
    this.files = files;
  }

  submitEEG() {

    console.log("Submitting EEG")
    console.log(this.operatorID)
    console.log(this.patientID)

    const formData = new FormData();
    formData.append('operatorID', this.operatorID);
    formData.append('patientID', this.patientID);
    formData.append('priority', this.priority);
    for (let file of this.files) {
      console.log(file.name)
      formData.append('file', file, file.name);
    }
    
    this.eegService.submitEEG(formData).subscribe({
      next: (eeg) => {
        console.log("FETCH SUCCESS")
        console.log(eeg);
        this.router.navigate(['/workspace']);
      },
      error: (error) => {
        console.log(error);
      }
    });

  }
  
}
