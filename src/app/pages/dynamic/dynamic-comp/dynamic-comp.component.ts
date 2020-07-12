import { Component, OnInit, Input } from '@angular/core';
import { CompService } from '../sevices/comp.service';

@Component({
  selector: 'app-dynamic-comp',
  templateUrl: './dynamic-comp.component.html',
  styleUrls: ['./dynamic-comp.component.scss']
})
export class DynamicCompComponent implements OnInit {

 @Input() data:any
  inData:any;
  secand:number=0
  milisec:number=1000
  constructor(
    private compserice:CompService
  ) { }

  ngOnInit(): void {
    this.inData = Object.assign({},this.data)
    let secand = this.inData.timer
    let milisec=1000
    this.secand = secand
    if(this.inData.type === 'custom'){
      let timer = setInterval(()=>{
        milisec -= 50
        this.milisec = milisec
        if(this.milisec == 0){
          secand -=1
          this.secand = secand
          milisec=1000
        }
        if( secand == 0 && this.data.id == this.inData.id){
          window.clearInterval(timer)
          this.compserice.setCompID(this.inData.id)
        }
      },50)
    }
  }
  close(){
    this.compserice.setCompID(this.inData.id)
  }
}
