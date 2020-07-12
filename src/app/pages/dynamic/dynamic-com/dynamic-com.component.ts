import { Component, OnInit, ViewContainerRef, ComponentFactoryResolver, ComponentRef, OnDestroy, ViewChildren } from '@angular/core';
import { DynamicCompComponent } from '../dynamic-comp/dynamic-comp.component';
import { CompService } from '../sevices/comp.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dynamic-com',
  templateUrl: './dynamic-com.component.html',
  styleUrls: ['./dynamic-com.component.scss']
})
export class DynamicComComponent implements OnInit,OnDestroy {
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

  // @ViewChild('container', { read: ViewContainerRef }) container: ViewContainerRef;
  @ViewChildren('container', { 
    read: ViewContainerRef 
  }) container:Array<ViewContainerRef>
  sub:Subscription=new Subscription()
  
  comps:{id:string,com:ComponentRef<any>}[]=[]
  constructor(private cfr: ComponentFactoryResolver,
              private compService:CompService) { }
  ngOnInit(): void {
    this.sub.add(
      this.compService.getCompID().subscribe(data=>{
        this.comps.find(f => f.id === data).com.destroy()
        this.comps.splice(
          this.comps.indexOf(this.comps.find(f => f.id === data)) , 1
        )
      })
    )
  }
  ngOnDestroy():void{
    if(this.sub)
    this.sub.unsubscribe()
  }
  add(): void {
    this.error.name=false
    this.error.type=false
    
    if(this.data.comName!=null && this.data.type!=null){
      this.data.id ="com_id_"+(Math.floor(1000+Math.random()*1000000).toString())
      this.comps.push({
        id:this.data.id,
        com:null
      })
      // this.container.clear();
      
     setTimeout(() => {
      let cref:ViewContainerRef =this.container.find(f => f.element.nativeElement.attributes.cid.nodeValue == this.data.id)

     
      const factory = this.cfr.resolveComponentFactory(DynamicCompComponent);
      const componentRef = cref.createComponent(factory);
      
      componentRef.instance.data = Object.assign({},this.data);
      this.comps.find(f => f.id === this.data.id).com=componentRef
       
     }, 100);
      
    }
    else{
      if(this.data.comName==null)
        this.error.name=true
      if( this.data.type==null)
        this.error.type=true
    }
    
  }

}
