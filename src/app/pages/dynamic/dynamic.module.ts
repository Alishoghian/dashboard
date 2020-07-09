import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NestedFormComponent } from './nested-form/nested-form.component';
import { DynamicComComponent } from './dynamic-com/dynamic-com.component';
import { Routes, RouterModule } from '@angular/router';


const route:Routes=[
  {path:'form',component:NestedFormComponent},
  {path:'component',component:DynamicComComponent},
  
  {
    path:'',
    redirectTo:'form',
    pathMatch:'full'
  },
  {
    path:'/**',
    redirectTo:'form'
  }
]
@NgModule({
  declarations: [NestedFormComponent, DynamicComComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(route)

  ]
})
export class DynamicModule { }
