import { Component, OnInit } from '@angular/core';
import { EEG } from 'src/app/classes/EEG';
import { WorkspaceService } from 'src/app/services/workspace.service';

@Component({
  selector: 'app-errorarea',
  templateUrl: './errorarea.component.html',
  styleUrls: ['./errorarea.component.css']
})
export class ErrorareaComponent implements OnInit {

  lst_EEG!: EEG[];

  constructor(private service: WorkspaceService) { }

  ngOnInit(): void {
    //this.getErrorEEG();
  }

  // getErrorEEG() {
  //   this.service.getErrorEEGs().subscribe((eegs) => {
  //     this.lst_eeg = eegs;
  //     console.log("eegs:",this.lst_eeg)
  //   });
  

}
