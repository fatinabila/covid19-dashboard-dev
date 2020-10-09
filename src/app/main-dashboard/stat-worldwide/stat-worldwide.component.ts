import { Component, OnInit ,Input} from '@angular/core';
import { APIService } from "../../api.service";
import { DateService } from "../../date.service"
import { Chart } from 'chart.js';

@Component({
  selector: 'app-stat-worldwide',
  templateUrl: './stat-worldwide.component.html',
  styleUrls: ['./stat-worldwide.component.css'],
  providers:  [  APIService]
})
export class StatWorldwideComponent implements OnInit {

  constructor(private _APIService: APIService, private _DateService: DateService) {}

  @Input() globaStat: any;

  ngOnInit(): void {

    this._APIService.getWorldWide()
    .subscribe(res => {
      this.populateStats(res)
    })


  }

  globalConfirmed;
  globalRecovered;
  globalActive;
  globalDeaths;

  globalNewConfirmed

  lastDate


  todayActiveIsHigher
  percentActive

  todayConfirmedIsHigher
  percentConfirmed

  todayRecoveredIsHigher
  percentRecovered

  todayDeathIsHigher
  percentDeath

  populateStats(data){


    let structured =[]

    for (const property in data.cases) {

      structured.push(
        {
          date : property,
          cases : data.cases[property],
          deaths : data.deaths[property],
          recovered : data.recovered[property],
          active : data.cases[property] - data.deaths[property] -  data.recovered[property]
        }
      )

    }

    this.globalConfirmed = structured[1].cases
    this.globalRecovered = structured[1].recovered
    this.globalDeaths = structured[1].deaths
    this.globalActive  = structured[1].active

    structured[0].active < structured[1].active ? this.todayActiveIsHigher = true : this.todayActiveIsHigher = false
    this.percentActive = ((structured[1].active - structured[0].active) / structured[0].active *100).toFixed(2);

    structured[0].cases < structured[1].cases ? this.todayConfirmedIsHigher = true : this.todayConfirmedIsHigher = false
    this.percentConfirmed = ((structured[1].cases - structured[0].cases) / structured[0].cases *100).toFixed(2);

    structured[0].recovered < structured[1].recovered ? this.todayRecoveredIsHigher = true : this.todayRecoveredIsHigher = false
    this.percentRecovered = ((structured[1].recovered - structured[0].recovered) / structured[0].recovered *100).toFixed(2);

    structured[0].deaths < structured[1].deaths ? this.todayDeathIsHigher = true : this.todayDeathIsHigher = false
    this.percentDeath = ((structured[1].deaths- structured[0].deaths) / structured[0].deaths *100).toFixed(2);

  }


  

}
