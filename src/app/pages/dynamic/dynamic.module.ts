import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NestedFormComponent } from './nested-form/nested-form.component';
import { DynamicComComponent } from './dynamic-com/dynamic-com.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import {  MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';
import { DynamicCompComponent } from './dynamic-comp/dynamic-comp.component';
import { CompService } from './sevices/comp.service';

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
  declarations: [NestedFormComponent, DynamicComComponent, DynamicCompComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(route),
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatButtonModule,
    MatSelectModule,
    MatInputModule,
    MatRadioModule

  ],
  providers:[
    CompService
  ]
})
export class DynamicModule { }
