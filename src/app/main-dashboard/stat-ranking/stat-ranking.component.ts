import { Component, OnInit ,AfterViewInit, ViewChild} from '@angular/core';
import { APIService } from "../../api.service";

import {GoogleAnalyticsService} from "../../ga.service"; // import our analytics service

@Component({
  selector: 'app-stat-ranking',
  templateUrl: './stat-ranking.component.html',
  styleUrls: ['./stat-ranking.component.css']
})

export class StatRankingComponent implements OnInit {

  constructor(private _APIService: APIService, private googleAnalyticsService:GoogleAnalyticsService) {}
  p: number = 1;
  countryFilter =""
  aa:boolean=false;

  ngOnInit() {

    this._APIService.getStatWithMillionPerCase().subscribe(res => {
      this.populateStats(res)
    })
  }

  countryRanking;
  top10Ranking = []
  sortedData;
  dataSource

  setIndex(ii){
    this.aa=ii;
  }

  track(){
    let timestamp = new Date()
    this.googleAnalyticsService.eventEmitter("activeCasesSearch", JSON.stringify(timestamp)+" - "+this.countryFilter, null, 1);
  }


  populateStats(data) {


    this.countryRanking = data
    this.countryRanking =  data.sort((a, b) => (a.active < b.active) ? 1 : -1)

    for (let i = 0; i < data.length; i++) {
      this.top10Ranking.push({
        "Country": this.countryRanking[i].country,
        "CountryCode": this.countryRanking[i].countryInfo.iso2,
        "Active": this.countryRanking[i].active,
        "TestsPerOneMillion": this.countryRanking[i].testsPerOneMillion,
        "TotalConfirmed": this.countryRanking[i].active + this.countryRanking[i].deaths + this.countryRanking[i].recovered,
        "TotalDeaths": this.countryRanking[i].deaths,
        "Critical": this.countryRanking[i].critical,
        "ActivePerOneMillion": this.countryRanking[i].activePerOneMillion
      })

    }


  }

 

  

}
