import { Component, Input, ViewChild, OnInit } from "@angular/core";
import { BaseChartDirective } from "ng2-charts";

import { Option } from "./../../../../shared";

@Component({
  selector: "poll-option-chart",
  templateUrl: "./poll-option-chart.component.html"
})
export class PollOptionChartComponent implements OnInit {
  @Input() options: Option[];
  chartWidth: string = "400";
  chartHeight: string = "400";
  chartType: string = "doughnut";
  chartData: number[];
  chartLabels: string[];
  
  ngOnInit() {
    this.chartData = this.options.map(option => option.voteCount);
    this.chartLabels = this.options.map(option => option.title);
  }

  ngOnChanges() {
    this.chartLabels = this.options.map(option => option.title);
  }

  makeChartData() {
    this.chartData = this.options.map(option => option.voteCount);
  }
  
}