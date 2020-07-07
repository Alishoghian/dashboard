import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-svg',
  templateUrl: './svg-main.component.html',
  styleUrls: ['./svg-main.component.scss']
})
export class SvgMainComponent implements OnInit {

  @Input() id: string | number
  constructor() { }

  ngOnInit(): void {  
  }

}
 