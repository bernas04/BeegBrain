import { Options } from '@angular-slider/ngx-slider';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { ChannelService } from 'src/app/services/channel.service';
import { Router } from '@angular/router';
import { EEGService } from 'src/app/services/eeg.service';
import { EEG } from 'src/app/classes/EEG';


@Component({
  selector: 'app-eeg',
  templateUrl: './eeg.component.html',
  styleUrls: ['./eeg.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EegComponent implements OnInit {

  dropdownSettings:IDropdownSettings={};
  dropdownList!:String[];
  labels:String[]=[];
  public eegInfo!:EEG;
  labelsSignal= new Map();
  id!: number 

  token = ''+localStorage.getItem('token');

  constructor(private services:ChannelService, private router: Router, private EEGservices:EEGService) { }

  ngOnInit() {
    const url_array = this.router.url.split("/");
    let eegId = +url_array[url_array.length - 1];
    this.id=eegId;
    this.getLabelsFromEEG(eegId);
    this.getInformation(eegId);
    
    this.dropdownSettings = {
      singleSelection: false,
      idField : 'item_id',
      textField : 'item_text',
      selectAllText : 'Select all',
      unSelectAllText : 'Unselect all'
    };    
  }

  getInformation(eegId:number): any{
    this.EEGservices.getEEGinfo(eegId, this.token).subscribe((info) => {
      this.eegInfo = info;
    })
  }


  getLabelsFromEEG(eegId:number){
    this.services.getLabelsFromEEG(eegId, this.token).subscribe((info) => {
      this.dropdownList=info;
    })
  }
  
  speed: number = 1000; // default: 1 segundo
  options: Options = {
    floor: 0,
    ceil: 1000,
    step: 50,         // de 0.05 em 0.05 segundos
    rightToLeft: true,
    translate: (value: number): string => {
      return value +' ms';
    },
  };
  
  window_size: number=30;
  
  onItemSelect(item: any) {
    this.labels.push(item);
    this.services.getDataAboutLabel(this.id, item, this.token).subscribe((info) => {
      this.labelsSignal.set(item, info);
      
    });
  }

  onItemDeselect(item:any){
    let indx = this.labels.indexOf(item);
    if (this.labels.length==1){
      this.labels=[];
    }
    else{
      this.labels.splice(indx, 1);
    }
  }


  onSelectAll(items: any) {
    this.labels= items;
  }


  getInputValue(event:any){
    this.window_size = event.target.value;
  }

  update() {
    console.log("new speed value: "+ this.speed)
  }

  
}
