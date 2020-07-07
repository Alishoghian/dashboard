import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import * as jQuery from'jquery';
import {  CHART_DATA } from '../stock-chart/chartData';
const Highcharts =require('highcharts/highcharts')
let stock = require('highcharts/modules/stock')
let indicators = require('highcharts/modules/exporting');
const indi = require('highcharts/indicators/stochastic')
indicators(Highcharts);
stock(Highcharts)
indi(Highcharts)
@Component({
  selector: 'app-stock-chart-area',
  templateUrl: './stock-chart-area.component.html',
  styleUrls: ['./stock-chart-area.component.scss']
})
export class StockChartAreaComponent implements OnInit,AfterViewInit {
  @Input()data:any
  constructor() { }

  ngOnInit(): void {
  }
  ngAfterViewInit(){
    var SELF=this;
    (function ($) {
      Highcharts.stockChart('container'+SELF.data.id, {

        rangeSelector: {
            selected: 1
        },

        title: {
            text: 'AAPL Stock Price'
        },

        series: [{
            name: 'AAPL Stock Price',
            data: CHART_DATA,
            type: 'areaspline',
            threshold: null,
            tooltip: {
                valueDecimals: 2
            },
            fillColor: {
                linearGradient: {
                    x1: 0,
                    y1: 0,
                    x2: 0,
                    y2: 1
                },
                stops: [
                    [0, Highcharts.getOptions().colors[0]],
                    [1, Highcharts.color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                ]
            }
        }]
    });
    })(jQuery);
  }

}
