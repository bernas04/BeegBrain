import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EEGService } from 'src/app/services/eeg.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  @Input() patientID! : string;
  @Input() operatorID! : string;
  @Input() file! : File;

  constructor(private eegService: EEGService, private router: Router) { }

  ngOnInit(): void {

  }

  submitEEG() {
    console.log("Submitting EEG")
    console.log(this.file)
    console.log(this.operatorID)
    console.log(this.patientID)
    this.eegService.submitEEG(this.patientID,this.operatorID,this.file).subscribe((eeg) => {
      this.router.navigate(['/eeg/' + eeg.id])
    });
  }

}