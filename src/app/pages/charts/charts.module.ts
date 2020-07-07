import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main/main.component';
import { Routes, RouterModule } from '@angular/router';
import { GISService } from './dynamicComponents/services/GISService';
import { LogTableComponent } from './dynamicComponents/log-table/log-table.component';
import { MaterialSharedModule } from './material-shared.module';
import { ColumnComponent } from './dynamicComponents/column/column.component';

const routes:Routes=[
  {path:'',component:MainComponent}
]

@NgModule({
  declarations: [
    MainComponent,
    LogTableComponent,
    ColumnComponent
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