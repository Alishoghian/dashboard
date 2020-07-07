
import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import { MAP_DATA } from './mapMockData';
import { MapModel } from '../../models/mapModel';

@Injectable()
export class GISService   {
  endpoint: any;
  devNotify : MapModel[] =[];
  dataChange: BehaviorSubject<MapModel[]> = new BehaviorSubject<MapModel[]>([]);
  
  tableData = new Subject<MapModel[]>()



  //new varible =================
  private flyToStation=new Subject<MapModel>()
  //=========================

  constructor () {
  }
 
  get data(): MapModel[] {
    return this.dataChange.value;
  }


getMapData(){
  return MAP_DATA
}
setTabelData(){
  this.tableData.next(MAP_DATA)
  this.devNotify=MAP_DATA 
}

 getMapTableAllDevices() {
      this.dataChange.next(MAP_DATA);
}

  setFlyToStation(row){
    this.flyToStation.next(row)
  }
  getFlyToStation():Observable<MapModel>{
    return this.flyToStation.asObservable()
  }


}
