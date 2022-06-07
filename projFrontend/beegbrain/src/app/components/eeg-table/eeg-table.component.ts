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
  public map_eeg_institution = new Map<number, string>();

  lst_institutions: Providence[] = [];

  institution!: Institution;
  lst_operator: Operator[] = [];
  token = "" + localStorage.getItem("token");
  operator!: Operator;
  constructor(private router: Router, private tableService: TableService) {}

  ngOnInit(): void {
    console.log("ON INIT", this.lst_EEG);
    this.lst_EEG.forEach((eeg) => {
      this.lst_operator.push(eeg.operator);
    });
    console.log("operators", this.lst_operator);

    this.lst_operator.forEach((operator) => {
      console.log(operator);
      this.lst_institutions.push(operator.providence);
    });
    this.getInstitutions();

  }

  ngOnChanges(model: any) {
    // criar o map com key = id do EEG, e value = nome do paciente
    this.lst_EEG.forEach((eeg) => {
      let pat = this.lst_Patients.find((x) => x.id == eeg.patient);
      if (pat) this.map.set(eeg.id, pat.name);
      else this.map.set(eeg.id, "undefined");
    });
    this.getInstitutions();


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

  // getInstitution(id: number) {
  //   console.log("INSTITUICAO", id);
  //   this.tableService.getInstitution(id, this.token).subscribe((info) => {
  //     this.institution = info;
  //     this.lst_operator.forEach((o) => {
  //       console.log("lista operadores", this.lst_operator);
  //       this.map_eeg_institution.set(o.id, info.name);
  //     });
  //   });
  //   console.log(this.map_eeg_institution);
  // }

  getInstitutions() {
    this.lst_operator.forEach((o) => {
      console.log("lista operadores", this.lst_operator);
      let op_id = Number(o);
      this.tableService.getInstitution(op_id, this.token).subscribe((info) => {
        this.map_eeg_institution.set(op_id, info.name);
      });
    });
    console.log(this.map_eeg_institution);
  }

  getOperators() {
    this.tableService.getOperators(this.token).subscribe((info) => {
      this.lst_operator = info;
    });

  }

}
