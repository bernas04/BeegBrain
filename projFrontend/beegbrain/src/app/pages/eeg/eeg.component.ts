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
  public listOfLabels: String[] = [];

  constructor(private services:ChannelService) { }

  


  ngOnInit(): void {
    this.getLabelsFromEEG();
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
      this.listOfLabels=info;
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
  
  
  getInputValue(event:any){
    this.window_size = event.target.value;
  }

  update() {
    console.log("new speed value: "+ this.speed)
  }

}
