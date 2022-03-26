import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-marcadores',
  templateUrl: './marcadores.component.html',
  styles: [`
    .mapa-container {
      height: 100%;
      width: 100%;
    } 
  `]
})
export class MarcadoresComponent implements AfterViewInit {

  @ViewChild('mapa') divMapa!: ElementRef;

  mapa!      : mapboxgl.Map;
  zoomLevel  : number = 16;
  coordenadas: [number, number] = [ -99.05515135263451, 19.28207952837038 ];

  constructor() { }

  ngAfterViewInit(): void {
    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v11', // style URL
      center: this.coordenadas, // starting position [lng, lat]
      zoom: this.zoomLevel // starting zoom
    });

    /* Agregar elementos HTML al marker
    const markerHTML: HTMLElement = document.createElement('div');
    markerHTML.innerHTML = 'Hola mundo!'; */

    new mapboxgl.Marker()
        .setLngLat(this.coordenadas)
        .addTo(this.mapa);
  }

}
