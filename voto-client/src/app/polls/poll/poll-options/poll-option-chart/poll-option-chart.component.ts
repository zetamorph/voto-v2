import { Component, Input, OnInit } from "@angular/core";

import { Option } from "./../../../../shared";

@Component({
  selector: "poll-option-chart",
  templateUrl: "./poll-option-chart.component.html"
})
export class PollOptionChartComponent implements OnInit {
  @Input() options: Option[];

  chartWidth: string = "400";
  chartHeight: string = "400";

  chartData: number[] = [];
  chartLabels: string[] = [];
  chartType: string = "doughnut";
  
  ngOnInit() {

    this.options.forEach((option) => {
      this.chartData.push(option.voteCount);
      console.log(option.title);
      this.chartLabels.push(option.title + " " + String(option.voteCount));

    });
  }
   
}