import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
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
      width: 400px;
    }
  `]
})
export class ZoomRangeComponent implements AfterViewInit, OnDestroy {
  @ViewChild('mapa') divMapa!: ElementRef;

  mapa!      : mapboxgl.Map;
  zoomLevel  : number = 16;
  coordenadas: [number, number] = [ -99.05515135263451, 19.28207952837038 ];

  constructor() { }

  ngOnDestroy(): void {
    this.mapa.off('zoom', () => {});
    this.mapa.off('zoomend', () => {});
    this.mapa.off('move', () => {});
  }

  ngAfterViewInit(): void {

    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v11', // style URL
      center: this.coordenadas, // starting position [lng, lat]
      zoom: this.zoomLevel // starting zoom
    });
    
    /* EventListener para obtener el valor actual del zoom */
    this.mapa.on('zoom', (event) => {
      this.zoomLevel = this.mapa.getZoom();
    });

    /* EventListener para cambiar el valor del range */
    this.mapa.on('zoomend', (event) => {
      if(this.mapa.getZoom() > 19) {
        this.mapa.zoomTo(19);
      }
    });

    /* EventListener para cambiar el valor de las coordenadas */
    this.mapa.on('move', (event) => {
      const target = event.target;
      const { lng, lat } = target.getCenter();

      this.coordenadas = [ lng, lat ];
    })
  }

  zoomIn() {
    this.mapa.zoomIn();
  }

  zoomOut() {
    this.mapa.zoomOut();
  }

  cambioZoom( valor: string ) {
    this.mapa.zoomTo( Number(valor) );
  }
}
