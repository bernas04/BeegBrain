import { Options } from '@angular-slider/ngx-slider';
import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { ChannelService } from 'src/app/services/channel.service';
import { Router } from '@angular/router';
import { EEGService } from 'src/app/services/eeg.service';
import { EEG } from 'src/app/classes/EEG';
import { EEGViewerComponent } from 'src/app/components/eeg-viewer/eeg-viewer.component';
import { buffer, map } from 'rxjs';


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
  labelsSignal : Map<String,Map<Number,Number>> = new Map();
  id! : number 
  control : boolean = false;
  token = '' + localStorage.getItem('token');
  initial: number = 0;
  window_size: number = 30;
  indices! : number;
  signalsInSecond! : number;
  endLimit! : number;
  updateViewControl: boolean = true;


  speed: number = 1; // default: 0.1 segundo
  options: Options = {
    floor: 1,
    ceil: 100,
    step: 1,        
    rightToLeft: false,
    translate: (value: number): string => {
      if (value == 1) return value + ' tick';
      else return value + ' ticks';
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

    this.EEGservices.getEEGlength(this.id, this.token).subscribe((indices) => {
      console.log("INDICES ::: ", indices)
      this.indices = <number> indices;
      this.signalsInSecond = <number> indices / this.eegInfo.duration;
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
  
  onItemSelect(item : any) {
    console.log("PEDI LABEL -----> ", item)
    this.labels.push(item);
    this.getLabelData(this.labels);
    this.control = false;

  }

  onDropDownClose(item : any){
    this.control = true;
  }

  onItemDeselect(item : any){

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
    this.labels = items;
    this.control=false;
    this.getLabelData(this.labels);
  }

  getInputValue(event:any){
    this.window_size = event.target.value;
    this.getLabelData(this.labels);
  }

  newItem($event : any) {
    this.updateViewControl=$event
  }

  getLabelData(channels: String[]) {

    let end = this.initial + Math.floor(this.window_size * this.signalsInSecond)

    let newChannels : String[] = [];

    // Ver se há novos canais adicionados e pedir informação sobre os mesmos
    for (const channel of channels) {

      if (!this.labelsSignal.has(channel)) {
        newChannels.push(channel);
      }

    }

    if (newChannels.length == 0) {

      // Não há novos canais, verificar se os dados que vamos ver antes/seguir existem na cache

      for (const [label, map] of this.labelsSignal.entries()) {

        if (map.has(this.initial+1) && map.has(end)) {
  
          // Já tem os dados entre o initial - end
  
          let bufferInitial = this.initial;
          let bufferEnd! : number;
  
          if (channels.length > 50) {
            bufferInitial += Math.floor(this.window_size * this.signalsInSecond);
            bufferEnd = bufferInitial + Math.floor(this.window_size * this.signalsInSecond);
          } else if (channels.length > 25 && channels.length < 50 ) {
            bufferInitial += 2 * Math.floor(this.window_size * this.signalsInSecond);
            bufferEnd = bufferInitial + Math.floor(this.window_size * this.signalsInSecond) * 2;
          } else if (channels.length <= 25 ) {
            bufferInitial += 4 * Math.floor(this.window_size * this.signalsInSecond);
            bufferEnd = bufferInitial + Math.floor(this.window_size * this.signalsInSecond) * 4;
          }
  
          // Se é preciso pedir dados para buffer:

          if (bufferInitial > this.endLimit) {
  
            this.getBackendData(this.endLimit,bufferEnd,channels);
  
          }
  
        } else {

          // Multiplicador consoante numero de canais que pedimos
          if (channels.length > 50) {
            end += Math.floor(this.window_size * this.signalsInSecond);
          } else if (channels.length > 25 && channels.length < 50 ) {
            end += 2 * Math.floor(this.window_size * this.signalsInSecond);
          } else if (channels.length <= 25 ) {
            end += 4 * Math.floor(this.window_size * this.signalsInSecond);
          }
    
          this.getBackendData(this.initial,end,channels);

        }
  
      }

    } else {

      // Multiplicador consoante numero de canais que pedimos
      if (channels.length > 50) {
        end += Math.floor(this.window_size * this.signalsInSecond);
      } else if (channels.length > 25 && channels.length < 50 ) {
        end += 2 * Math.floor(this.window_size * this.signalsInSecond);
      } else if (channels.length <= 25 ) {
        end += 4 * Math.floor(this.window_size * this.signalsInSecond);
      }

      if (this.endLimit !== undefined) {
        end = this.endLimit;
      }

      this.getBackendData(0,end,newChannels);

    }

    this.eeg_viewer.updateData();

  }

  getBackendData(initial: number, end: number, channels: any[]){
    
    this.services.getDataAboutLabel(this.id, channels, this.token, initial, end).subscribe((channelsMap) => {

      this.endLimit = end;

      for (const [label, valuesMap] of Object.entries(channelsMap)) {

        let mergedMap : Map<Number,Number> = new Map();

        if (this.labelsSignal.has(label)) {
          mergedMap = this.labelsSignal.get(label)!;

        }

        for (const [index, value] of Object.entries(valuesMap)) {

          // Se canal existir
          if (!mergedMap.has(Number.parseInt(index))) {
            mergedMap.set(Number.parseInt(index),<Number>value);
          }
        }

        this.labelsSignal.set(label, mergedMap)

      }


    });
  }

  left() {
    this.initial = this.initial - Math.floor(this.window_size * this.signalsInSecond)
    if (this.initial < 1) this.initial = 1
    this.removeSpeedInterval()
    this.getLabelData(this.labels)
  }

  right() {
    this.initial = this.initial +  Math.floor(this.window_size * this.signalsInSecond)
    if (this.initial > this.indices - Math.floor(this.window_size * this.signalsInSecond)) {
      this.initial = this.indices -  Math.floor(this.window_size * this.signalsInSecond);
    }
    this.removeSpeedInterval()
    this.getLabelData(this.labels)
  }

<<<<<<< HEAD
  removeSpeedInterval() {

    for (var id in this.eeg_viewer.lst_intervalId) {
      clearInterval( parseInt(id) );
    }
    clearInterval( this.eeg_viewer.intervalId );
    this.eeg_viewer.start();

  }
=======



  // Dá update dos dados e guarda-os num mapa
  // Passando-os depois para a componente
  updateView() {
    let updatedValuesAndInitialValue : Map<String, Map<Number, Array<number>>> = new Map();
    let tmpMap = new Map();
    
    
    for (const [key, valueMap] of this.labelsSignal) {
      const values = Array.from(valueMap.values()); 
      const initialValue = <number>values[0];

      // Esta função vai adicionar o primeiro valor de cada canal a todos 
      var updatedValuesOfChannel = values.map( function(value) { 
        return <number>value - initialValue; 
      } );

      tmpMap.set(initialValue, updatedValuesOfChannel)
      updatedValuesAndInitialValue.set(key, tmpMap);
    }
    
    this.eeg_viewer.updateViewWithData(updatedValuesAndInitialValue, this.updateViewControl);
  }

>>>>>>> da376ba1fd2b8846ea2b661c5e857c75e11be6a8
}
