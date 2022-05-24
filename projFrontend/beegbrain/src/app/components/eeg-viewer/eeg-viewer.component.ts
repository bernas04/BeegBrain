import {
  TitleComponent,
  TitleComponentOption,
  TooltipComponent,
  TooltipComponentOption,
  GridComponent,
  GridComponentOption
} from 'echarts/components';
import { LineSeriesOption } from 'echarts/charts';
import * as echarts from 'echarts';
import { ChangeDetectionStrategy, Component, Input, OnChanges } from '@angular/core';
import { DataItem } from './DataItem';
import { Options } from '@angular-slider/ngx-slider';
import { EEGService } from 'src/app/services/eeg.service';
import { Router } from '@angular/router';
import { EEG } from 'src/app/classes/EEG';

type EChartsOption = echarts.ComposeOption<
  | TitleComponentOption
  | TooltipComponentOption
  | GridComponentOption
  | LineSeriesOption
>;

@Component({
    selector: 'app-eeg-viewer',
    templateUrl: './eeg-viewer.component.html',
    styleUrls: ['./eeg-viewer.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EEGViewerComponent implements OnChanges {

  chartDom! : HTMLElement;
  myChart! : echarts.ECharts;
  option!: echarts.EChartsOption;
  intervalId! : any;
  lst_intervalId: any[] = [];
  
  @Input('speed') speed!: number;
  @Input('interval') interval!: number;
  @Input('labelsSignal') labelsSignal!: any;
  @Input('eegInfo') eegInfo!: EEG

  
  constructor(private services:EEGService, private router:Router) { }
  
  yData: number[] = [];
  xData: string[] = [];
  seconds = 0;

  ngOnChanges(model: any) {
    this.changeSpeed();
  }
  


  ngOnInit() {
    const url_array = this.router.url.split("/");
    let eegId = +url_array[url_array.length - 1];
    

    for (const [key, value] of this.labelsSignal) {
      let str = JSON.stringify(value);
      let b = str.split(':')[1];
      
      var c = str.split(',').map(function(item) {
        return parseFloat(item);
      });
      c.shift(); // Martelada
      this.yData = c;
    }
    
    let xData=[];
    // Martelada máxima para o eixo dos x, btw, não funciona
    console.log("Tamanho do eixo dos y: " + this.yData.length);

    let init = new Date(this.eegInfo.timestamp);
    xData.push(init.getTime() * 1000); // milissegundos

    for (let i=0; i <= this.eegInfo.duration*1000; i++){
      let tmp = init.getTime() + i;
      xData.push(new Date(tmp).getTime())
    }
    

    // Wait for DOM to load (maybe use other NG event)!!!! ngOnDomLoaded or something
    setTimeout(() => {
      this.chartDom = document.getElementById('chart')!;
      this.myChart = echarts.init(this.chartDom);
    }, 500);

    this.option = {
      title: {
        text: 'EEG',
        subtext: 'EEG exam',
        textStyle: {
          fontFamily: "Arial",
          fontSize: 20,
          fontWeight: "bolder"
        }
      },
      animation: true,
      grid: {
        show: true,
        //backgroundColor: "black",
        borderWidth: 10
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          animation: false
        }
      },
      toolbox: {
        show: true,
        orient: "horizontal",
        itemSize: 20,
        itemGap: 10,
        feature: {
          dataZoom: {
            show: true
          },
          restore: {
            show: true
          }
        }
      },
      xAxis: {
        type: 'category',
        //data: xData,
      },
      yAxis: {
        name : 'Value',
        type: 'value',
        boundaryGap: [0, '100%'], // min: 0 , max: o máximo do sinal
        splitLine: {
          lineStyle: {
            color: ['#ccc'],
            width: 0.5,
            type: 'solid'
          },
          show: true
        }
      },
      darkMode: true,
      series: [
        {
          name: 'Value',
          type: 'line',
          showSymbol: false,
          data: this.yData,
          
        }
      ]
      
    };
    this.start(this.speed);
    this.changeSpeed(); // This line is to adjust data
    this.option;
  }


  randomData(): number {
    this.seconds++;
    return this.seconds;
  }

  /* Esta é a função que vai estar sempre a ser chamada */
  start(speed: number) {
    this.intervalId = setInterval(() => {
      //this.yData = []
      let convertedInterval = Math.floor(this.interval/10);
      this.yData=[];
      this.xData=[];

      for (let i=0;i<3;i++){
        this.yData.push();
        this.xData.push();

      }
      
      this.myChart.setOption<echarts.EChartsOption>({
        series: [
          {
            //data: this.yData
          }
        ],
        xAxis: {
            //data : this.xData
        },
      }); 

    }, speed); // mudar velocidade
    
    this.lst_intervalId.push(this.intervalId);
  }


  changeSpeed() {
    // clear the existing interval

    for (var id in this.lst_intervalId)
      clearInterval( parseInt(id) );

    clearInterval( this.intervalId );

    // just start a new one
    this.start(this.speed);
  }

}
