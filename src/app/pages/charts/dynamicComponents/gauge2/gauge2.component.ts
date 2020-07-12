import { Component, OnInit, Input, AfterViewInit } from '@angular/core';

const Highcharts = require('highcharts/highcharts')
let indicatorsm = require('highcharts/highcharts-more');
indicatorsm(Highcharts);
let solidGauge = require('highcharts/modules/solid-gauge');
solidGauge(Highcharts);
@Component({
  selector: 'app-gauge2',
  templateUrl: './gauge2.component.html',
  styleUrls: ['./gauge2.component.scss']
})
export class Gauge2Component implements OnInit,AfterViewInit {
  @Input()data:any
 chart:any
  constructor() { }

  ngOnInit(): void {
  }
  ngAfterViewInit():void{
    this.creatChart();
    setInterval( ()=> {
      var point = this.chart.series[0].points[0],
          newVal,
          inc = Math.round((Math.random() - 0.5) * 20);

      newVal = point.y + inc;
      if (newVal < 0 || newVal > 200) {
          newVal = point.y - inc;
      }

      point.update(newVal);

  }, 3000);

  }
  creatChart(){
   this.chart = Highcharts.chart('container_speed'+this.data.id, {

      chart: {
          type: 'gauge',
          plotBackgroundColor: null,
          plotBackgroundImage: null,
          plotBorderWidth: 0,
          plotShadow: false
      },
  
      title: {
          text: 'Speedometer'
      },
  
      pane: {
          startAngle: -150,
          endAngle: 150,
          background: [{
              backgroundColor: {
                  linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                  stops: [
                      [0, '#FFF'],
                      [1, '#333']
                  ]
              },
              borderWidth: 0,
              outerRadius: '109%'
          }, {
              backgroundColor: {
                  linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                  stops: [
                      [0, '#333'],
                      [1, '#FFF']
                  ]
              },
              borderWidth: 1,
              outerRadius: '107%'
          }, {
              // default background
          }, {
              backgroundColor: '#DDD',
              borderWidth: 0,
              outerRadius: '105%',
              innerRadius: '103%'
          }]
      },
  
      // the value axis
      yAxis: {
          min: 0,
          max: 200,
  
          minorTickInterval: 'auto',
          minorTickWidth: 1,
          minorTickLength: 10,
          minorTickPosition: 'inside',
          minorTickColor: '#666',
  
          tickPixelInterval: 30,
          tickWidth: 2,
          tickPosition: 'inside',
          tickLength: 10,
          tickColor: '#666',
          labels: {
              step: 2,
              rotation: 'auto'
          },
          title: {
              text: 'km/h'
          },
          plotBands: [{
              from: 0,
              to: 120,
              color: '#55BF3B' // green
          }, {
              from: 120,
              to: 160,
              color: '#DDDF0D' // yellow
          }, {
              from: 160,
              to: 200,
              color: '#DF5353' // red
          }]
      },
  
      series: [{
          name: 'Speed',
          data: [80],
          tooltip: {
              valueSuffix: ' km/h'
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
  
    });
  }
}
