import { Component, OnInit } from '@angular/core';
import { EEG } from 'src/app/classes/EEG';
import { WorkspaceService } from 'src/app/services/workspace.service';

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.css']
})
export class WorkspaceComponent implements OnInit {

  lst_eeg: EEG[] = [];  

  constructor(private service: WorkspaceService) { }

  ngOnInit(): void {
    this.getEEG();
  }

  getEEG() {
    this.service.getAllEEG().subscribe((info) => {
      this.lst_eeg = info;
      console.log(this.lst_eeg)
    });
  }


}
