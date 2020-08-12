import { Component, OnInit ,Input} from '@angular/core';
import { APIService } from "../api.service";
import { DateService } from "../date.service"

@Component({
  selector: 'app-stat-ranking',
  templateUrl: './stat-ranking.component.html',
  styleUrls: ['./stat-ranking.component.css']
})

export class StatRankingComponent implements OnInit {

  constructor(private _APIService: APIService, private _DateService: DateService) {}

  ngOnInit() {
    this._APIService.getWorldWide()
    .subscribe(res => {
      this.populateStats(res)
    })
  }

  countryRanking;
  top10Ranking =[]

  populateStats(data){

    this.countryRanking =data.Countries.sort((a, b) => (a.TotalConfirmed < b.TotalConfirmed) ? 1 : -1)
    

    for(let i=0; i<5 ;i++){

      this.top10Ranking.push({
       // this.countryRanking[i]
       "Country":  this.countryRanking[i].Country,
       "CountryCode":  this.countryRanking[i].CountryCode,
       "TotalConfirmed": this.countryRanking[i].TotalConfirmed,
       "TotalDeaths": this.countryRanking[i].TotalDeaths,
       "TotalRecovered": this.countryRanking[i].TotalRecovered,
       "TotalActive" : this.countryRanking[i].TotalConfirmed - this.countryRanking[i].TotalRecovered - this.countryRanking[i].TotalDeaths
      })
    }

    console.log(this.top10Ranking)

    
  }

}
