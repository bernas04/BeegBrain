import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit {

  constructor() {
    
  }

  ngOnInit(): void {
      
  }

  initOpts = {
    renderer: "svg",
    width: 600,
    height: 600
  };

  options : any = {
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
          { value: 200, name: "Reviewed EEG's" },
          { value: 50, name: "Opened EEG's" },
          { value: 30, name: "Unopened EEG's" },
          { value: 17, name: "Corrupted EEG's" },
        ]
      }
    ]
  };

}