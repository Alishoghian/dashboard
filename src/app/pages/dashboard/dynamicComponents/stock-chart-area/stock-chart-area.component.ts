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
  chart:any
  constructor(
    private GISServic:GISService,
  ) { }
ngOnDestroy():void{
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
                console.log(cd);
                
                this.chart.series[0].setData(cd)

              
          })
      )
  }
  ngAfterViewInit(){
    var SELF=this;
    let timer=setInterval(() => {

      (function ($) {
          SELF.chart=Highcharts.stockChart('container'+SELF.data.id, {

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
    if(this.chart){
        window.clearInterval(timer)
    }
        
    }, 50);
  }

}
