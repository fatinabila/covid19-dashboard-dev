import { Component, OnInit } from '@angular/core';
import { APIService } from "../../api.service";
import {featureGroup, latLng, MapOptions, tileLayer, Marker, icon, Map} from 'leaflet';

@Component({
  selector: 'app-covid-map',
  templateUrl: './covid-map.component.html',
  styleUrls: ['./covid-map.component.css']
})
export class CovidMapComponent implements OnInit {

  constructor(private _APIService: APIService) { }


  marker =[]
  

  ngOnInit(): void {
  
    this.initializeMapOptions();
    this._APIService.getStatWithLocation()
    .subscribe(res => {

      for(let i=0; i < res.length; i++){

        this.marker.push(
          { 
            Country : res[i].country , 
            Lat : res[i].coordinates.latitude , 
            Lon : res[i].coordinates.longitude,
            ActiveCases :  res[i].stats.confirmed - res[i].stats.deaths - res[i].stats.recovered
          }
        )

      }

      this.addSampleMarker()

     
    })

  }

  mapOptions: MapOptions;

  private initializeMapOptions() {


    this.mapOptions = {
      center: latLng(0,0),
      zoom: 2,
      
      layers: [
        tileLayer(
          'https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png',
          {
            attribution: 'Map data © OpenStreetMap contributors'
          }),
          
      ],
    };

    
  }


  map: Map;

  onMapReady(map: Map) {
    this.map = map;
    this.addSampleMarker();
  }

  private addSampleMarker() {



    let latlon = this.marker

    for(let i=0; i< latlon.length; i++){

      let markerIcon = 'assets/m-oren.png'

      if(this.marker[i].ActiveCases == 0){
        markerIcon = 'assets/m-green.png'
      }

      if(this.marker[i].ActiveCases > 5000){
        markerIcon = 'assets/m-pink.png'
      }

      if(this.marker[i].ActiveCases > 100000){
        markerIcon = 'assets/m-red.png'
      }



      let marker = new Marker([latlon[i].Lat, latlon[i].Lon]).setIcon(
        icon({
            iconSize: [5, 5],
            iconAnchor: [13, 41],
            iconUrl: markerIcon
        }));
  
      marker.bindPopup(latlon[i].Country).addTo(this.map);
    }


  }


}
