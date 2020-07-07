import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SvgMainComponent } from './svg-main/svg-main.component';



@NgModule({
  declarations: [
    SvgMainComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    SvgMainComponent
  ]
})
export class SharedModule { }
