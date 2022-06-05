import { Options } from '@angular-slider/ngx-slider';
import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { ChannelService } from 'src/app/services/channel.service';
import { Router } from '@angular/router';
import { EEGService } from 'src/app/services/eeg.service';
import { EEG } from 'src/app/classes/EEG';
import { EEGViewerComponent } from 'src/app/components/eeg-viewer/eeg-viewer.component';
import { map } from 'rxjs';


@Component({
  selector: 'app-eeg',
  templateUrl: './eeg.component.html',
  styleUrls: ['./eeg.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EegComponent implements OnInit {

  @ViewChild("child")
  eeg_viewer! : EEGViewerComponent

  dropdownSettings : IDropdownSettings = {};
  dropdownList! : String[];
  labels : String[] = [];
  eegInfo! : EEG;
  labelsSignal = new Map();
  id! : number 
  control! : boolean;
  token = '' + localStorage.getItem('token');
  initial: number = 0;
  window_size: number = 30;
  length! : number;
  signalsInSecond! : number;

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
  
  constructor(private services:ChannelService, private router: Router, private EEGservices:EEGService) { }
  
  ngOnInit() {
    const url_array = this.router.url.split("/");
    let eegId = +url_array[url_array.length - 1];
    this.id = eegId;

    this.getLabelsFromEEG(eegId);
    this.getInformation(eegId);

    this.dropdownSettings = {
      singleSelection: false,
      idField : 'item_id',
      textField : 'item_text',
      selectAllText : 'Select all',
      unSelectAllText : 'Unselect all'
    };    

    this.EEGservices.getEEGlength(this.id, this.token).subscribe((length) => {
      this.length = <number> length;
      this.signalsInSecond = <number> length / this.eegInfo.duration;
    })
 
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
  
  onItemSelect(item: any) {
    this.labels.push(item);
    this.getLabelData(this.labels);

    this.control=false;
  }

  onDropDownClose(item:any){
    this.control = true;
  }

  onItemDeselect(item:any){

    let indx = this.labels.indexOf(item);
    if (this.labels.length==1){
      this.labels=[];
    }
    else{
      this.labels.splice(indx, 1)
    }
    this.labelsSignal.delete(item);
    this.control=false;

  }

  onSelectAll(items: any) {
    this.labels= items;
    this.control=false;
  }

  getInputValue(event:any){
    this.window_size = event.target.value;
    this.getLabelData(this.labels);
  }

  getLabelData(channels: String[]) {

    /*
    Tendo o initial, end -> Ver se existem dados no labelsSignal a partir do initial até ao end

      se tiver:
        - só chamar o update data do filho, porque ele já tem os dados
        - pedir mais caso esteja perto de não ter mais dados
        
      se NÃO tiver:
        - pedir aos serviços os valores (do initial até ao end * 4)

      ELIMINAR CACHE

    */


    // verificar se o end não execede o tamanho do eeg

    let end = this.initial + this.window_size * this.signalsInSecond

    let hasData = false;

    console.log(this.labelsSignal);

    for (const [label, map] of Object.entries(this.labelsSignal)) {

      if (map.has(this.initial) && map.has(end)) {
        // Já tem os dados entre o initial - end
        hasData = true;
        console.log("HAS DATA ")
      }

      break;

    }
    
    if (!hasData) {

      console.log("DOESNT HAVE DATA :(")
 
      this.services.getDataAboutLabel(this.id, channels, this.token, this.initial, end * 4).subscribe((channelsMap) => {

        for (const [label, valuesMap] of Object.entries(channelsMap)) {
  
          let mergedMap = new Map();
  
          if (this.labelsSignal.has(label)) {
            mergedMap = this.labelsSignal.get(label);
  
          } else {
            this.labelsSignal.set(label,mergedMap);
          }
  
          for (const [index, value] of Object.entries(valuesMap)) {
  
            // Se canal existir
            if (!mergedMap.has(index)) {
              mergedMap.set(index,value);
  
            }
          }
  
          this.labelsSignal.set(label, mergedMap)
  
        }

      });

    } 
    
    console.log("Mapa", this.labelsSignal)

    this.eeg_viewer.updateData(this.initial);
  

  }

  left() {
    this.initial = this.initial - Math.floor(this.window_size * this.signalsInSecond)
    if (this.initial < 0) this.initial = 0
    
    this.getLabelData(this.labels)
  }

  right() {
    this.initial = this.initial +  Math.floor(this.window_size * this.signalsInSecond)

    if (this.initial > this.length - Math.floor(this.window_size * this.signalsInSecond)) {
      this.initial = this.length -  Math.floor(this.window_size * this.signalsInSecond);
    }

    this.getLabelData(this.labels)
  }

}
