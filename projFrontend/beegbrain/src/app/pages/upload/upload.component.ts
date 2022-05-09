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
  @Input() file! : File;

  //fileName = '';

  public form!: FormGroup;

  constructor(private formBuilder: FormBuilder, private eegService: EEGService, private router: Router, private http: HttpClient) { }

  ngOnInit(): void {

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
    formData.append('file', this.file);
    
    this.eegService.submitEEG(formData).subscribe((eeg) => {
      this.router.navigate(['/eeg/' + eeg.id])
    });

  }
  
}
