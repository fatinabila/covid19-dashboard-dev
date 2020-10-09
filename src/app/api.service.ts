import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DateService } from "./date.service";


@Injectable({ providedIn: 'root' })

export class APIService {

  constructor(private _http: HttpClient, private _DateService :  DateService) { }

  getStatByCountry(country, period) {

    let url = "https://disease.sh/v3/covid-19/historical/"+country+"?lastdays="+period
    return this._http.get(url)
  }

  getStatWithMillionPerCase(){
    let url ="https://disease.sh/v3/covid-19/countries?yesterday=true&allowNull=true";
    return this._http.get(url)
  }

  getCountry(){
    let url ="https://api.covid19api.com/countries"
    return this._http.get(url)
  }

  getWorldWide(){
    return this._http.get("https://disease.sh/v3/covid-19/historical/all?lastdays=2")
  }

  getWorldWideTrend(){
    let url = "https://disease.sh/v3/covid-19/historical/all?lastdays=30"
    return this._http.get(url)
  }

  getStatWithLocation(){
    let url = "https://disease.sh/v3/covid-19/jhucsse";
    return this._http.get<any>(url)
  }

  
}
