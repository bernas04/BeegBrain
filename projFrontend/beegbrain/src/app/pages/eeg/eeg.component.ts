import { Options } from '@angular-slider/ngx-slider';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { ChannelService } from 'src/app/services/channel.service';

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
  public eegInfo:Object=[];
  labelsSignal= new Map();


  constructor(private services:ChannelService) { }

  


  ngOnInit() {
    this.getLabelsFromEEG();
    this.services.getEEGinfo(15).subscribe((info) => {
      this.eegInfo = info;
    })
    this.dropdownSettings = {
      singleSelection: false,
      idField : 'item_id',
      textField : 'item_text',
      selectAllText : 'Select all',
      unSelectAllText : 'Unselect all'
    };    
  }



  getLabelsFromEEG(){
    this.services.getLabelsFromEEG(15).subscribe((info) => {
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
    this.services.getDataAboutLabel(15, item).subscribe((info) => {
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
