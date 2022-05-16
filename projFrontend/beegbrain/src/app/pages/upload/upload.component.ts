import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EEGService } from 'src/app/services/eeg.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  @Input() patientID! : string;
  @Input() operatorID! : string;
  file! : File;

  //fileName = '';

  public form!: FormGroup;

  constructor(private formBuilder: FormBuilder, private eegService: EEGService, private router: Router, private http: HttpClient) { }

  ngOnInit(): void {

  }

  onFileSelected(event: any) {
    this.file = event.target.files[0];
  }

  submitEEG() {

    console.log("Submitting EEG")
    console.log(this.file)
    console.log(this.file.name)
    console.log(this.file.size)
    console.log(this.file.type)
    console.log(this.operatorID)
    console.log(this.patientID)

    const formData = new FormData();
    formData.append('operatorID', this.operatorID);
    formData.append('patientID', this.patientID);
    formData.append('file', this.file, this.file.name);
    
    this.eegService.submitEEG(formData).subscribe({
      next: (eeg) => {
        console.log("FETCH SUCCESS")
        console.log(eeg);
        this.router.navigate(['/workspace/' + eeg.id]);
      },
      error: (error) => {
        console.log(error);
      }
    });

  }
  
}
