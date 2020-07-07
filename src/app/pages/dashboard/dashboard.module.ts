import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './comps/main/main.component';
import { Routes, RouterModule } from '@angular/router';
import { SimpleMapComponent } from './dynamicComponents/simple-map/simple-map.component';
import { GISService } from './dynamicComponents/services/GISService';
import { LogTableComponent } from './dynamicComponents/log-table/log-table.component';
import { MaterialSharedModule } from './material-shared.module';
import { StockChartComponent } from './dynamicComponents/stock-chart/stock-chart.component';
import { StockChartAreaComponent } from './dynamicComponents/stock-chart-area/stock-chart-area.component';

const routes:Routes=[
  {path:'',component:MainComponent}
]

@NgModule({
  declarations: [
    MainComponent,
    SimpleMapComponent,
    LogTableComponent,
    StockChartComponent,
    StockChartAreaComponent
  ],
  imports: [
    CommonModule,
    MaterialSharedModule,
    RouterModule.forChild(routes)
  ],
  providers:[
    GISService
  ]
})
export class DashboardModule { }
