import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import * as jQuery from'jquery';
const Highcharts =require('highcharts/highcharts')
let stock = require('highcharts/modules/stock')
let indicators = require('highcharts/modules/exporting');
const indi = require('highcharts/indicators/stochastic')
indicators(Highcharts);
stock(Highcharts)

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss']
})
export class ColumnComponent implements OnInit ,AfterViewInit {
  @Input()data:any
  chart:any
  constructor() { }

  ngOnInit(): void {
  }
  ngAfterViewInit(){
      
   var timer =setInterval(()=>{
    let el = document.getElementById('container_'+this.data.id)
    if(el){
        setTimeout(() => {
            window.clearInterval(timer)
            this.addChart(el)
        }, 50);
    }
   },50)
  
}
addChart(el:HTMLElement){
    var SELF=this;
    try{
        this.chart = Highcharts.chart(el, {
          chart: {
              type: 'column',
             events: {
                load: function(){
                  SELF.redrawColumns(this);
                },
                redraw: function(){
                  SELF.redrawColumns(this);
                },
                addSeries:function(){
                  SELF.redrawColumns(this);
                },
            }
          },
          xAxis: {
              categories: ['C1', 'C2', 'C3', 'C4', 'C5', 'C6']
          },
          credits: {
              enabled: false
          },
          series: [{ 
              name: 'l1',
              data: [15, 7, 5, 4, 17, 9],
              dataLabels: {
                  enabled: true,
                  rotation: -90,
                  color: '#FFFFFF',
                  align: 'right',
                  format: '{point.y:.1f}', // one decimal
                  y: 10, // 10 pixels down from the top
                  style: {
                      fontSize: '11px',
                      fontFamily: 'Verdana, sans-serif'
                  }
              }
          }, {
              name: 'l2',
              data: [6, 9, 11, 12, 10.5, 20],
              dataLabels: {
                  enabled: true,
                  rotation: -90,
                  color: '#FFFFFF',
                  align: 'right',
                  format: '{point.y:.1f}', // one decimal
                  y: 10, // 10 pixels down from the top
                  style: {
                      fontSize: '13px',
                      fontFamily: 'Verdana, sans-serif'
                  }
              }
          }, {
              name: 'l3',
              data: [4, 6, 14, 7.3, 19, 13.2],
              dataLabels: {
                  enabled: true,
                  rotation: -90,
                  color: '#FFFFFF',
                  align: 'right',
                  format: '{point.y:.1f}', // one decimal
                  y: 10, // 10 pixels down from the top
                  style: {
                      fontSize: '13px',
                      fontFamily: 'Verdana, sans-serif'
                  }
              }
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
      })
  }
      
      catch(e){
        console.log(e);
        
      }
}
redrawColumns(chart){
    var SELF=this
    var $ =jQuery  
    $(chart.series[0].data).each(function(i,e){
        
      if (e.y <= 9 ){        
          e.graphic.attr({fill:'#55BF3B'});
      }
      else if (e.y > 10  &&  e.y <= 15){
          e.graphic.attr({fill: '#DF5353'});
      }
      else if(e.y > 15){
        e.graphic.attr({fill:'#DDDF0D'});
      }

  }); 
  $(chart.series[2].data).each(function(i,e){
        
    if (e.y <= 9 ){        
        e.graphic.attr({fill:'#55BF3B'});
    }
    else if (e.y > 10  &&  e.y <= 15){
        e.graphic.attr({fill: '#DF5353'});
    }
    else if(e.y > 15){
      e.graphic.attr({fill:'#DDDF0D'});
    }

}); $(chart.series[1].data).each(function(i,e){
        
    if (e.y <= 9 ){        
        e.graphic.attr({fill:'#55BF3B'});
    }
    else if (e.y > 10  &&  e.y <= 15){
        e.graphic.attr({fill: '#DF5353'});
    }
    else if(e.y > 15){
      e.graphic.attr({fill:'#DDDF0D'});
    }

});
}

}
