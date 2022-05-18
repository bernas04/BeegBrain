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
  
  data: DataItem[] = [];
  now = new Date(1997, 9, 3);
  oneDay = 24 * 3600 * 1000;
  value = Math.random() * 1000;
  seconds = 0;

  ngOnChanges(model: any) {
    this.changeSpeed();
  }

  ngOnInit(): void {

    // Wait for DOM to load (maybe use other NG event)!!!! ngOnDomLoaded or something
    setTimeout(() => {
      this.chartDom = document.getElementById('chart')!;
      this.myChart = echarts.init(this.chartDom);
    },500);

    for (let i = 0; i < 1000; i++) {
      this.data.push(this.randomData());
    }
    
    this.option = {
      title: {
        text: 'EEG',
        subtext: 'Electroencephalogram exam',
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
        formatter: function (params: any) {
          params = params[0];
          return ('timestamp: ' + 
            params.value[0] +
            ' : ' + 'value: ' +
            params.value[1]
          );
        },
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
        type: 'time',
        splitLine: {
          show: true
        },
        axisPointer: {

        }
      },
      yAxis: {
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
          name: 'Fake Data',
          type: 'line',
          showSymbol: false,
          data: this.data,
          
        }
      ]
    };

    this.start(this.speed);

    /* 

    setInterval(() => {

      console.log("int speed", this.speed)

      for (let i = 0; i < 5; i++) {
        this.data.shift();
        this.data.push(this.randomData());
      }
  
      this.myChart.setOption<echarts.EChartsOption>({
        series: [
          {
            data: this.data
          }
        ]
      }); 

    }, this.speed); // mudar velocidade 
    
    */

    this.option && this.myChart.setOption(this.option);

  }


  randomData(): DataItem {
    this.seconds++;
    this.value = this.value + Math.random() * 21 - 10;
    
    return {
      name: this.seconds.toString(),
      value: [
        this.seconds.toString(),
        Math.round(this.value)
      ]
    };
  }


  start(speed: number) {

    this.intervalId = setInterval(() => {

      for (let i = 0; i < 5; i++) {
        this.data.shift();
        this.data.push(this.randomData());
      }
  
      this.myChart.setOption<echarts.EChartsOption>({
        series: [
          {
            data: this.data
          }
        ]
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
