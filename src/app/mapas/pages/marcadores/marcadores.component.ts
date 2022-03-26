import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

interface MarcadorColor {
  color    : string;
  marcador?: mapboxgl.Marker;
  centro  ?: [number, number];
}

@Component({
  selector: 'app-marcadores',
  templateUrl: './marcadores.component.html',
  styles: [`
    .mapa-container {
      height: 100%;
      width: 100%;
    }

    .list-group {
      position: fixed;
      right: 20px;
      top: 20px;
      z-index: 99;
    }

    li {
      cursor: pointer;
    }
  `]
})
export class MarcadoresComponent implements AfterViewInit {

  @ViewChild('mapa') divMapa!: ElementRef;

  mapa!      : mapboxgl.Map;
  zoomLevel  : number = 16;
  coordenadas: [number, number] = [ -99.05515135263451, 19.28207952837038 ];
  marcadores : MarcadorColor[] = [];

  constructor() { }

  ngAfterViewInit(): void {
    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v11', // style URL
      center: this.coordenadas, // starting position [lng, lat]
      zoom: this.zoomLevel // starting zoom
    });

    this.leerLocalStorage();

    /* Agregar elementos HTML al marker
    const markerHTML: HTMLElement = document.createElement('div');
    markerHTML.innerHTML = 'Hola mundo!'; */

    // new mapboxgl.Marker()
    //     .setLngLat(this.coordenadas)
    //     .addTo(this.mapa);
  }

  agregarMarcador() {
    const color = "#xxxxxx".replace(/x/g, y=>(Math.random()*16|0).toString(16));

    const nuevoMarcador = new mapboxgl.Marker({
                            draggable: true,
                            color
                          })
                          .setLngLat( this.coordenadas )
                          .addTo( this.mapa );
    
    this.marcadores.push({
      color,
      marcador: nuevoMarcador
    });

    this.guardarMarcadorLocalStorage();
  }

  verMarcador(marcador: mapboxgl.Marker ) {
    this.mapa.flyTo({
      center: marcador.getLngLat()
    });
  }

  guardarMarcadorLocalStorage() {
    const lngLatArr: MarcadorColor[] = [];

    this.marcadores.forEach( m => {
      const color = m.color;
      const { lng, lat } = m.marcador!.getLngLat()

      lngLatArr.push({
        color: color,
        centro: [ lng, lat ]
      });
    });

    localStorage.setItem('marcadores', JSON.stringify(lngLatArr));
  }

  leerLocalStorage() {
    if( !localStorage.getItem('marcadores') ) {
      return;
    }

    const lngLatArr: MarcadorColor[] = JSON.parse(localStorage.getItem('marcadores')!);

    lngLatArr.forEach( m => {
      const newMarcador = new mapboxgl.Marker({
                                color: m.color,
                                draggable: true
                              })
                              .setLngLat( m.centro! )
                              .addTo( this.mapa );
      
      this.marcadores.push({
        color: m.color,
        marcador: newMarcador
      })                        
    })
  }
}
