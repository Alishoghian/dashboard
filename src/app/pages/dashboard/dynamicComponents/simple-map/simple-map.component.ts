import { Component, OnInit, AfterViewInit, Input, EventEmitter, Output, ComponentFactoryResolver, Injector, OnDestroy } from '@angular/core';
import * as L from 'leaflet'
import { MapModel } from '../../models/mapModel';
import { Subscription } from 'rxjs';
// import { TranslateService } from '@ngx-translate/core';
// import { GridItemResizeEmite } from 'src/app/shared/model/grid-ster-model';
import { GISService } from '../services/GISService';
// import { MassageService } from '../../services/massage.service';

@Component({
  selector: 'app-map',
  templateUrl: './simple-map.component.html',
  styleUrls: ['./simple-map.component.scss'],
})
export class SimpleMapComponent implements OnInit,AfterViewInit,OnDestroy {

  @Input() data:any;
  @Output() closeEmit:EventEmitter<any>=new EventEmitter()
  close(item){
      this.closeEmit.emit(item)
    }
    aragment: string='ltr';
    sub:Subscription=new Subscription()
    // translateData(){
       
    //     switch (this.translate.currentLang) {
      
    //       case "fa":
    //         this.aragment = "rtl";        
    //        break;
    //        case "en":
    //         this.aragment = "ltr";   
    //            break;
    
    //    default:
    //        break;
    //     }  
      
    //     this.sub.add( this.translate.onLangChange.subscribe((data:any)=>{
    //       switch (data.lang) {
    //           case "fa":
    //                this.aragment = "rtl";
    //               break;
    //               case "en":
    //                this.aragment = "ltr";
              
    //                   break;
          
    //           default:
    //               break;
    //       }
    //     }));
      
    //   }
  height:number
  map:any
  
  mapData:MapModel[]=[]

  constructor(
    // private translate: TranslateService ,
    private GISServic:GISService,
    // private massage:MassageService,
    private cfr :ComponentFactoryResolver,
    private injector:Injector
    

) { }
// getItemResize(){
//   this.sub.add(
//    this.massage.getChartMassage().subscribe(
//     (data:GridItemResizeEmite)=>{
//       if(data.id == this.data.id){
//         this.height = parseInt( data.optionData[0]) - 50
//         if (this.map) {
//           setTimeout(() => {
//           this.map.invalidateSize();       
//           }, 50);
            
//         }
        
//       }
//     }
//   ) 
//   )
  
// }
listenMapMassage(){
  // this.sub.add(
  //   this.massage.getSelectNode().subscribe(
  //     (data:MapModel)=>{
  //       this.map.flyTo(data.latlng,14)
  //       this.map.eachLayer(element => {
  //         if(element.options.id == data.MACID){
  //           element.openPopup()            
  //         }         
  //       });
        
  //     }
  //   )
  // )
  this.sub.add(
    this.GISServic.getFlyToStation().subscribe(
      (data:MapModel)=>{
        this.map.flyTo(data.latlng,14)
        this.map.eachLayer(element => {
          if(element.options.id == data.MACID){
            element.openPopup()            
          }         
        });
      })
  )
}

  ngOnInit(): void {
    // this.translateData()
    // this.getItemResize()
    this.listenMapMassage()
    this.mapData = this.GISServic.getMapData()
  }
  ngAfterViewInit(){
    let timer = setInterval(()=>{
      let el = document.getElementById('map_'+this.data.id)
      if(el){
        window.clearInterval(timer)
        this.map = L.map('map_'+this.data.id).setView([35.724496338474104,51.273021697998054], 13);
        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
          maxZoom: 20,
          id: 'mapbox/streets-v11'
          }).addTo(this.map);
          this.map.on('load',this.afterMapLoad())
      }
    })
  }
  afterMapLoad(){
    this.setMarker()
    // this.listenMapMassage()
  }
  setMarker(){    
    const markerIcon=L.icon({
      iconUrl:'./assets/icons/marker-icon-2x.png',
      iconSize: [26, 40],
      iconAnchor: [0, 0],
      popupAnchor:[13,0],
    });
    let marker
    this.mapData.map(m=>{
      import('./marker-popup/marker-popup.component').then(
        ({MarkerPopupComponent})=>{
          const fcom = this.cfr.resolveComponentFactory(MarkerPopupComponent)
          // let node = this.massage.getLastSelectedNode()
          let com = fcom.create(this.injector)
          com.instance.data=m
          com.changeDetectorRef.detectChanges()
          let html = com.location.nativeElement
          marker = L.marker(m.latlng,{icon:markerIcon,fillColor: '#00bcd4',id:m.MACID}).bindPopup(html).addTo(this.map)
          marker.getPopup().on('remove',()=>{
            com.destroy()            
          })
          let self=this
          marker.on({
            click:function(){
              this.openPopup()
              m.visible=true
              // self.massage.setSelectNode(m)
            }
          })
          // if(m.MACID === node.MACID){
          //   this.map.flyTo(node.latlng,14)
          //   marker.openPopup()
          // }
        }
      )
    })
    setTimeout(() => {
    this.GISServic.setTabelData()
    }, 2000);
  }
  ngOnDestroy(){
    if(this.sub)
    this.sub.unsubscribe()

  }
}
 