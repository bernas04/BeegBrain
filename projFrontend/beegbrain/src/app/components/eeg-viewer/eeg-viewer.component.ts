import * as echarts from 'echarts';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
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
  @Output() new_interval = new EventEmitter<number>();

  
  constructor(private services:EEGService, private router:Router) { }
  
  yData: any[] = [];
  xData: any[] = [];
  tmp!: number;

  updateSignalsInSignal:number=0;


  ngOnChanges(model: any) {
    this.changeSpeed();
    this.new_interval.emit(this.interval);
    this.updateData();
  }
  
  /* 
  notification(){
    //isto está a funcionar
    console.log(this.labels);
  } */

  ngOnInit() {
    const url_array = this.router.url.split("/");
    let eegId = +url_array[url_array.length - 1];
    let series: any = [];
    let counter=0;

    
    
    for (const [key, value] of this.labelsSignal) {
      var signalsInWindow = (value[key].length/ this.eegInfo.duration)*this.interval;
      this.tmp = value[key].length;
      value[key] = value[key].map(function(each_element: string){
        return Number.parseFloat(each_element).toFixed(2);
      });

      
      this.yData.push(value[key]);
      var values = this.yData[counter].slice(0,signalsInWindow)
      series.push({name:key, type:"line", showSymbol:false, data:values})

      counter++;
    }
     
    this.xData = Array.from(Array(this.tmp).keys());
    
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
          animation: false,
          lineStyle: {
            color: '#ff0000'
          }
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
        name: "Quantity",
        type: "category",
        minorTick: {
          show: true,
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
          show: true,
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

  /* Esta é a função que vai estar sempre a ser chamada */
  start(speed: number) {
    this.intervalId = setInterval(() => {
      
      
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
  
  updateData() {
    let min_series: any = [];
    
    console.log("Função de updateData " , this.interval);

    for (const [key, value] of this.labelsSignal) {
      /* this.yData.push(value[key]); */
      var signalsInWindow = (value[key].length/ this.eegInfo.duration)*this.interval;
      const firstHalf = value[key].slice(0, signalsInWindow-1)

      min_series.push({name:key, type:"line", showSymbol:false, data: firstHalf})
    }


    this.myChart.setOption<echarts.EChartsOption>({
      yAxis:{
        /* data: min_series, */
      },

      series: min_series,
     
      xAxis: {
          /* data : dataX, */
      },
    }); 
  }

  updateDataAndTime(isUp: boolean) {
    let min_series: any = [];
    let xDataUpdated: any =[];

    /* let velhice = <echarts.EChartsOption[]>this.myChart.getOption()["dataZoom"];
    console.log(velhice)
    let velhice1 = velhice[0];

    let endValue = <number>velhice1['endValue'];
    let startValue = <number>velhice1['startValue'];

    console.log(velhice1['endValue']);
    console.log(velhice1['startValue']);

    for (const [key, value] of this.labelsSignal) {
      var signalsInWindow = (value[key].length/ this.eegInfo.duration)*this.interval;

      const part = value[key].slice(endValue, endValue + signalsInWindow)
      console.log("PART: ", part)

      min_series.push({name:key, type:"line", showSymbol:false, data: part})
      xDataUpdated = this.xData.slice(endValue, endValue + signalsInWindow)
    } */
    
    // esta ratisse está mal porque quando 
    // se faz zoom os dados ficam dessincronizados
    // ou quando se altera o tamenho o eixo do x isto vai com o pylance

    if (isUp) this.updateSignalsInSignal++
    else if (this.updateSignalsInSignal - 1 > 0) this.updateSignalsInSignal--

    for (const [key, value] of this.labelsSignal) {
      var signalsInWindow = (value[key].length/ this.eegInfo.duration)*this.interval;

      if (isUp) {
        const part = value[key].slice(this.updateSignalsInSignal * signalsInWindow, (this.updateSignalsInSignal+1) * signalsInWindow)

        min_series.push({name:key, type:"line", showSymbol:false, data: part})
        xDataUpdated = this.xData.slice(this.updateSignalsInSignal * signalsInWindow, (this.updateSignalsInSignal+1) * signalsInWindow)

      } else {
        const part = value[key].slice((this.updateSignalsInSignal-1) * signalsInWindow, this.updateSignalsInSignal * signalsInWindow)

        min_series.push({name:key, type:"line", showSymbol:false, data: part})
        xDataUpdated = this.xData.slice((this.updateSignalsInSignal-1) * signalsInWindow, this.updateSignalsInSignal * signalsInWindow)
      }
         
    }
    
    
    
    this.myChart.setOption<echarts.EChartsOption>({
      yAxis: {},

      series: min_series,
     
      xAxis: {
          data : xDataUpdated,
      },
    }); 
  }

/* 
  onDataZoom(): void {
    const dataZoom = this.myChart.getOption().dataZoom[0];
    console.log(
      dataZoom.startValue, // You may need to format your output. Mine is a date as number.
      dataZoom.endValue
    );
    // Here you can filter your data and update your chart data.
  } */


  changeSpeed() {
    // clear the existing interval

    for (var id in this.lst_intervalId)
      clearInterval( parseInt(id) );

    clearInterval( this.intervalId );

    // just start a new one
    this.start(this.speed);
  }

}
function OutPut() {
  throw new Error('Function not implemented.');
}

