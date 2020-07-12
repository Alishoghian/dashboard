import { Component, OnInit, ViewContainerRef, ViewChild, ComponentFactoryResolver, ComponentRef } from '@angular/core';
import { DynamicCompComponent } from '../dynamic-comp/dynamic-comp.component';
import { CompService } from '../sevices/comp.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dynamic-com',
  templateUrl: './dynamic-com.component.html',
  styleUrls: ['./dynamic-com.component.scss']
})
export class DynamicComComponent implements OnInit {
  data:{
    id:string
  comName:string,
  type:string,
  timer:number,
  }={
    id:null,
    comName:null,
    type:null,
    timer:1000,
    }
    error:{name:boolean,type:boolean}={name:false,type:false}

  @ViewChild('container', { read: ViewContainerRef }) container: ViewContainerRef;
  sub:Subscription=new Subscription()
  comps:{id:string,com:ComponentRef<any>}[]=[]
  constructor(private cfr: ComponentFactoryResolver,
              private compService:CompService) { }
  ngOnInit(): void {
    this.sub.add(
      this.compService.getCompID().subscribe(data=>{
        console.log(data);
        this.comps.find(f => f.id === data).com.destroy()
      })
    )
  }
  add(): void {
    this.error.name=false
    this.error.type=false
    
    if(this.data.comName!=null && this.data.type!=null){
      const componentFactory = this.cfr.resolveComponentFactory(DynamicCompComponent);
      const componentRef = this.container.createComponent(componentFactory);
      this.data.id ="com_id_"+(Math.floor(1000+Math.random()*1000000).toString())
      componentRef.instance.data=this.data
      this.comps.push({
        id:this.data.id,
        com:componentRef
      })
    }
    else{
      if(this.data.comName==null)
        this.error.name=true
      if( this.data.type==null)
        this.error.type=true
    }
    
  }

}
