import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DateService } from "./date.service";


@Injectable({ providedIn: 'root' })

export class APIService {

  constructor(private _http: HttpClient, private _DateService :  DateService) { }

  getStatByCountry(country) {
    let yesterday = this._DateService.getFormattedDate(new Date(Date.now() - (24 * 1) * 3600 * 1000))
    let sevenDaysAgo = this._DateService.getFormattedDate(new Date(Date.now() - (24 * 14) * 3600 * 1000))
    let url = "https://api.covid19api.com/country/"+country+"?from="+sevenDaysAgo+"T00:00:00Z&to="+yesterday+"T00:00:00Z"
   // console.log(url)
    return this._http.get(url)
  }

  getCountry(){
    let url ="https://api.covid19api.com/countries"
    return this._http.get(url)
  }

  getWorldWide(){
    return this._http.get("https://api.covid19api.com/summary")
  }

  getWorldWideTrend(){
    let yesterday = this._DateService.getFormattedDate(new Date(Date.now() - (24 * 1) * 3600 * 1000))
    let sevenDaysAgo = this._DateService.getFormattedDate(new Date(Date.now() - (24 * 14) * 3600 * 1000))
    let url = "https://api.covid19api.com/world?from="+sevenDaysAgo+"T00:00:00Z&to="+yesterday+"T00:00:00Z"
    return this._http.get(url)
  }

  
}
