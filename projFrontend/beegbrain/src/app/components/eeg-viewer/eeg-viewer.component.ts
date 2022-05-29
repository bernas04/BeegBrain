import * as echarts from 'echarts';
import { ChangeDetectionStrategy, Component, Input, OnChanges } from '@angular/core';
import { EEGService } from 'src/app/services/eeg.service';
import { Router } from '@angular/router';
import { EEG } from 'src/app/classes/EEG';

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
    let series: any = [];
    let counter=0;

    for (const [key, value] of this.labelsSignal) {
      let str = JSON.stringify(value);
      let b = str.split(':')[1];
      var c = str.split(',').map(function(item) {
        return Math.round(parseFloat(item));
      });
      
      this.yData.push(c);
      series.push({name:key, type:"line", showSymbol:false, data:this.yData[counter]})
      
      counter++;
    }
     
    let xData=[];
    for (let i=0; i< this.eegInfo.duration*1000;i++){
      xData.push(i);
    }
    
    setTimeout(() => {
      this.chartDom = document.getElementById('chart')!;
      this.myChart = echarts.init(this.chartDom);
    }, 100);

    this.option = {
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
        name: "x",
        type: "category",
        minorTick: {
          show: true
        },
        splitLine: {
          lineStyle: {
            color: "#999"
          },
          show: true,
        },
        minorSplitLine: {
          show: true,
          lineStyle: {
            color: "#ddd"
          }
        }
      },
      yAxis: {
        name : 'Value',
        type: 'value',
        boundaryGap: [0, '100%'], 
        minorTick: {
          show: true
        },
        splitLine: {
          lineStyle: {
            color: ['#ccc'],
            width: 0.5,
            type: 'solid'
          },
          show: true
        },
        minorSplitLine: {
          show: true,
          lineStyle: {
            color: "#ddd"
          }
        }

      },
      darkMode: true,
      series: series
      
      
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
