import { Component, OnInit } from '@angular/core';
import { fail } from 'assert';
import { EEG } from 'src/app/classes/EEG';
import { Patient } from 'src/app/classes/Patient';
import { PatientsService } from 'src/app/services/patients.service';
import { WorkspaceService } from 'src/app/services/workspace.service';




@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.css']
})

export class WorkspaceComponent implements OnInit {

  lst_eeg: EEG[] = [];
  lst_empty: EEG[] = [];

  lst_patient: Patient[] = [];
  filter_egg_id = ''
  EEGpacient = new Map<number, Patient>();


  token = '' + localStorage.getItem('token');

  constructor(private service: WorkspaceService, private patient_service: PatientsService) { }

  ngOnInit(): void {
    this.getEEG();
    this.getPatients();

  }


  onKeyId(eeg_id: string) {
    if (eeg_id != '') {
      let eeg_number = parseInt(eeg_id)
      this.filter_egg_id = eeg_id
      this.lst_eeg = this.lst_eeg.filter(
        eeg => eeg.id === eeg_number);
    }
    else {
      this.getEEG()
    }
  }

  selectData(dateInput: any) {
    //não entra aqui o corno ERRO
    console.log("tou aqui")
    let date = new Date(dateInput);
    console.log(date)
    if (!date) {
      this.getEEG()
    }
    else {
      this.lst_eeg = this.lst_eeg.filter(
        eeg => eeg.timestamp == date);
    }
  }



  selectPriority(pri: string) {
    // está a dar erro, não consegue entrar em 2 ifs 
    console.log("inicial", pri)


    


    switch (pri) {
      
      case '1':
        this.lst_eeg= this.lst_eeg.filter(
          eeg => eeg.priority === '1',
          console.log("tou no 1")
        );
        break;
      case '2':
        this.lst_eeg = this.lst_eeg.filter(
          eeg => eeg.priority === '2',
          console.log("tou no 2")
        );
        break;
      case '3':
        this.lst_eeg = this.lst_eeg.filter(
          eeg => eeg.priority === '3',
          console.log("tou no 3")
        );
        break;
      case '4':
        this.lst_eeg = this.lst_eeg.filter(
          eeg => eeg.priority === '4',
          console.log("tou no 4")
        );
        break;

      case '5':
        this.lst_eeg = this.lst_eeg.filter(
          eeg => eeg.priority === '5',
          console.log("tou no 5")
        );
        break;
      default:
        this.getEEG()
        break;
        }


  
  }




  getEEG() {

    this.service.getAllEEG(this.token).subscribe((info) => {
      this.lst_eeg = info;
      console.log("eegs:", this.lst_eeg)
    });
    
  }


  getPatients() {
    this.patient_service.getPatients(this.token).subscribe((info) => {
      this.lst_patient = info;
      console.log(this.lst_patient)
    });
  }

  onDelete(id: number) {
    this.service.deleteEEG(id, this.token).subscribe();
  }

  refresh() {
    window.location.reload();
  }




}
