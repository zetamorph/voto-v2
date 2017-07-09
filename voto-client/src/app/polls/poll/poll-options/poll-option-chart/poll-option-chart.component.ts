import { Component, Directive, Input, OnInit, OnChanges, AfterViewInit, SimpleChanges } from "@angular/core";

import { Option } from "./../../../../shared";

@Component({
  selector: "poll-option-chart",
  templateUrl: "./poll-option-chart.component.html"
})
export class PollOptionChartComponent implements OnInit, OnChanges {
  @Input() options: Option[];
  
  view: any[] = [400, 400];
  chartData: any[];
  colorScheme = { domain: ["#5AA454", "#A10A28", "#C7B42C", "#AAAAAA"] };
  
  ngOnInit() {
    this.chartData = this.makeChartData();
  }

  ngOnChanges() {
    this.chartData = this.makeChartData();
  }

  makeChartData() {
    console.log("making chart data");
    let data = [];
    this.options.forEach((el, idx, arr) => {
      data.push({ name: el.title, value: el.voteCount });
    });
    return data;
  }

  onSelect(event) {
    
  }

}