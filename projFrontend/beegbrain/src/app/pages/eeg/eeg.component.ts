import { Options } from '@angular-slider/ngx-slider';
import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { ChannelService } from 'src/app/services/channel.service';
import { Router } from '@angular/router';
import { EEGService } from 'src/app/services/eeg.service';
import { EEG } from 'src/app/classes/EEG';
import { EEGViewerComponent } from 'src/app/components/eeg-viewer/eeg-viewer.component';
import { Report } from 'src/app/classes/Report';
import { Annotation } from 'src/app/classes/Annotation';
import { ReportService } from 'src/app/services/report.service';
import { PatientsService } from 'src/app/services/patients.service';
import { Patient } from 'src/app/classes/Patient';


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
  selectedOption!: Annotation;
  selected: string = '';
  patient!: Patient;
  age!:string
  averageEachChannel: Map<string,number> = new Map();
  normalizedLabelsSignal : Map<String,Map<Number,Number>> = new Map();
  playing: boolean = true;
  dropdownSelect : boolean = false;


  speed: number = 10; // default : 0.1 segundo
  options: Options = {
    floor: 1,
    ceil: 100,
    step: 1,
    rightToLeft: false,
    translate: (value: number): string => {
      if (value == 1) return "<img src='../../../assets/snail.svg' style='width:20px; background' alt='more speed'>";
      if (value == 100) return "<img src='../../../assets/rabbit.svg' style='width:20px' alt='more speed'>";
      return ''
    },
  };

  constructor(
    private services: ChannelService,
    private router: Router,
    private EEGservices: EEGService,
    private patientsService: PatientsService
  ) {}

  ngOnInit() {

    const url_array = this.router.url.split("/");
    let eegId = +url_array[url_array.length - 1];
    this.id = eegId;

    this.getLabelsFromEEG(eegId);
    this.getInformation(eegId);
    this.getAnnotations(eegId);

    this.dropdownSettings = {
      singleSelection: false,
      idField: "item_id",
      textField: "item_text",
      selectAllText: "Select all",
    };

  }

  getInformation(eegId: number): any {
    this.EEGservices.getEEGinfo(eegId, this.token).subscribe((info) => {
      this.eegInfo = info;
      this.getPatientInfo();
      this.EEGservices.getEEGlength(this.id, this.token).subscribe((indices) => {
        this.indices = <number> indices;
        this.signalsInSecond = <number> indices / this.eegInfo.duration;
      })
    });
  }

  getLabelsFromEEG(eegId: number) {
    this.services.getLabelsFromEEG(eegId, this.token).subscribe((info) => {
      this.dropdownList = info;
    });
  }


  onItemSelect(item : any) {
    this.dropdownSelect = true;
    this.labels.push(item);
    this.getLabelData(this.labels);
    this.control = false;
  }

  onDropDownClose(item: any) {

    if (this.dropdownSelect) {
      this.control = true;
      this.dropdownSelect = false;
    }

  }

  onItemDeselect(item : any){
    this.dropdownSelect = true;
    let indx = this.labels.indexOf(item);
    if (this.labels.length == 1) {
      this.labels = [];
    } else {
      this.labels.splice(indx, 1);
    }
    this.normalizedLabelsSignal.delete(item);
    this.control = false;
  }

  getInputValue(event: any) {
    this.window_size = event.target.value;
    this.getLabelData(this.labels);
  }

  getLabelData(channels: String[]) {
    let end = this.initial + Math.floor(this.window_size * this.signalsInSecond)
    let newChannels : String[] = [];
    
    //let indexesToRemove : number[] = [];


    // Ver se h?? novos canais adicionados e pedir informa????o sobre os mesmos
    for (const channel of channels) {

      if (!this.normalizedLabelsSignal.has(channel)) {
        newChannels.push(channel);
      }
    }

    if (newChannels.length == 0) {
      // N??o h?? novos canais, verificar se os dados que vamos ver antes/seguir existem na cache

      for (const [label, map] of this.normalizedLabelsSignal.entries()) {

        if (map.has(this.initial+1) && map.has(end)) {
  
          // J?? tem os dados entre o initial - end
  
          let bufferInitial = (channels.length > 25) ? this.initial + Math.floor(this.window_size * this.signalsInSecond) : this.initial + 2 * Math.floor(this.window_size * this.signalsInSecond);
          let bufferEnd : number = (channels.length > 25) ? bufferInitial + Math.floor(this.window_size * this.signalsInSecond) : bufferInitial + 2 * Math.floor(this.window_size * this.signalsInSecond);

          // Se ?? preciso pedir dados para buffer:

          if (bufferInitial > this.endLimit) {


            this.endLimit = bufferEnd;
  
            console.log("GET LABEL DATA -> GET BACKEND DATA")

            this.getBackendData(this.endLimit,bufferEnd,channels);
  
          }

        } else {

          end += (channels.length > 25) ? Math.floor(this.window_size * this.signalsInSecond) : 2 * Math.floor(this.window_size * this.signalsInSecond);
          console.log("drrrrrr pow")
          this.getBackendData(this.initial,end,channels);

        }

        break;
  
      }
    } else {

      end += (channels.length > 25) ? Math.floor(this.window_size * this.signalsInSecond) : 2 * Math.floor(this.window_size * this.signalsInSecond);

      if (this.endLimit !== undefined) {
        end = this.endLimit;
      }

      console.log("asjiajsiwjdijwidjwd")
      this.getBackendData(0, end, newChannels);
    }

    this.eeg_viewer.setInitial(this.initial);
    this.eeg_viewer.updateData();

  }

  getBackendData(initial: number, end: number, channels: any[]){

    console.log("END", end)
    if (end === NaN){
      return;
    }

    if (end > this.indices) {
      end = this.indices - 1;
    }
    
    console.log("END", end)

    console.log("[API] Pediu entre o " + initial + " | " + end);

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

        this.averageEachChannel.set(label, average);

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

  // D?? update dos dados e guarda-os num mapa
  // Passando-os depois para a componente
  updateView() {
    this.updateViewControl = !this.updateViewControl;
    this.initial = this.initial - Math.floor(this.window_size * this.signalsInSecond)
    if (this.initial < 1) this.initial = 1
    this.removeSpeedInterval()
    this.getLabelData(this.labels)

  }

  right() {
    this.initial = this.initial +  Math.floor(this.window_size * this.signalsInSecond)
    if (this.initial > this.indices - Math.floor(this.window_size * this.signalsInSecond)) {
      this.initial = this.indices -  Math.floor(this.window_size * this.signalsInSecond);
      //this.getLabelData(this.labels)
      this.pause()
    } else {

      let bufferInitial = (this.labels.length > 25) ? this.initial + Math.floor(this.window_size * this.signalsInSecond) : this.initial + 2 * Math.floor(this.window_size * this.signalsInSecond);
      let bufferEnd : number = (this.labels.length > 25) ? bufferInitial + Math.floor(this.window_size * this.signalsInSecond) : bufferInitial + 2 * Math.floor(this.window_size * this.signalsInSecond);

      if (bufferInitial > this.endLimit) {
        console.log("bufferInitial > this.endLimit")
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

      if (bufferInitial > this.endLimit && bufferInitial < this.indices) {
        this.endLimit = bufferEnd;
        this.getBackendData(bufferInitial,bufferEnd,this.labels);
      }

    }

  }

  getAnnotations(eeg_id: number) {
    this.EEGservices.getAnotations(eeg_id, this.token).subscribe((info) => {
      this.annotations = info;
      console.log("ANOTA????ES",info);
    });

  }

  getPatientInfo() {
    console.log("Patient ", +this.eegInfo)
    this.patientsService.getPatientbyId(+this.eegInfo.patient, this.token).subscribe((info) => {
      this.patient = info;

      console.log("type", typeof(this.patient.birthday))
      console.log("birthday", this.patient.birthday)
      this.age = this.getAge(''+this.patient.birthday)
    });
  }

  getAge(bday: string) {
    var today = new Date()
    var birthday = new Date(bday)
    var age = today.getFullYear() - birthday.getFullYear()
    var m = today.getMonth() - birthday.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthday.getDate()) ) age--;
    return ''+age
  }

}