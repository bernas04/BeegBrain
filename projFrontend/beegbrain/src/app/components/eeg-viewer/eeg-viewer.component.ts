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
<<<<<<< HEAD
  @Input('initial') initial! : number;
  @Input('indices') indices! : number;

  @Output() currentInitial = new EventEmitter<any>();
=======
  @Input('updateViewControl') updateViewControl! : boolean;

  @Output() newItemEvent = new EventEmitter<boolean>();
  @Output() event = new EventEmitter<Map<string, number>>();
>>>>>>> da376ba1fd2b8846ea2b661c5e857c75e11be6a8

  yData: any[] = [];
  xData: any[] = [];
  tmp!: number;

  updateSignalsInSignal:number = 0;

  constructor(private services: EEGService, private router: Router) { }
  

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
      console.log("Values " ,values)
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
          handleSize: '100%',
          startValue: this.initial,
          endValue: this.initial + this.interval * this.signalsInSecond,
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
<<<<<<< HEAD

    this.start();
=======
     
    this.start(this.speed);
>>>>>>> da376ba1fd2b8846ea2b661c5e857c75e11be6a8
    this.changeSpeed(); // This line is to adjust data
    this.option;

  }

  /* Esta é a função que vai estar sempre a ser chamada */
<<<<<<< HEAD
  start() {

    this.intervalId = setInterval(() => {

      this.updateData();
      this.initial += this.speed;
      this.currentInitial.emit(this.initial);
=======
  start(speed: number) {


    this.intervalId = setInterval(() => {

      let series: any = [];

      var xData: any = []

      for (const [label, valuesMap] of this.labelsSignal) {
        xData = Array.from(valuesMap.keys()).slice(this.initial, this.initial + Math.floor(this.interval*this.signalsInSecond));
        const values = Array.from(valuesMap.values()).slice(this.initial, Math.floor(this.interval * this.signalsInSecond));
        series.push({name:label, type:"line", showSymbol:false, data:values}) 
      }

>>>>>>> da376ba1fd2b8846ea2b661c5e857c75e11be6a8

  
    }, 0.05); 
    
    this.lst_intervalId.push(this.intervalId);

  }
  
  // Altera o intervalo de tempo | Clicar para frente/trás
  updateData() {

    let min_series: any = [];

    var xData: any = [...Array(this.indices).keys()]

    for (const [label, valuesMap] of this.labelsSignal) {
      const keys = Array.from(valuesMap.keys());
      const values = Array.from(valuesMap.values()); 
    
      let end = this.initial + this.signalsInSecond * this.interval;

      const channelBuffer = values.slice(this.initial, end)
      //xData = keys.slice(this.initial, end)

      min_series.push({name: label, type: "line", showSymbol: false, data: channelBuffer})

    }
    
    this.myChart.setOption<echarts.EChartsOption>({

      yAxis: {},

      series: min_series,
     
      xAxis: {
          data : xData,
      },
       
      // dataZoom: {
      //   startValue: this.initial,
      //   endValue: this.initial + this.interval * this.signalsInSecond,
      // } 
    
    });


  }

  changeSpeed() {
    // clear the existing interval

    console.log("SPEED CHANGED ================= ")
    console.log(this.speed)

    for (var id in this.lst_intervalId)
      clearInterval( parseInt(id) );

    clearInterval( this.intervalId );

    // just start a new one
    this.start();
  }

  updateViewWithData(mapOfValues: Map<String, Map<Number, Array<number>>>, control:boolean){
    if (control){
      let ySeries: any = [];
      let contador = 0;
  
      for (const [key, valueMap] of mapOfValues){
        let label = key
        let initialValue= Array.from(valueMap.keys());
        let updatedValue = Array.from(valueMap.values());
  
        ySeries.push({name:label, type:"line", showSymbol:false, data:updatedValue[contador++]}) 
      }
      
      for (var id in this.lst_intervalId)
        clearInterval( parseInt(id) );
  
      clearInterval( this.intervalId );
  
  
      this.myChart.setOption<echarts.EChartsOption>({
  
        yAxis: {},
  
        series: ySeries,
  
        xAxis: {
        },
       
      });
      this.updateViewControl=false;
      this.newItemEvent.emit(this.updateViewControl);
    }
    else{
      this.updateViewControl=true;
      this.newItemEvent.emit(this.updateViewControl);
      this.start(this.speed)
    }

  }

}
function OutPut() {
  throw new Error('Function not implemented.');
}

