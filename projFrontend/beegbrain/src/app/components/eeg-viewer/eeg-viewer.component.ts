import * as echarts from 'echarts';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { EEGService } from 'src/app/services/eeg.service';
import { Router } from '@angular/router';
import { EEG } from 'src/app/classes/EEG';
import { throws } from 'assert';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

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
  
  @Input('speed') speed! : number;
  @Input('interval') interval! : number;
  @Input('labelsSignal') labelsSignal! : Map<String, Map<Number,Number>>;
  @Input('eegInfo') eegInfo! : EEG
  @Input('labels') labels! : any;
  @Input('control') control! : boolean;
  @Input('signalsInSecond') signalsInSecond! : number;

  @Output() event = new EventEmitter<Map<string, number>>();

  constructor(private services: EEGService, private router: Router) { }
  
  yData: any[] = [];
  xData: any[] = [];
  tmp!: number;
  initial : number = 0;

  updateSignalsInSignal:number = 0;

  ngOnChanges() {

  }

  ngOnInit() {

    const url_array = this.router.url.split("/");
    let eegId = +url_array[url_array.length - 1];
    let series: any = [];

    for (const [label, valuesMap] of this.labelsSignal) {
      const values = Array.from(valuesMap.values());
      series.push({name:label, type:"line", showSymbol:false, data:values}) 
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
        borderWidth: 1,
        borderColor:"#000000"
      },
      tooltip: {
        show: true,
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
        //name: "Quantity",
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
        //boundaryGap: [0, '100%'], 
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
      series: series
      
      
    };

    // this.start(this.speed);
    // this.changeSpeed(); // This line is to adjust data
    this.option;

    console.log("Initial interval", this.interval)
    console.log("initial index", this.initial)

  }

  /* Esta é a função que vai estar sempre a ser chamada */
  start(speed: number) {

    console.log("start")

    this.intervalId = setInterval(() => {
      
      /* 
      this.myChart.setOption<echarts.EChartsOption>({
        series: [
          {
            //data: this.yData
            // tem de ser atualizado consoante o play do sinal
          }
        ],
        xAxis: {
          data : this.xData
        },
        // dataZoom: {
        //   startValue: this.initial,
        //   endValue: this.initial + this.interval * this.signalsInSecond,
        // }
      });  
      */

    }, speed); // mudar velocidade
    
    this.lst_intervalId.push(this.intervalId);
  }
  
  // Altera o intervalo de tempo
  updateData(initial: number) {
    let min_series: any = [];
    var xData: any = []

    for (const [label, valuesMap] of this.labelsSignal) {
      const keys = Array.from(valuesMap.keys());
      const values = Array.from(valuesMap.values()); 
      
      let end = initial + this.signalsInSecond * this.interval;

      console.log("UPDATE DATA", initial, end)

      const channelBuffer = values.slice(initial, end)
      xData = keys.slice(initial, end)
      console.log(xData);
      
      min_series.push({name:label, type:"line", showSymbol:false, data: channelBuffer})

    }
    
    this.myChart.setOption<echarts.EChartsOption>({

      yAxis: {},

      series: min_series,
     
      xAxis: {
          data : xData,
      },

      /*  
      dataZoom: {
        startValue: initial,
        endValue: initial + this.interval * this.signalsInSecond,
      } 
      */
    });

    console.log("UPDATE DATA", initial)


  }

  // Clicas no botão para frente/tras
  updateDataAndTime(isUp: boolean) {

    console.log("update Data and Time");

    if (isUp) this.updateSignalsInSignal++
    else if (this.updateSignalsInSignal - 1 > 0) this.updateSignalsInSignal--

    /* for (const [label, valuesMap] of Object.entries(this.labelsSignal)) {
      var signalsInWindow = this.signalsInSecond * this.interval;

      if (isUp) {
        const part = valuesMap[label].slice(this.updateSignalsInSignal * signalsInWindow, (this.updateSignalsInSignal+1) * signalsInWindow)

        min_series.push({name:label, type:"line", showSymbol:false, data: part})
        xDataUpdated = this.xData.slice(this.updateSignalsInSignal * signalsInWindow, (this.updateSignalsInSignal+1) * signalsInWindow)
        this.initial = xDataUpdated[0];

      } else {
        const part = valuesMap[label].slice((this.updateSignalsInSignal-1) * signalsInWindow, this.updateSignalsInSignal * signalsInWindow)

        min_series.push({name:label, type:"line", showSymbol:false, data: part})
        xDataUpdated = this.xData.slice((this.updateSignalsInSignal-1) * signalsInWindow, this.updateSignalsInSignal * signalsInWindow)
        this.initial = xDataUpdated[0];
      }
         
    } */

    let min_series: any = [];
    var xData: any = []

    for (const [label, valuesMap] of this.labelsSignal) {
      const keys = Array.from(valuesMap.keys());
      const values = Array.from(valuesMap.values()); 
      
      let end = this.initial + this.signalsInSecond * this.interval;

      const channelBuffer = values.slice(this.initial, end)
      xData = keys.slice(this.initial, end)
      
      min_series.push({name:label, type:"line", showSymbol:false, data: channelBuffer})

    }

    
    this.myChart.setOption<echarts.EChartsOption>({

      // yAxis: {},

      series: min_series,
     
      xAxis: {
        data : xData,
      },

      dataZoom: {
        // startValue: this.initial,
        // endValue: this.initial + this.interval * this.signalsInSecond,
      }

    }); 
  }

  changeSpeed() {
    // clear the existing interval

    console.log("SPEED CHANGED ================= ")

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

