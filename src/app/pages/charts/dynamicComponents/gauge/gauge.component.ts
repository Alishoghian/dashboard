import { Component, OnInit, Input, AfterViewInit, OnDestroy } from '@angular/core';

const Highcharts = require('highcharts/highcharts')
let indicatorsm = require('highcharts/highcharts-more');
indicatorsm(Highcharts);
let solidGauge = require('highcharts/modules/solid-gauge');
solidGauge(Highcharts);
@Component({
  selector: 'app-gauge',
  templateUrl: './gauge.component.html',
  styleUrls: ['./gauge.component.scss']
})
export class GaugeComponent implements OnInit ,AfterViewInit,OnDestroy{
  @Input()data:any
 chart:any
 interval:any
  constructor() { }
    ngOnDestroy(){
        
     window.clearInterval(this.interval)
     
    }
  ngOnInit(): void {
  }
  ngAfterViewInit():void{
    this.createChart()
    this.interval=  setInterval( ()=> {
      // Speed
      var point,
          newVal,
          inc;
  
      if (this.chart) {
          point = this.chart.series[0].points[0];
          inc = Math.round((Math.random() - 0.5) * 100);
          newVal = point.y + inc;
  
          if (newVal < 0 || newVal > 200) {
              newVal = point.y - inc;
          }
  
          point.update(newVal);
      }
  
      // RPM
      // if (this.chart) {
      //     point = chartRpm.series[0].points[0];
      //     inc = Math.random() - 0.5;
      //     newVal = point.y + inc;
  
      //     if (newVal < 0 || newVal > 5) {
      //         newVal = point.y - inc;
      //     }
  
      //     point.update(newVal);
      // }
  }, 2000);
  }
  createChart(){
    var timer =setInterval(()=>{
        let el = document.getElementById('container_speed_'+this.data.id)
        if(el){
            setTimeout(() => {
                window.clearInterval(timer)
                this.addChart(el)
            }, 50);
        }
    },50)
  }
  addChart(el:HTMLElement){

    var gaugeOptions = {
        chart: {
            type: 'solidgauge'
        },
    
        title: null,
    
        pane: {
            center: ['50%', '85%'],
            size: '140%',
            startAngle: -90,
            endAngle: 90,
            background: {
                backgroundColor:
                    Highcharts.defaultOptions.legend.backgroundColor || '#EEE',
                innerRadius: '60%',
                outerRadius: '100%',
                shape: 'arc'
            }
        },
    
        exporting: {
            enabled: false
        },
    
        tooltip: {
            enabled: false
        },
    
        // the value axis
        yAxis: {
            stops: [
                [0.1, '#55BF3B'], // green
                [0.5, '#DDDF0D'], // yellow
                [0.9, '#DF5353'] // red
            ],
            lineWidth: 0,
            tickWidth: 0,
            minorTickInterval: null,
            tickAmount: 2,
            title: {
                y: -70
            },
            labels: {
                y: 16
            }
        },
    
        plotOptions: {
            solidgauge: {
                dataLabels: {
                    y: 5,
                    borderWidth: 0,
                    useHTML: true
                }
            }
        }
    };
    
    // The speed gauge
    this.chart = Highcharts.chart(el, Highcharts.merge(gaugeOptions, {
        yAxis: {
            min: 0,
            max: 200,
            title: {
                text: 'Speed'
            }
        },
    
        credits: {
            enabled: false
        },
    
        series: [{
            name: 'Speed',
            data: [80],
            dataLabels: {
                format:
                    '<div style="text-align:center">' +
                    '<span style="font-size:25px">{y}</span><br/>' +
                    '<span style="font-size:12px;opacity:0.4">km/h</span>' +
                    '</div>'
            },
            tooltip: {
                valueSuffix: ' km/h'
            }
        }], responsive: {
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
    }));
  }
  setChartValue(args){
      var point;
      var data = args;
      if (this.chart) {
        try{
          point = this.chart?.series[0]?.points[0];
          
          if (data < 0 || data > 130)return;
  
          point?.update(data);

        }catch(e){
          console.log(e);          
        }
      }
  }
}
