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
  @Input('labels') labels!: any;
  @Input('control') control!: boolean;

  
  constructor(private services:EEGService, private router:Router) { }
  
  yData: any[] = [];
  xData: string[] = [];
  seconds = 0;

  ngOnChanges(model: any) {
    this.changeSpeed();
  }
  
  notification(){
    //isto está a funcionar
    console.log(this.labels);
  }

  ngOnInit() {
    const url_array = this.router.url.split("/");
    let eegId = +url_array[url_array.length - 1];
    /* series: [
      {
        name: 'Value',
        type: 'line',
        showSymbol: false,
        data: this.yData[0],
        
      },
      {
        name: 'Value',
        type:'line',
        showSymbol: false,
        data: this.yData[1],
      }
    ] 
    */
    
    let tmp_series: any = [];
    let contador=0;

    for (const [key, value] of this.labelsSignal) {
      let str = JSON.stringify(value);
      let b = str.split(':')[1];
      var c = str.split(',').map(function(item) {
        return Math.round(parseFloat(item));
      });
      
      this.yData.push(c);
      tmp_series.push({name:key, type:"line", showSymbol:false, data:this.yData[contador]})
      
      contador++;
    }
    

    //Martelada para o eixo dos x    
    let xData=[];
    for (let i=0; i< this.eegInfo.duration*1000;i++){
      xData.push(i);
    }
    
    // Wait for DOM to load (maybe use other NG event)!!!! ngOnDomLoaded or something
    setTimeout(() => {
      this.chartDom = document.getElementById('chart')!;
      this.myChart = echarts.init(this.chartDom);
    }, 500);

    this.option = {
      title: {
        /* text: 'EEG',
        subtext: 'Electroencephalogram exam',
        textStyle: {
          fontFamily: "Arial",
          fontSize: 20,
          fontWeight: "bolder"
        } */
      },
      animation: true,
      grid: {
        show: true,
        backgroundColor: "#f5f5f5",
        borderWidth: 2,
        borderColor:"#000000"
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
        itemSize: 15,
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
      dataZoom: [
        {
            id: 'dataZoomX',
            type: 'slider',
            xAxisIndex: [0],
            filterMode: 'filter'
        },
        {
            id: 'dataZoomY',
            type: 'slider',
            yAxisIndex: [0],
            filterMode: 'empty'
        }
      ],
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
      series: tmp_series
      
      
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
