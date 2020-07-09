import { Component, OnInit } from '@angular/core';
import { MassageService } from './service/massage.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  sub:Subscription=new Subscription()
  $them:boolean;
  loader:boolean=false;
constructor(private massage:MassageService){}
  ngOnInit():void{
    this.sub.add(
        this.massage.getTheme.subscribe(
            data=>{   
                this.$them= data
            }
        )
    )
    this.sub.add(
      this.massage.getLoader().subscribe(
        (data:boolean)=>{
          this.loader=data
        }
      )
    )
  }
  changeTheme(){
    this.loader=true
    setTimeout(() => {
      this.$them = !this.$them
      this.massage.setTheme(this.$them)
    }, 1700);
    setTimeout(() => {
      this.loader=false
    }, 2000);
    
  }
  
}
