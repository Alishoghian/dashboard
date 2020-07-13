import { Component, OnInit, AfterViewInit, Input, OnDestroy } from '@angular/core';
import * as jQuery from'jquery';
import {  CHART_DATA } from '../stock-chart/chartData';
import { MapModel } from '../../models/mapModel';
import { Subscription } from 'rxjs';
import { GISService } from '../services/GISService';
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
export class StockChartAreaComponent implements OnInit,AfterViewInit,OnDestroy {
  @Input()data:any
  sub:Subscription=new Subscription()
  interval:any
  chart:any
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
         window.clearInterval(timer)
         setTimeout(() => {
            this.addChart(el)
            
            setTimeout(() => {
             this.interval=setInterval( ()=> {
                  var series = this.chart?.series[0];
                 var x = (new Date()).getTime(), // current time
                     y = Math.round(Math.random() * 100);
                 series.addPoint([x , y]);
             }, 2385);
                
            }, 150);
        }, 50);
    }
   },80)
     
   }
   addChart(el:HTMLElement){
       var SELF:this
     try{
             this.chart=Highcharts.stockChart(el, {
                     chart: {
                     
                        type: 'areaspline',
                        //  events: {
                        //      load: function () {
                 
                        //          var series = this.series[0];
                        //          SELF.interval= setInterval(function () {
                        //              var x = (new Date()).getTime(), // current time
                        //                  y = Math.round(Math.random() * 100);
                        //              series.addPoint([x, y], true, true);
                        //          }, 1000);
                        //      }
                        //  }
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
                       }]
                   }
                 
                 });
     }
     catch(e){
 
     }
     
   }

}
/*


    let timer=setInterval(() => {

      (function ($) {
          SELF.chart= Highcharts.stockChart('container'+SELF.data.id, {
                chart: {
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
      })(jQuery);
    if(this.chart){
        window.clearInterval(timer)
    }
        
    }, 50);*/