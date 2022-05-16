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
import { Component } from '@angular/core';
import { DataItem } from './DataItem';
import { TreemapValueMappingMode_$type } from 'igniteui-angular-charts';



type EChartsOption = echarts.ComposeOption<
  | TitleComponentOption
  | TooltipComponentOption
  | GridComponentOption
  | LineSeriesOption
>;

@Component({
    selector: 'app-eeg-viewer',
    templateUrl: './eeg-viewer.component.html',
    styleUrls: ['./eeg-viewer.component.css']
})
export class EEGViewerComponent {

  chartDom! : HTMLElement;
  myChart! : echarts.ECharts;
  option!: echarts.EChartsOption;


  data: DataItem[] = [];
  now = new Date(1997, 9, 3);
  oneDay = 24 * 3600 * 1000;
  value = Math.random() * 1000;

  ngOnInit(): void {

    // Wait for DOM to load (maybe use other NG event)!!!! ngOnDomLoaded or something
    setTimeout(() => {
      this.chartDom = document.getElementById('chart')!;
      this.myChart = echarts.init(this.chartDom);
    },1000);

    console.log(document.getElementById('chart'));

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
          var date = new Date(params.name);
          return (
            date.getDate() +
            '/' +
            (date.getMonth() + 1) +
            '/' +
            date.getFullYear() +
            ' : ' +
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

    setInterval(() => {

      for (let i = 0; i < 5; i++) {
        this.data.shift();
        this.data.push(this.randomData());
      }

      console.log(this.myChart);
  
      this.myChart.setOption<echarts.EChartsOption>({
        series: [
          {
            data: this.data
          }
        ]
      }); 

    }, 1000); // mudar velocidade

    this.option && this.myChart.setOption(this.option);

  }


  randomData(): DataItem {
    this.now = new Date(+this.now + this.oneDay);
    this.value = this.value + Math.random() * 21 - 10;
    return {
      name: this.now.toString(),
      value: [
        [this.now.getFullYear(), this.now.getMonth() + 1, this.now.getDate()].join('/'),
        Math.round(this.value)
      ]
    };
  }
}
