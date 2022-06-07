import * as echarts from 'echarts';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
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
  yData: any[] = [];
  xData: any[] = [];
  tmp!: number;
  
  @Input('speed') speed! : number;
  @Input('interval') interval! : number;
  @Input('labelsSignal') labelsSignal! : Map<String, Map<Number,Number>>;
  @Input('normalizedLabelsSignal') normalizedLabelsSignal! : Map<String, Map<Number,Number>>;
  @Input('eegInfo') eegInfo! : EEG
  @Input('labels') labels! : any;
  @Input('control') control! : boolean;
  @Input('signalsInSecond') signalsInSecond! : number;
  @Input('initial') initial! : number;
  @Input('indices') indices! : number;
  @Input('updateViewControl') updateViewControl! : boolean;

  @Output() currentInitial = new EventEmitter<any>();
  @Output() newItemEvent = new EventEmitter<boolean>();

  constructor(private router: Router) { }
  
  ngOnChanges(changes : SimpleChanges) {
    if (changes['speed']) this.changeSpeed()
  }

  ngOnInit() {

    const url_array = this.router.url.split("/");
    let eegId = +url_array[url_array.length - 1];
    let series: any = [];
     
    this.xData = Array.from(Array(this.tmp).keys());
    
    setTimeout(() => {
      this.chartDom = document.getElementById('chart')!;
      this.myChart = echarts.init(this.chartDom);
    }, 100);
    
    for (const [label, valuesMap] of this.labelsSignal) {
      const values = Array.from(valuesMap.values()).slice(this.initial, Math.floor(this.interval * this.signalsInSecond));
      series.push({name:label, type:"line", showSymbol:false, data:values}) 
    }

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
          filterMode: 'empty'
        },
        {
          id: 'dataZoomY',
          type: 'slider',
          yAxisIndex: [0],
          filterMode: 'empty'
        },
        //mexer com o rato dentro do grafico
        {
          type: 'inside'
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

    this.start();
    this.changeSpeed(); // This line is to adjust data
    this.option;

  }

  /* Esta é a função que vai estar sempre a ser chamada */
  start() {

    this.intervalId = setInterval(() => {

      this.updateData();
      this.initial += this.speed;
      this.currentInitial.emit(this.initial);

    }, 4);  // 4 ms -> minimum delay value
    
    this.lst_intervalId.push(this.intervalId);

  }
  
  // Altera o intervalo de tempo | Clicar para frente/trás
  updateData() {

    let series: any = [];

    // var xData: any = [...Array(this.indices).keys()]

    var xData: any = []

    let signalsMap! : Map<String,Map<Number,Number>>;

    let minY : number = +Infinity;
    let maxY : number = -Infinity;

    if (this.updateViewControl) {

      signalsMap = this.normalizedLabelsSignal;

    } else {

      signalsMap = this.labelsSignal;

    }

    // limitar o eixo do y para manter tudo mais estável

    for (const [label, valuesMap] of signalsMap) {

      const values = <number[]> Array.from(valuesMap.values()); 
    
      const minValue : number = Math.min(...values)
      const maxValue : number = Math.max(...values)

      minY = (minValue < minY) ? minValue : minY;
      maxY = (maxValue > maxY) ? maxValue : maxY;

    }

    for (const [label, valuesMap] of signalsMap) {
      
      const keys = Array.from(valuesMap.keys());
      const values = Array.from(valuesMap.values()); 
    
      let end = this.initial + this.signalsInSecond * this.interval;

      let channelBuffer = values.slice(this.initial, end)

      xData = keys.slice(this.initial, end)

      series.push({name: label, type: "line", showSymbol: false, data: channelBuffer})

    }
    
    this.myChart.setOption<echarts.EChartsOption>({

      yAxis: { 
        min: Math.round(minY - 20), 
        max: Math.round(maxY + 20),
      },

      series: series,
     
      xAxis: {
          data : xData,
      },
    
    });

  }

  changeSpeed() {

    for (var id of this.lst_intervalId) {
      clearInterval( parseInt(id) );
    }
    clearInterval( this.intervalId );

    this.start();
  }

}

