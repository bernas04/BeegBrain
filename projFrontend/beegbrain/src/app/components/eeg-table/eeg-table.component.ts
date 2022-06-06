import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { EEG } from 'src/app/classes/EEG';
import { Patient } from 'src/app/classes/Patient';
import { EventService } from 'src/app/services/event.service';
import { TableService } from 'src/app/services/table.service'

@Component({
  selector: 'app-eeg-table',
  templateUrl: './eeg-table.component.html',
  styleUrls: ['./eeg-table.component.css']
})
export class EegTableComponent implements OnInit {

  @Input('allEEG') lst_EEG!: EEG[];
  @Input('allPatients') lst_Patients!: Patient[];
  @Output() eeg_deleted = new EventEmitter<any>();
  private eeg2delete! : EEG;
  public map = new Map<number, string>();

  token = '' + localStorage.getItem('token');
  type = ''+localStorage.getItem('type');
  person_id = ''+localStorage.getItem('id');

  config: any;

  constructor(private router : Router, private eventService: EventService) { }

  ngOnInit(): void {
  }

  ngOnChanges(model: any) {

    // criar o map com key = id do EEG, e value = nome do paciente
    this.lst_EEG.forEach((eeg) => {

      let pat = this.lst_Patients.find(x => x.id == eeg.patient)

      if(pat) this.map.set(eeg.id, pat.name)
      else this.map.set(eeg.id, 'undefined')
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
