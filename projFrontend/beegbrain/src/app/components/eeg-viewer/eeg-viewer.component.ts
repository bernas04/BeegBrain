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

  @Input('speed') speed!: number;
  intervalId! : any;
  lst_intervalId: any[] = [];

  @Input('interval') interval!: number;
  @Input('eegInfo') eegInfo!: Object;
  @Input('labelsSignal') labelsSignal!: any;

  
  yData: number[] = [];
  xData: string[] = [];
  now = new Date(1997, 9, 3);
  oneDay = 24 * 3600 * 1000;
  value = Math.random() * 1000;
  seconds = 0;
  control = true;

  ngOnChanges(model: any) {
    this.changeSpeed();
  }
  


  ngOnInit() {
    // Wait for DOM to load (maybe use other NG event)!!!! ngOnDomLoaded or something
    setTimeout(() => {
      this.chartDom = document.getElementById('chart')!;
      this.myChart = echarts.init(this.chartDom);
    }, 500);
    // Vai gerar dados este número de vezes

    for (let i = 0; i < 3; i++) {
      this.yData.push(this.randomData());
      this.xData.push(this.weekDays());
    }

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
        data: this.xData,
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

  weekDays() : string{
    let days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    return days[this.seconds%days.length]
  }

 

  /* Esta é a função que vai estar sempre a ser chamada */
  start(speed: number) {
    
    this.intervalId = setInterval(() => {
      //this.yData = []
      let convertedInterval = Math.floor(this.interval/10);
      this.yData=[];
      this.xData=[];
      for (let i = 0; i < convertedInterval; i++) {
        // O shift remove o elemento que se encontra na cabeça da ArrayList e retorna esse mesmo elemento
        this.yData.push(this.randomData());
        this.xData.push(this.weekDays());

      }
      
      //console.log(parseInt(this.data[0].value[0]))
      //let minvalue = parseInt(this.data[0].value[0])
      this.myChart.setOption<echarts.EChartsOption>({
        series: [
          {
            data: this.yData
          }
        ],
        xAxis: {
            data : this.xData
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
