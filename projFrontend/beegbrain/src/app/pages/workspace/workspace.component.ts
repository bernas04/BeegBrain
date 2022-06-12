import { subscribeOn } from 'rxjs';
import { Institution } from 'src/app/classes/Institution';
import { Operator } from 'src/app/classes/Operator';

import { Component, OnInit, ViewChild } from '@angular/core';
import { EEG } from 'src/app/classes/EEG';
import { Patient } from 'src/app/classes/Patient';
import { PatientsService } from 'src/app/services/patients.service';
import { WorkspaceService } from 'src/app/services/workspace.service';
import { EEGService } from 'src/app/services/eeg.service';
import { EventService } from 'src/app/services/event.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Report } from 'src/app/classes/Report';
import { IgxToastComponent } from 'igniteui-angular';


@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.css']
})
export class WorkspaceComponent implements OnInit {

  @ViewChild('close') closebutton!: any;
  @ViewChild('toast') toast!: any;

  lst_eeg: EEG[] = [];  
  lst_error_eeg: EEG[] = [];  
  lst_patient: Patient[] = [];
  lst_institutions: Institution[] = []
  lst_operators: Operator[] = []
  lst_report: Report[] = []

  EEGpacient = new Map<number, Patient>();

  lst_untouchable: EEG[] = [];
  lst_filtered: EEG[] = []
  files : File[] = [];

  token = ''+localStorage.getItem('token');
  type = ''+localStorage.getItem('type');
  id = ''+localStorage.getItem('id');
  health_number = ''+localStorage.getItem('health_number');
  tableService: any;

  uploadForm !: FormGroup;
  patient_id: string =''
  priority: string = ''

  prioritySelected: string = '';



  constructor(private fb: FormBuilder, private service: WorkspaceService, private patient_service: PatientsService, 
    private eegService: EEGService, private eventService: EventService ) { }

  ngOnInit(): void {
    this.getEEG();
    this.getPatients();
    this.getOperators();
    this.getInstitutions();
    this.getReports()

    this.uploadForm = this.fb.group({
      patient_id: [null],
      priority: [null]
    })
  }


  getEEG() {
    this.service.getAllEEG(this.token, this.type, this.id).subscribe((info) => {

      info.forEach((eeg) => {
        if (eeg.status != null) {
          this.lst_error_eeg.push(eeg);

        } else if (eeg.patient == null ) {
          eeg.status = 'patient undefined'
          this.lst_error_eeg.push(eeg);

        } else {
          this.lst_eeg.push(eeg);
        }

      })


      this.lst_eeg.reverse();
      this.lst_error_eeg.reverse();

    });

  }
  
  sendFilters(lst : EEG[]){
    this.lst_eeg = lst;
  }

  getInstitutions() {
    this.service.getAllInstitutions(this.token).subscribe((info) => {
      this.lst_institutions = info;
    })

  }
  
  getPatients() {
    this.patient_service.getPatients(this.token).subscribe((info) => {
      this.lst_patient = info;
    });
  }

  onDelete(eeg : EEG) {
    const index = this.lst_eeg.indexOf(eeg, 0);
    if (index > -1) {
      this.lst_eeg.splice(index, 1);
      this.lst_eeg = this.lst_eeg.slice();
    }

    const index1 = this.lst_error_eeg.indexOf(eeg, 0);
    if (index1 > -1) {
      this.lst_error_eeg.splice(index1, 1);
      this.lst_error_eeg = this.lst_error_eeg.slice();
    }

    this.service.deleteEEG(eeg.id, this.token).subscribe();
  }

  refresh() {
    window.location.reload();
  }

  getOperators() {
    this.service.getOperators(this.token).subscribe((info) => {
      this.lst_operators = info;
    });

  }

  getFiles(files : any[]) {
    this.files = files;
  }


  submitEEG():void {
    const data = this.uploadForm.value
    this.priority = data["priority"]
    this.patient_id = data["patient_id"]

    const formData = new FormData();
    formData.append('operatorID', this.health_number);
    formData.append('patientID', this.patient_id);
    formData.append('priority', this.priority);

    for (let file of this.files) {
      console.log(file.name)
      formData.append('file', file, file.name);
    }

    this.eegService.submitEEG(formData, this.token).subscribe({
      next: (eeg) => {
        

        /* this.eegService.getPatientbyID(+eeg.patient, this.token).subscribe((info) => {
          console.log("Adicionar à tabela") // não está a dar update à tabela porque está a dar erro de autorização :)

          this.lst_patient.push(info);
          this.lst_patient = this.lst_patient.slice();

          this.lst_eeg.reverse();
          this.lst_error_eeg.reverse();

          if (eeg.status == null) {  
            this.eegService.getReportbyID(+eeg.report, this.token).subscribe((info) => {
              this.lst_report.push(info)
              this.lst_eeg.push(eeg);

              this.lst_eeg.reverse();

              this.lst_eeg = this.lst_eeg.slice();
              this.lst_report = this.lst_report.slice();
            });
  
          } else {
            this.lst_error_eeg.push(eeg);
            this.lst_error_eeg.reverse();

            this.lst_error_eeg = this.lst_error_eeg.slice();
          }
          
        }); */

        let json = { "type": "EEG uploaded", "person": this.id, "eeg_id": ''+eeg.id}
        let jsonObject = <JSON><unknown>json;
        this.eventService.addEvent(jsonObject, this.token).subscribe((info) => {
          // quando acabar de criar o evento
          this.closebutton.nativeElement.click();
          window.location.reload()
        });

        

        //this.toast.nativeElement.show()

        /* if (eeg.status == null) this.toast.open("EEG uploaded with success!");
        else this.toast.open("EEG uploaded with errors :(");
 */
      },
      error: (error) => {
        console.log(error);
      }
    });
    

    //window.location.href="/workspace";
  }

  getReports() {
    this.service.getReports(this.token).subscribe((info) => {
      this.lst_report = info;
    });
  }


  activeTab = 'allexams';

  changeTab(activeTab: string){
    this.activeTab = activeTab;
  }

}
