import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EEGService } from 'src/app/services/eeg.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  @Input() patientID! : string;
  @Input() operatorID! : string;
  file! : File;

  fileName = '';

  public form!: FormGroup;

  constructor(private formBuilder: FormBuilder, private eegService: EEGService, private router: Router, private http: HttpClient) { }

  ngOnInit(): void {

  }


  submitEEG() {

    console.log("Submitting EEG")
    console.log(this.file)
    console.log(this.operatorID)
    console.log(this.patientID)

    /* const formData = new FormData();
    formData.append('operatorID', this.operatorID);
    formData.append('patientID', this.patientID);
    formData.append('file', this.form.get('profile')!.value); */

    /* this.eegService.submitEEG(formData).subscribe(
      (res) => {
        this.response = res;
        this.imageURL = `${this.DJANGO_SERVER}${res.file}`;
          console.log(res);
          console.log(this.imageURL);
      },
      (err) => {  
        console.log(err);
      }
    );

    
    const httpOptions : Object = {
      headers: new HttpHeaders({
        'Content-Type': 'multipart/form-data'
      }),
      responseType: 'Blob'
    }; */

    /* this.eegService.submitEEG(formData).subscribe((eeg) => {
      this.router.navigate(['/eeg/' + eeg.id])
    }); */

    if (this.file) {

      this.fileName = this.file.name;

      const formData = new FormData();

      formData.append('operatorID', this.operatorID);
      formData.append('patientID', this.patientID);
      formData.append("file", this.file, this.fileName);

      const upload$ = this.eegService.submitEEG(formData);

      upload$.subscribe();
  }
  }


  onFileSelected(event: any) {
    this.file = event.target.files[0];
  }

}
