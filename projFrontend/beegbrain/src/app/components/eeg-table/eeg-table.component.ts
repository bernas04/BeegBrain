import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { EEG } from 'src/app/classes/EEG';
import { Patient } from 'src/app/classes/Patient';
import { EventService } from 'src/app/services/event.service';
import { TableService } from 'src/app/services/table.service'
import { number } from 'echarts';
import { Operator } from "./../../classes/Operator";
import { Institution } from "src/app/classes/Institution";
import { Providence } from "src/app/classes/Providence";
import { table } from "console";
import { map, Observable } from "rxjs";
import { Report } from 'src/app/classes/Report';

@Component({
  selector: "app-eeg-table",
  templateUrl: "./eeg-table.component.html",
  styleUrls: ["./eeg-table.component.css"],
})
export class EegTableComponent implements OnInit {
  @Input("allEEG") lst_EEG!: EEG[];
  @Input("allPatients") lst_Patients!: Patient[];
  @Input("allReports") lst_report!: Report[];
  @Input("allInstitutions") lst_inst!: Institution[];
  @Input("allOperators") lst_op!: Operator[]

  @Output() eeg_deleted = new EventEmitter<any>();
  private eeg2delete! : EEG;
  private id!: number;
  public map = new Map<number, string>();
  public map_operator_institution = new Map<number, string>();
  public map_report = new Map<Report, string>();


  institution!: Institution;
  token = "" + localStorage.getItem("token");
  operator!: Operator;
  type = ''+localStorage.getItem('type');
  person_id = ''+localStorage.getItem('id');

  config: any;
  


  constructor(private router: Router, private tableService: TableService,  private eventService: EventService) {}

  ngOnInit(): void {
  }

  ngOnChanges(model: any) {

    // criar o map com key = id do EEG, e value = nome do paciente
    this.lst_EEG.forEach((eeg) => {
      let pat = this.lst_Patients.find((x) => x.id == eeg.patient);
      if (pat) this.map.set(eeg.id, pat.name);
      else this.map.set(eeg.id, "undefined");
    });

    //Mapa {operator:institution_name}
    this.lst_op.forEach((op) => {
      let inst = this.lst_inst.find((x) => x.id == +op.providence);
      if (inst) this.map_operator_institution.set(op.id, inst.name);
      else this.map_operator_institution.set(op.id, "undefined");
    });

    //Mapa {eeg_id:report_status}
    this.lst_EEG.forEach((eeg) => {
      let rep = this.lst_report.find((x) => x.id == +eeg.report);
      if (rep) this.map_report.set(eeg.report, rep.progress);
      else this.map_report.set(eeg.report, "to do");
    });


    this.config = {
      itemsPerPage: 10,
      currentPage: 1,
      totalItems: this.lst_EEG.length
    };

  }

  delete() {
    let json = { "type": "EEG deleted", "person": this.person_id, "eeg_id": ''+this.eeg2delete.id}
    let jsonObject = <JSON><unknown>json;
    this.eventService.addEvent(jsonObject, this.token).subscribe();

    this.eeg_deleted.emit(this.eeg2delete);
  }
  
  save2delete(eeg : EEG) {
    this.eeg2delete = eeg;
  }

  redirect(id: number) {
    let json = { "type": "EEG view", "person": this.person_id, "eeg_id": ''+id}
    let jsonObject = <JSON><unknown>json;
    this.eventService.addEvent(jsonObject, this.token).subscribe();

    this.router.navigate(["/workspace/"+id]);
  }

  pageChanged(event: any){
    this.config.currentPage = event;
  }

}
