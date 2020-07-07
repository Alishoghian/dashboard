import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-marker-popup',
  templateUrl: './marker-popup.component.html',
  styleUrls: ['./marker-popup.component.scss']
})
export class MarkerPopupComponent implements OnInit {
  @Input()data:any
  constructor() { }

  ngOnInit(): void {
  }

}
