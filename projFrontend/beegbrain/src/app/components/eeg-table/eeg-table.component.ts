import { number } from 'echarts';
import { Operator } from "./../../classes/Operator";
import { Institution } from "src/app/classes/Institution";
import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
} from "@angular/core";
import { Router } from "@angular/router";
import { EEG } from "src/app/classes/EEG";
import { Patient } from "src/app/classes/Patient";
import { TableService } from "src/app/services/table.service";
import { Providence } from "src/app/classes/Providence";
import { table } from "console";
import { map } from "rxjs";

@Component({
  selector: "app-eeg-table",
  templateUrl: "./eeg-table.component.html",
  styleUrls: ["./eeg-table.component.css"],
})
export class EegTableComponent implements OnInit {
  @Input("allEEG") lst_EEG!: EEG[];
  @Input("allPatients") lst_Patients!: Patient[];
  @Output() eeg_deleted = new EventEmitter<any>();
  private id!: number;
  public map = new Map<number, string>();
  public map_operator_institution = new Map<number, string>();


  institution!: Institution;
  token = "" + localStorage.getItem("token");
  operator!: Operator;

  @Input("allInstitutions") lst_inst!: Institution[];
  @Input("allOperators") lst_op!: Operator[]

  constructor(private router: Router, private tableService: TableService) {}

  ngOnInit(): void {


  }

  ngOnChanges(model: any) {
    console.log("im hereeeee")
    // criar o map com key = id do EEG, e value = nome do paciente
    this.lst_EEG.forEach((eeg) => {
      console.log("now here")
      let pat = this.lst_Patients.find((x) => x.id == eeg.patient);
      if (pat) this.map.set(eeg.id, pat.name);
      else this.map.set(eeg.id, "undefined");
    });

    //Mapa {operator:institution_name}
    this.lst_op.forEach((op) => {
      console.log("im doing it")
      let inst = this.lst_inst.find((x) => x.id == +op.providence);
      if (inst) this.map_operator_institution.set(op.id, inst.name);
      else this.map_operator_institution.set(op.id, "undefined");
      console.log("FINAL RESULT", this.map_operator_institution)

    });


  }

  delete() {
    this.eeg_deleted.emit(this.id);
  }

  save2delete(id: number) {
    this.id = id;
  }

  redirect(id: number) {
    this.router.navigate(["/workspace/" + id]);
  }




}
