import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main/main.component';
import { Routes, RouterModule } from '@angular/router';
import { GISService } from './dynamicComponents/services/GISService';
import { LogTableComponent } from './dynamicComponents/log-table/log-table.component';
import { MaterialSharedModule } from './material-shared.module';
import { ColumnComponent } from './dynamicComponents/column/column.component';
import { GaugeComponent } from './dynamicComponents/gauge/gauge.component';
import { Gauge2Component } from './dynamicComponents/gauge2/gauge2.component';

const routes:Routes=[
  {path:'',component:MainComponent}
]

@NgModule({
  declarations: [
    MainComponent,
    LogTableComponent,
    ColumnComponent,
    GaugeComponent,
    Gauge2Component
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
export class ChartsModule { }