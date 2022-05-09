import { ChangeDetectionStrategy, Component } from "@angular/core";
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexTitleSubtitle,
  ApexDataLabels,
  ApexFill,
  ApexMarkers,
  ApexYAxis,
  ApexXAxis,
  ApexTooltip
} from "ng-apexcharts";
import { interval, takeWhile } from "rxjs";
import { dataSeries } from "./data-series";

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-eeg-viewer',
    templateUrl: './eeg-viewer.component.html',
    styleUrls: ['./eeg-viewer.component.css']
  })
export class EEGViewerComponent {
    
    public series!: ApexAxisChartSeries;
    public chart!: ApexChart;
    public dataLabels!: ApexDataLabels;
    public markers!: ApexMarkers;
    public title!: ApexTitleSubtitle;
    public fill!: ApexFill;
    public yaxis!: ApexYAxis;
    public xaxis!: ApexXAxis;
    public tooltip!: ApexTooltip;
    public frequency: Number[] = [];
  
    constructor() {
      this.initChartData();
      this.updateData();
    }

    public updateData() {
      interval(1000)
      .pipe(takeWhile(() => !stop))
      .subscribe(() => {
        const num = Math.floor(Math.random() * (119 + 1))
        this.frequency.push(dataSeries[1][num].value)
      });
    }
  
    public initChartData(): void {
      let ts2 = 1484418600000;
      let dates = [];
      let frequency = [];
      
      for (let i = 0; i < 120; i++) {
        //ts2 = ts2 + 86400000;
        frequency.push(dataSeries[1][i].value)
        //dates.push([ts2, dataSeries[1][i].value]);
        //this.series.push({ name: "ts2" , data: dataSeries[1][i].value })
      }

        // console.log(dates);
  
      this.series = [
        {
          name: "Frequency",
          data: frequency
        }
      ];
      this.chart = {
        type: "line",
        stacked: false,
        height: 350,
        zoom: {
          type: "x",
          enabled: true,
          autoScaleYaxis: true
        },
        toolbar: {
          autoSelected: "zoom"
        },
        width: 1000,
      };
      this.dataLabels = {
        enabled: false
      };
      this.markers = {
        size: 0 
      };
      this.title = {
        text: "EEG",
        align: "left"
      };
      this.yaxis = {
        labels: {
          formatter: function(val) {
            return (val / 1000000).toFixed(0);
          }
        },
        title: {
          text: "Frequency"
        }
      };
      this.xaxis = {
        type: "numeric"
      };
      this.tooltip = {
        shared: false,
        y: {
          formatter: function(val) {
            return (val / 1000000).toFixed(0);
          }
        }
      };
    }

}
