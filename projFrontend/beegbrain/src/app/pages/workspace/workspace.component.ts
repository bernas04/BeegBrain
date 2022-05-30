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
  lst_untouchable: EEG[] = [];

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

  selectData(dateInput: string) {
    let date = new Date(dateInput);
    
    var month_prov = date.getUTCMonth() + 1; //months from 1-12
    var month = ''
    if (month_prov < 10){
      month = '0' + month_prov
    }
    else {
      month = month_prov.toString()
    }
    var day = date.getUTCDate();
    var year = date.getUTCFullYear();

    let newdate = year + "-" + month + "-" + day;

    if (dateInput != '') {
      console.log("ratisse")
      this.lst_eeg = this.lst_untouchable.filter(
        eeg => eeg.timestamp.toString().substring(0, 10) == newdate);
    } 
    else {
      this.lst_eeg = this.lst_untouchable
    }
      
  }



  selectPriority(pri: string) {
    // está a dar erro, não consegue entrar em 2 ifs 
    console.log("inicial", pri)

    switch (pri) {

      case '1':
        this.lst_eeg = this.lst_untouchable.filter(
          eeg => eeg.priority === '1',
          console.log("tou no 1")
        );

        console.log(this.lst_eeg)

        break;
      case '2':
        this.lst_eeg = this.lst_untouchable.filter(
          eeg => eeg.priority === '2',
          console.log("tou no 2"),
        );
        console.log(this.lst_eeg)

        break;
      case '3':
        this.lst_eeg = this.lst_untouchable.filter(
          eeg => eeg.priority === '3',
          console.log("tou no 3")

        );
        console.log(this.lst_eeg)

        break;
      case '4':
        this.lst_eeg = this.lst_untouchable.filter(
          eeg => eeg.priority === '4',
          console.log("tou no 4")
        );
        console.log(this.lst_eeg)

        break;

      case '5':
        this.lst_eeg = this.lst_untouchable.filter(
          eeg => eeg.priority === '5',
          console.log("tou no 5")
        );
        console.log(this.lst_eeg)

        break;
      default:
        this.getEEG()
        break;
    }



  }




  getEEG() {

    this.service.getAllEEG(this.token).subscribe((info) => {
      this.lst_eeg = info;
      this.lst_untouchable = info;
      console.log("eegs:", this.lst_eeg)
    });

  }


  getPatients() {
    this.patient_service.getPatients(this.token).subscribe((info) => {
      this.lst_patient = info;
    });
  }

  onDelete(id: number) {
    this.service.deleteEEG(id, this.token).subscribe();
  }

  refresh() {
    window.location.reload();
  }




}
