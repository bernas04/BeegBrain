import { RevisionCenter } from './../../classes/RevisionCenter';
import { Operator } from './../../classes/Operator';
import { FiltersService } from './../../services/filters.service';
import { EEG } from './../../classes/EEG';
import { EEGService } from 'src/app/services/eeg.service';
import { PatientsService } from './../../services/patients.service';
import { Patient } from 'src/app/classes/Patient';
import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSelectModule } from '@angular/material/select';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { send } from 'process';
import { RegistrationService } from 'src/app/services/registration.service';
import { Institution } from 'src/app/classes/Institution';

@Component({
  selector: 'app-eeg-filters',
  templateUrl: './eeg-filters.component.html',
  styleUrls: ['./eeg-filters.component.scss'],

})
export class EegFiltersComponent implements OnInit {
  token = '' + localStorage.getItem('token');
  type = ''+localStorage.getItem('type');
  id = ''+localStorage.getItem('id');

  idSearch = '';

  lst_patients: Patient[] = []

  filtersForm !: FormGroup;

  filtering: Boolean = false
  eeg_id: string = ''
  patient_id: string = ''
  operator_id: string = ''
  institution_id: string = ''
  priority: string = ''
  report_status: string = ''
  date: string = ''



  constructor(private fb: FormBuilder, private reg:RegistrationService, private filterService:FiltersService) { }
  
  public listProvidences: Institution[] = []
  public listOperators: Operator[] = []
  public listRevision: RevisionCenter[] = []

  public eegs_filtered: EEG[] = [];

  ngOnInit(): void {
    this.getPatientsList()
    this.filtersForm = this.fb.group({
      eeg_id: [null],
      patient_id: [null],
      operator_id: [null],
      institution_id: [null],
      priority: [null],
      report_status: [null],
      date: [null],
    })
    this.getProvidence()
    this.getOperator()
    this.getRevisionCenters()

  }

  getPatientsList() {
    this.filterService.getTheirPatients(this.token).subscribe((info) => {
      this.lst_patients = info;
    });

  }
  


  getProvidence() {
    this.filterService.getEEgOperators(this.token).subscribe((info) => {
      this.listProvidences = info;
    });

  }

  getRevisionCenters(){

    this.filterService.getRevisionCentersByDoctor(this.id, this.token).subscribe((info) => {
      this.listRevision = info;
    });

  }



  getOperator() {
    this.filterService.getEEgOperators(this.token).subscribe((info) => {
      this.listOperators = info;
    });

  }



  getFiltersFormData(): void {
    const data = this.filtersForm.value
    var x: boolean = false;
    if (data["eeg_id"] !== undefined) {
      if (data["eeg_id"] !== null) {
        this.eeg_id = data["eeg_id"]
      }
      else {
        this.eeg_id = ''
      }
      x = true;

    }
    if (data["patient_id"] !== undefined) {
      if (data["patient_id"] !== null) {
        this.patient_id = data["patient_id"]
      }
      else {
        this.patient_id = ''
      }
      x = true;

    }
    if (data["institution_id"] !== undefined) {
      if (data["institution_id"] !== null) {
        this.institution_id = data["institution_id"]
      }
      else {
        this.institution_id = ''
      }
      x = true;

    }
    if (data["date"] !== undefined) {
      if (data["date"] !== null) {
        this.date = data["date"]
      }
      else {
        this.date = ''
      }
      x = true;
    }
    if (data["operator_id"] !== undefined) {
      if (data["operator_id"] !== null) {
        this.operator_id = data["operator_id"]
      }
      else {
        this.operator_id = ''
      }
      x = true;
    }
    if (data["priority"] !== undefined) {
      if (data["priority"] !== null) {
        this.priority = data["priority"]
      }
      else {
        this.priority = ''
      }
      x = true;
    }
    if (data["report_status"] !== undefined) {
      if (data["report_status"] !== null) {
        this.report_status = data["report_status"]
      }
      else {
        this.report_status = ''
      }
      x = true;
      console.log(this.report_status)
    }



    if (x) {
      this.filtering = true
      this.filterService.getEEGfiltered(this.eeg_id, this.patient_id, this.institution_id, this.date, this.operator_id, this.priority, this.report_status, this.token).subscribe((lst) => {
        this.eegs_filtered = [];

        // radicionar só os eegs sem erro
        lst.forEach((eeg) => {
          if (eeg.status == null) this.eegs_filtered.push(eeg)
        });
        
        this.sendFilters(this.eegs_filtered)

      });
    }

  }

  @Output() sendFiltersEvent = new EventEmitter<any>();
  sendFilters(value: EEG[]) {
    this.sendFiltersEvent.emit(value);

  }

  refresh() {
    window.location.reload();
  }


  clean() {
    setTimeout(() => this.lst_patients = [], 500)
  }


}