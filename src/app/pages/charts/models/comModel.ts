import { ComponentRef } from '@angular/core';
import {Marker} from'leaflet'

export interface MarkerMetaData {
    name: String;
    markerInstance: Marker;
    componentInstance: ComponentRef<any>
  }