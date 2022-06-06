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
  length! : number;
  signalsInSecond! : number;
  endLimit! : number;


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

  getLabelData(channels: String[]) {


    console.log("LABELS PARA DAR FETCH", channels)

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
  
          console.log("HAS DATA ")
  
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
  
            console.log("CHAMAR O BUFFER DE " + bufferInitial + " a " + bufferEnd)
  
            this.getBackendData(this.endLimit,bufferEnd,channels);
  
          }
  
        } else {

          console.log("DOESNT HAVE DATA :(")
  
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
  
      console.log("INITIAL ->", this.initial)

      if (this.endLimit !== undefined) {
        end = this.endLimit;
      }

      this.getBackendData(0,end,newChannels);



    }

    console.log("O GRÁFICO VAI MOSTRAR DADOS A PARTIR DO " + this.initial)
    this.eeg_viewer.updateData(this.initial);
  

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

      console.log("AAAAAAAAAAKJWNKFJEWFKUWHEUJKWFNWIJEFWUIEHFIWHEFIUWFHEIUWHFIUWHFW")
      console.log(this.labelsSignal)

    });
  }

  left() {
    this.initial = this.initial - Math.floor(this.window_size * this.signalsInSecond)
    if (this.initial < 1) this.initial = 1
    
    this.getLabelData(this.labels)
  }

  right() {
    this.initial = this.initial +  Math.floor(this.window_size * this.signalsInSecond)

    if (this.initial > this.length - Math.floor(this.window_size * this.signalsInSecond)) {
      this.initial = this.length -  Math.floor(this.window_size * this.signalsInSecond);
    }

    this.getLabelData(this.labels)
  }




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

    this.eeg_viewer.updateViewWithData(updatedValuesAndInitialValue);
  }

}
