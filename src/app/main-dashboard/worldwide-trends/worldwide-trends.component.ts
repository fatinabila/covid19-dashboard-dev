import { Component, OnInit } from '@angular/core';
import { APIService } from "../../api.service";
import {GoogleAnalyticsService} from "../../ga.service"; // import our analytics service

@Component({
  selector: 'app-worldwide-trends',
  templateUrl: './worldwide-trends.component.html',
  styleUrls: ['./worldwide-trends.component.css']
})

export class WorldwideTrendsComponent implements OnInit {

  chart

  constructor(private _APIService: APIService , private googleAnalyticsService:GoogleAnalyticsService) {}

  ngOnInit(): void {
    this._APIService.getStatWithMillionPerCase().subscribe(res => {
      this.structureData(res)
    })
  }

  structuredData = []



  structureData(data) {

    for (let i = 0; i < data.length; i++) {
      this.structuredData.push({
        country: data[i].country,
        countryISO: data[i].countryInfo.iso2,
        casesPerOneMillion: data[i].casesPerOneMillion,
        deathsPerOneMillion: data[i].deathsPerOneMillion,
        recoveredPerOneMillion: data[i].recoveredPerOneMillion,
        testsPerOneMillion: data[i].testsPerOneMillion,
        dataUpdated: data[i].updated
      })
    }

    this.changeCountry("MY")


  }

  currentCasesPM;
  currentDeathPM;
  currentTestPM;
  currentISO ="MY"; 
  currentCountry = "Malaysia";

  changeCountry(country) {

    let index = this.structuredData.findIndex(item => item.countryISO == country)
    this.currentCountry = this.structuredData[index].country
    this. currentCasesPM = this.structuredData[index].casesPerOneMillion
    this.currentISO = this.structuredData[index].countryISO
    this.currentDeathPM = this.structuredData[index].deathsPerOneMillion
    this. currentTestPM = this.structuredData[index].testsPerOneMillion

    let timestamp = new Date()

    this.googleAnalyticsService.eventEmitter("perMillionStats", JSON.stringify(timestamp)+" - "+this.currentCountry, this.currentCountry, 1);

  }


}
