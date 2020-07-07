import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Login1Component } from './login1/login1.component';
import { Login2Component } from './login2/login2.component';
import { Routes, RouterModule } from '@angular/router';
import { BoardComponent } from './board/board.component';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';


const router:Routes=[ 
  {path:'',component:BoardComponent}
]
@NgModule({
  declarations: [
    Login1Component,
     Login2Component,
     BoardComponent
    ],
  imports: [
    CommonModule,
    RouterModule.forChild(router),
    MatCardModule
  ]
})
export class LoginModule { }
