
import {Component, ElementRef, OnInit, ViewChild, Output, EventEmitter, ChangeDetectorRef, AfterViewInit, Input} from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { MapModel } from '../../models/mapModel';
import { GISService } from '../services/GISService';
export interface Tclass{
	name:string;
	position:string;
	office:string;
	extn:string; 
	start_date:string;
	salary:string;
}
// import * as $ from 'src/assets/node_modules/jquery'
// import * as dt from 'src/assets/node_modules/datatables.net-dt'
// var $  = require( 'jquery' );
// declare var $:any
// var dt = require( 'datatables.net-dt' )( window, $ );
@Component({
  selector: 'app-tbl',
  templateUrl: './log-table.component.html',
  styleUrls: ['./log-table.component.scss'],
})
export class LogTableComponent implements OnInit, AfterViewInit {
	ngAfterViewInit(): void {
		this.dataSource.paginator = this.paginator;
		this.dataSource.sort = this.sort;
	  }
	  applyFilter(filterValue: string) {
		filterValue = filterValue.trim(); // Remove whitespace
		filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
		this.dataSource.filter = filterValue;  
	  
	  }
	  DatasoursLenght:number=0
	  displayedColumns = [
		'id',
		'name',
		'lat',
		'lng',
		'title',
		'address',];
	  dataSource: MatTableDataSource<MapModel> = new MatTableDataSource([]);
	  @ViewChild(MatPaginator) paginator: MatPaginator;
	  @ViewChild(MatSort) sort: MatSort
	
	  @Input()data:any
	  @Output()closeEmit = new EventEmitter()
	
	  aragment: string='ltr';
	  sub:Subscription=new Subscription()
	  constructor(
				  public dataService: GISService,
				  ) {
	// this.dataSource = new M
				  }
	  ngOnDestroy(): void {
		  if(this.sub)
		  	this.sub.unsubscribe()
	  }
	
	  ngOnInit() {
		this.loadData();
		this.getmarkePopupClose()
	  }
	
	  refresh() {
		this.loadData();
	  }
	  removeItem(item){
		this.closeEmit.emit(item)
	  }
	
	
	
	selectedRowIndex: string = "";
	
	highlight(row){ 
		this.selectedRowIndex = row.id;
		this.dataService.setFlyToStation(row)
	} 
	
	  public loadData() {
		 this.dataSource = new MatTableDataSource(this.dataService.getMapData())
		 
		  	
	  }
	  changeVisibale(row){

	  }
	  getmarkePopupClose(){
		// this.sub.add(
		// 	this.dataService.onColsePopup().subscribe(
		// 		(data:MapModel)=>{
		// 			this.dataSource.data.find(f=> f.MACID == data.trackerId).detail=data.detail
		// 		}
		// 	)
		// )
	  }
	}
	