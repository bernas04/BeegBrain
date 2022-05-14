import { Component, Input, OnInit } from '@angular/core';
import { EEGService } from 'src/app/services/eeg.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  @Input() patientID! : string;
  @Input() operatorID!: string;
  @Input() file! : File;
  

  constructor(private eegService: EEGService, private router: Router) { }

  ngOnInit(): void {
  }
  submitEEG() {
    console.log("Submitting EEG")
    console.log(this.patientID)
    this.eegService.submitEEG(this.patientID,this.operatorID,this.file).subscribe((eeg) => {
      this.router.navigate(['/eeg/' + eeg.id])
    });

    
  }
}
