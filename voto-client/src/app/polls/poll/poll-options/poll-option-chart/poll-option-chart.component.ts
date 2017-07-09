import { Component, Input, ViewChild, OnInit, OnChanges, AfterViewInit, SimpleChanges } from "@angular/core";
import { BaseChartDirective } from "ng2-charts";

import { Option } from "./../../../../shared";

@Component({
  selector: "poll-option-chart",
  templateUrl: "./poll-option-chart.component.html"
})
export class PollOptionChartComponent implements OnInit, AfterViewInit {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective;
  @Input() options: Option[];
  chartWidth: string = "400";
  chartHeight: string = "400";
  chartType: string = "doughnut";
  chartData: number[] = [];
  chartLabels: string[] = [];
  
  ngOnInit() {
    this.options.forEach((el, idx, arr) => {
      this.chartData.push(el.voteCount);
      this.chartLabels.push(el.title); 
    });
  }

  ngAfterViewInit() {
    if(this.chart.chart) {
      this.chart.chart.update();
    }
  }

}