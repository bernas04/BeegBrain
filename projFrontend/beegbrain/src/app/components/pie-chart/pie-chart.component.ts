import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { EEG } from 'src/app/classes/EEG';
import { Event } from 'src/app/classes/Event';
import { Report } from 'src/app/classes/Report';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit, OnChanges {

  @Input("eegs") eegs!: EEG[];
  @Input("reports") reports!: Report[];

  options!: any;

  constructor() {
    
  }

  ngOnInit(): void {
      
  }

  ngOnChanges(changes: any) {

    let done = 0;
    let in_progress = 0;
    let to_do = 0;
    let error = 0;

    console.log("eegs", this.eegs)
    console.log("reports", this.reports)

    this.eegs.forEach((eeg) => { 
      let report = this.reports.find(x => x.id == +eeg.report)
      console.log("report found: ", report)
      if ( eeg.status != null )  error += 1;
      else {
        if ( report?.progress == "done" ) done += 1; 
        if ( report?.progress == "in progress" ) in_progress += 1;
        if ( report?.progress == null ) to_do += 1;
      }
      
    });

    this.options = {
      title: {
        text: "EEG's",
        left: "center"
      },
      tooltip: {
        trigger: "item",
        width: "100%"
      },
      legend: {
        top: "90%",
        left: "center"
      },
      series: [
        {
          name: "EEG's",
          type: "pie",
          radius: "80%",
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: "#fff",
            borderWidth: 2
          },
          label: {
            show: false,
            position: "center"
          },
          emphasis: {
            label: {
              show: false,
              fontSize: "40",
              fontWeight: "bold"
            }
          },
          labelLine: {
            show: false
          },
          data: [
            { value: done, name: "Reviewed" },
            { value: in_progress, name: "In review" },
            { value: to_do, name: "Awaiting review" },
            { value: error, name: "Corrupted" },
          ]
        }
      ]
    };
  }

  initOpts = {
    renderer: "svg",
    width: 600,
    height: 600
  };


}