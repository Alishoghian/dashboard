import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import * as jQuery from'jquery';
import { CHART_DATA } from './chartData';
const Highcharts =require('highcharts/highcharts')
let stock = require('highcharts/modules/stock')
let indicators = require('highcharts/modules/exporting');
const indi = require('highcharts/indicators/stochastic')
indicators(Highcharts);
stock(Highcharts)
indi(Highcharts)

@Component({
  selector: 'app-stock-chart',
  templateUrl: './stock-chart.component.html',
  styleUrls: ['./stock-chart.component.scss']
})
export class StockChartComponent implements OnInit,AfterViewInit {
  @Input()data:any
  constructor() { }

  ngOnInit(): void {
  }
  ngAfterViewInit(){
    var SELF=this;
    (function ($) {
        Highcharts.stockChart('container'+SELF.data.id, {
            chart: {
                type: 'area'
            },

            rangeSelector: {
                selected: 1
            },

            title: {
                text: 'AAPL Stock Price'
            },

            yAxis: {
                reversed: true,
                showFirstLabel: false,
                showLastLabel: true
            },

            series: [{
                name: 'AAPL Stock Price',
                data: CHART_DATA,
                threshold: null,
                fillColor: {
                    linearGradient: {
                        x1: 0,
                        y1: 1,
                        x2: 0,
                        y2: 0
                    },
                    stops: [
                        [0, Highcharts.getOptions().colors[0]],
                        [1, Highcharts.color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                    ]
                },
                tooltip: {
                    valueDecimals: 2
                }
            }],
            responsive: {
              rules: [{
                  condition: {
                      maxWidth: 500,
                      // minWidth:500
                  },
                  chartOptions: {
                      subtitle: {
                          text: null
                      },
                      navigator: {
                          enabled: true
                      }
                  }
              }]
          }
        });
    })(jQuery);
  }
}
