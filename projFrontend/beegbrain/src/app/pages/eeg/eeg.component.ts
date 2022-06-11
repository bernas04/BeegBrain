import { Options } from '@angular-slider/ngx-slider';
import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { ChannelService } from 'src/app/services/channel.service';
import { Router } from '@angular/router';
import { EEGService } from 'src/app/services/eeg.service';
import { EEG } from 'src/app/classes/EEG';
import { EEGViewerComponent } from 'src/app/components/eeg-viewer/eeg-viewer.component';
import { buffer } from 'rxjs';
import { Report } from 'src/app/classes/Report';
import { Annotation } from 'src/app/classes/Annotation';
import { ReportService } from 'src/app/services/report.service';


@Component({
  selector: "app-eeg",
  templateUrl: "./eeg.component.html",
  styleUrls: ["./eeg.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EegComponent implements OnInit {
  @ViewChild("child")
  eeg_viewer!: EEGViewerComponent;

  report!: Report;
  report_progress!: String;
  dropdownSettings: IDropdownSettings = {};
  dropdownList!: String[];
  labels: String[] = [];
  eegInfo!: EEG;
  labelsSignal: Map<String, Map<Number, Number>> = new Map();
  id!: number;
  control: boolean = false;
  token = "" + localStorage.getItem("token");
  initial: number = 0;
  window_size: number = 30;
  indices!: number;
  signalsInSecond!: number;
  endLimit!: number;
  updateViewControl: boolean = false;
  annotations!: Annotation[];
  
  normalizedLabelsSignal : Map<String,Map<Number,Number>> = new Map();
  playing: boolean = true;


  speed: number = 10; // default: 0.1 segundo
  options: Options = {
    floor: 1,
    ceil: 100,
    step: 1,
    rightToLeft: false,
    translate: (value: number): string => {
      if (value == 1) return value + " tick";
      else return value + " ticks";
    },
  };

  constructor(
    private services: ChannelService,
    private router: Router,
    private EEGservices: EEGService,
    private reportService: ReportService
  ) {}

  ngOnInit() {
    const url_array = this.router.url.split("/");
    let eegId = +url_array[url_array.length - 1];
    this.id = eegId;

    this.getLabelsFromEEG(eegId);
    this.getInformation(eegId);
    this.getAnnotations(eegId);
    this.checkReport(eegId);

    
    console.log("FODSASSSSSSSSSS",this.report_progress)
    this.dropdownSettings = {
      singleSelection: false,
      idField: "item_id",
      textField: "item_text",
      selectAllText: "Select all",
      unSelectAllText: "Unselect all",
    };

    this.EEGservices.getEEGlength(this.id, this.token).subscribe((indices) => {

      this.indices = <number> indices;
      this.signalsInSecond = <number> indices / this.eegInfo.duration;
    })

  }

  getInformation(eegId: number): any {
    this.EEGservices.getEEGinfo(eegId, this.token).subscribe((info) => {
      this.eegInfo = info;
    });
  }

  getLabelsFromEEG(eegId: number) {
    this.services.getLabelsFromEEG(eegId, this.token).subscribe((info) => {
      this.dropdownList = info;
    });
  }


  onItemSelect(item : any) {
    this.labels.push(item);
    this.getLabelData(this.labels);
    this.control = false;
  }

  onDropDownClose(item: any) {
    this.control = true;
  }

  onItemDeselect(item : any){
    let indx = this.labels.indexOf(item);
    if (this.labels.length == 1) {
      this.labels = [];
    } else {
      this.labels.splice(indx, 1);
    }
    this.normalizedLabelsSignal.delete(item);
    this.control = false;
  }

  onSelectAll(items: any) {
    this.labels = items;
    this.control = false;
    this.getLabelData(this.labels);
  }

  getInputValue(event: any) {
    this.window_size = event.target.value;
    this.getLabelData(this.labels);
  }

  getLabelData(channels: String[]) {
    let end = this.initial + Math.floor(this.window_size * this.signalsInSecond)
    let newChannels : String[] = [];
    let indexesToRemove : number[] = [];

    console.log("LABEL DATA CHAMADO")
    console.log("INITIAL -> " + this.initial + "  " + new Date((this.initial / this.signalsInSecond) * 1000).toISOString().substr(11, 8) + " | END " + end + "  " + new Date((end / this.signalsInSecond) * 1000).toISOString().substr(11, 8))

    // Ver se há novos canais adicionados e pedir informação sobre os mesmos
    for (const channel of channels) {

      if (!this.normalizedLabelsSignal.has(channel)) {
        newChannels.push(channel);
      }
    }

    if (newChannels.length == 0) {
      // Não há novos canais, verificar se os dados que vamos ver antes/seguir existem na cache

      for (const [label, map] of this.normalizedLabelsSignal.entries()) {

        // Remover dados mais "longínquos" da cache

        const minCacheIndex : number = this.initial - this.window_size * this.signalsInSecond - 1;
        // const maxCacheIndex : number = this.initial + 4 * this.window_size * this.signalsInSecond;

        // if (map.has(minCacheIndex))  {
        //   console.log("DÁ PARA REMOVER CACHE ANTERIOR!!!!!!!!")
        //   const array = Array.from({ length: minCacheIndex }, (_, i) => i + 1);
        //   for (let idx of array) indexesToRemove.push(idx);
        // }
      
        // if (map.has(maxCacheIndex)) {
        //   for (let idx = maxCacheIndex; idx <= this.indices; idx++) indexesToRemove.push(idx);
        // }

        console.log(map);

        if (map.has(this.initial+1) && map.has(end)) {

          console.log("HAS DATA :))))))))")

          for (let i = this.initial+1; i <= end; i++) {
            if (!map.has(i)) console.log("MAPA NÃO TEM O " + i)
          }
  
          // Já tem os dados entre o initial - end
  
          let bufferInitial = (channels.length > 25) ? this.initial + Math.floor(this.window_size * this.signalsInSecond) : this.initial + 2 * Math.floor(this.window_size * this.signalsInSecond);
          let bufferEnd : number = (channels.length > 25) ? bufferInitial + Math.floor(this.window_size * this.signalsInSecond) : bufferInitial + 2 * Math.floor(this.window_size * this.signalsInSecond);

          // Se é preciso pedir dados para buffer:

          if (bufferInitial > this.endLimit) {

            console.log("É PRECISO PEDIR AO BUFFER")

            this.endLimit = bufferEnd;
  
            this.getBackendData(this.endLimit,bufferEnd,channels);
  
          }
        } else {

          console.log("NAHHHH")


          end += (channels.length > 25) ? Math.floor(this.window_size * this.signalsInSecond) : 2 * Math.floor(this.window_size * this.signalsInSecond);
          this.getBackendData(this.initial,end,channels);

          this.getBackendData(this.initial, end, channels);
        }

        break;
  
      }
    } else {

      end += (channels.length > 25) ? Math.floor(this.window_size * this.signalsInSecond) : 2 * Math.floor(this.window_size * this.signalsInSecond);

      if (this.endLimit !== undefined) {
        end = this.endLimit;
      }

      this.getBackendData(0, end, newChannels);
    }

    console.log("eegViewer.updateData() ---> ", this.initial)
    this.eeg_viewer.setInitial(this.initial);
    this.eeg_viewer.updateData();


    if (typeof Worker !== "undefined") {
      const worker = new Worker(new URL('./web-worker.worker', import.meta.url));
      worker.onmessage = ({data}) => {
        const normalizedLabelsSignal = data.resp;
        this.normalizedLabelsSignal = normalizedLabelsSignal;
      };
      worker.postMessage({
        indexesToRemove: indexesToRemove,
        normalizedLabelsSignal: this.normalizedLabelsSignal
      });
    }

  }

  getBackendData(initial: number, end: number, channels: any[]){

    if (end > this.indices) {
      end = this.indices - 1;
    }

    this.services.getDataAboutLabel(this.id, channels, this.token, initial, end).subscribe((channelsMap) => {

      this.endLimit = end;

      // Mapa normalizado para o y = 0

      for (const [label, valuesMap] of Object.entries(channelsMap)) {

        for (const [label, valuesMap] of Object.entries(channelsMap)) {
          let mergedMap: Map<Number, Number> = new Map();

        if (this.normalizedLabelsSignal.has(label)) {
          mergedMap = this.normalizedLabelsSignal.get(label)!;
        }

        const channelValues : number[]  = <number[]> Object.values(valuesMap).map(Number); 

        const minValue : number = this.getMin(channelValues)
        const maxValue : number = this.getMax(channelValues)
        const average : number = (minValue + maxValue) / 2;

        for (const [index, value] of Object.entries(valuesMap)) {
          mergedMap.set(Number.parseInt(index), (<number> value) - average);
        }

        this.normalizedLabelsSignal.set(label, mergedMap);

      }}

    });
  }

  getMin(array : number[]) {
    let len = array.length;
    let currentMin = +Infinity;
    while (len--) {
        currentMin = array[len] < currentMin ? array[len] : currentMin;
    }
    return currentMin;
  }


  getMax(array : number[]) {
    let len = array.length;
    let currentMax = -Infinity;
    while (len--) {
        currentMax = array[len] > currentMax ? array[len] : currentMax;
    }
    return currentMax;
  }


  left() {
    this.initial =
      this.initial - Math.floor(this.window_size * this.signalsInSecond);
    if (this.initial < 1) this.initial = 1;
    this.removeSpeedInterval();
    this.getLabelData(this.labels);
  }

  // Dá update dos dados e guarda-os num mapa
  // Passando-os depois para a componente
  updateView() {
    this.updateViewControl = !this.updateViewControl;
    this.initial = this.initial - Math.floor(this.window_size * this.signalsInSecond)
    if (this.initial < 1) this.initial = 1
    this.removeSpeedInterval()
    this.getLabelData(this.labels)
    console.log("left")
    console.log("INITIAL -> " + this.initial + "  " + new Date((this.initial / this.signalsInSecond) * 1000).toISOString().substr(11, 8) )

  }

  right() {
    console.log("right")
    this.initial = this.initial +  Math.floor(this.window_size * this.signalsInSecond)
    if (this.initial > this.indices - Math.floor(this.window_size * this.signalsInSecond)) {
      console.log("chegou ao final, deve ter o ultimo bloco do eeg e parar o gráfico")
      this.initial = this.indices -  Math.floor(this.window_size * this.signalsInSecond);
      //this.getLabelData(this.labels)
      this.pause()
    } else {

      let bufferInitial = (this.labels.length > 25) ? this.initial + Math.floor(this.window_size * this.signalsInSecond) : this.initial + 2 * Math.floor(this.window_size * this.signalsInSecond);
      let bufferEnd : number = (this.labels.length > 25) ? bufferInitial + Math.floor(this.window_size * this.signalsInSecond) : bufferInitial + 2 * Math.floor(this.window_size * this.signalsInSecond);

      if (bufferInitial > this.endLimit) {
        this.endLimit = bufferEnd;
        this.getBackendData(bufferInitial,bufferEnd,this.labels);
      }
      //this.getLabelData(this.labels)
    }
  }

  removeSpeedInterval() {

    for (var id of this.eeg_viewer.lst_intervalId) {
      clearInterval( parseInt(id) );
    }
    if (this.playing) {
      this.eeg_viewer.start();
    }

  }

  play() {
    this.eeg_viewer.start();
    this.playing = !this.playing;
  }

  pause() {
    this.playing = !this.playing;
    this.removeSpeedInterval();
  }

  updateInitial(newInitial : number) {
    this.initial = newInitial;

    if (this.initial > this.indices - Math.floor(this.window_size * this.signalsInSecond)) {
      this.initial = this.indices -  Math.floor(this.window_size * this.signalsInSecond);
      this.pause();

    } else {

      let bufferInitial = (this.labels.length > 25) ? this.initial + Math.floor(this.window_size * this.signalsInSecond) : this.initial + 2 * Math.floor(this.window_size * this.signalsInSecond);
      let bufferEnd : number = (this.labels.length > 25) ? bufferInitial + Math.floor(this.window_size * this.signalsInSecond) : bufferInitial + 2 * Math.floor(this.window_size * this.signalsInSecond);

      if (bufferInitial > this.endLimit) {
        this.endLimit = bufferEnd;
        this.getBackendData(bufferInitial,bufferEnd,this.labels);
      }

    }

  }

  getAnnotations(eeg_id: number) {
    this.EEGservices.getAnotations(eeg_id, this.token).subscribe((info) => {
      this.annotations = info;
      console.log(info);
    });
  }

  checkEeg(eeg_id: number) {}

  checkReport(eeg_id: number) {
    this.reportService.getReport(eeg_id, this.token).subscribe((info) => {
      this.report_progress = info.progress;
      console.log("RELATORIO", this.report.progress);
      this.report_progress = this.report.progress
    });
  }
}
