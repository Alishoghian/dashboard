import { Component, OnInit, AfterViewInit, Input, OnDestroy } from '@angular/core';
import * as jQuery from'jquery';
import { CHART_DATA } from './chartData';
import { Subscription } from 'rxjs';
import { GISService } from '../services/GISService';
import { MapModel } from '../../models/mapModel';
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
export class StockChartComponent implements OnInit,AfterViewInit,OnDestroy {
  @Input()data:any
  sub:Subscription=new Subscription()
  chart:any
  interval
  constructor(
    private GISServic:GISService,
  ) { }
ngOnDestroy():void{
    window.clearInterval(this.interval)
    if(this.sub)
    this.sub.unsubscribe()
    
}
  ngOnInit(): void {
    this.sub.add(
        this.GISServic.getFlyToStation().subscribe(
          (data:MapModel)=>{ 
              let cd=[]
            for (let item of CHART_DATA){
                cd.push([item[0] ,item[1]-10 + Math.random()*item[1]])
            }
            this.chart.series[0].setData(cd)
          })
      )
  }
  ngAfterViewInit(){
   var timer =setInterval(()=>{
    let el = document.getElementById('container'+this.data.id)
    if(el){
        setTimeout(() => {
            window.clearInterval(timer)
            this.addChart(el)
            
           setTimeout(() => {
                 var series = this.chart.series[0];
            this.interval=setInterval( ()=> {
                var x = (new Date()).getTime(), // current time
                    y = Math.round(Math.random() * 100);
                series.addPoint([x , y]);
            }, 2250);
               
           }, 50);
        }, 50);
    }
   },50)
    
  }
  addChart(el:HTMLElement){
      var SELF = this
    try{
            this.chart=Highcharts.stockChart(el, {
                    chart: {
                    
                       type: 'areaspline',
                        // events: {
                            
                        //     load: function () {
                
                        //         // set up the updating of the chart each second
                        //         var series = this.series[0];
                        //         SELF.interval=setInterval(function () {
                        //             var x = (new Date()).getTime(), // current time
                        //                 y = Math.round(Math.random() * 100);
                        //             series.addPoint([x , y]);
                        //         }, 1000);
                        //     }
                        // }
                    },
                
                    time: {
                        useUTC: false
                    },
                
                    rangeSelector: {
                        buttons: [{
                            count: 1,
                            type: 'minute',
                            text: '1M'
                        }, {
                            count: 5,
                            type: 'minute',
                            text: '5M'
                        }, {
                            type: 'all',
                            text: 'All'
                        }],
                        inputEnabled: false,
                        selected: 0
                    },
                
                    title: {
                        text: 'Live random data'
                    },
                
                    exporting: {
                        enabled: false
                    },
                
                    series: [{
                        name: 'Random data',
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
                        },
                        threshold: null,
                        data: (function () {
                            // generate an array of random data
                            var data = [],
                                time = (new Date()).getTime(),
                                i;
                
                            for (i = -999; i <= 0; i += 1) {
                                data.push([
                                    time + i * 1000,
                                    Math.round(Math.random() * 100)
                                ]);
                            }
                            return data;
                        }())
                    }],
                    responsive: {
                      rules: [{
                          condition: {
                              maxWidth: 500
                          },
                          // Make the labels less space demanding on mobile
                          chartOptions: {
                              xAxis: {
                                  labels: {
                                      formatter: function () {
                                          return this.value.charAt(0);
                                      }
                                  }
                              },
                              yAxis: {
                                  labels: {
                                      align: 'left',
                                      x: 0,
                                      y: -2
                                  },
                                  title: {
                                      text: ''
                                  }
                              }
                          }
                      }]
                  }
                
                });
    }
    catch(e){

    }
    
  }
}

/*

                Highcharts.stockChart('container'+SELF.data.id, {
                    chart: {
                        type: 'areaspline',
                        events: {
                            load: function () {
                
                                // set up the updating of the chart each second
                                var series = this.series[0];
                                setInterval(function () {
                                    var x = (new Date()).getTime(), // current time
                                        y = Math.round(Math.random() * 100);
                                    series.addPoint([x, y], true, true);
                                }, 1000);
                            }
                        }
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
*/