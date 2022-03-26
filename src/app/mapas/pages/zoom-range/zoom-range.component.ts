import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-zoom-range',
  templateUrl: './zoom-range.component.html',
  styles: [`
    .mapa-container {
      height: 100%;
      width: 100%;
    }

    .row {
      background-color: white;
      border-radius: 5px;
      bottom: 50px;
      left: 50px;
      padding: 10px;
      position: fixed;
      z-index: 999;
    }
  `]
})
export class ZoomRangeComponent implements AfterViewInit {
  @ViewChild('mapa') divMapa!: ElementRef;

  mapa!    : mapboxgl.Map;
  zoomLevel: number = 16;

  constructor() { }

  ngAfterViewInit(): void {

    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v11', // style URL
      center: [ -99.05515135263451, 19.28207952837038 ], // starting position [lng, lat]
      zoom: this.zoomLevel // starting zoom
    });
  }

  zoomIn() {
    this.mapa.zoomIn();
    this.zoomLevel = this.mapa.getZoom();
  }

  zoomOut() {
    this.mapa.zoomOut();
    this.zoomLevel = this.mapa.getZoom();
  }
}
