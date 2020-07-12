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
  milisec:number=0
  constructor(
    private compserice:CompService
  ) { }

  ngOnInit(): void {
    console.log(this.data);
    this.inData = Object.assign({},this.data)
    if(this.inData.type === 'custom'){
      let timer = setInterval(()=>{
        this.milisec += 50
        if(this.milisec == 1000){
          this.secand +=1
          this.milisec=0
        }
        if(this.data.timer == this.secand){
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
