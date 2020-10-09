import { Component, OnInit } from '@angular/core';
import { APIService } from "../../api.service";

@Component({
  selector: 'app-full-list-cases',
  templateUrl: './full-list-cases.component.html',
  styleUrls: ['./full-list-cases.component.css']
})
export class FullListCasesComponent implements OnInit {

  constructor(private _APIService: APIService) { }

  countryRanking
  sortedRanking =[]




  ngOnInit(): void {
    this._APIService.getStatWithMillionPerCase().subscribe(res => {
      this.populateStats(res)
  })
}

settings = {
  columns: {
    Country: {
      title: 'Country'
    },
    Active: {
      title: 'Active Case'
    },
    TestsPerOneMillion: {
      title: 'Tests Per One Million'
    },
    TotalConfirmed: {
      title: 'Total Confirmed'
    },
    TotalDeaths :{
      title : 'Total Deaths'
    }
  },
  mode: 'external',
  actions: {
    add: false,
    edit: false,
    delete: false,
  },
  rowClassFunction: (row) => {
      var curUserId = localStorage.getItem('user_id');
      if(row.data.createdBy == parseInt(curUserId)){
          return '';
      } else {
          return 'hide-action';
      }
  },
  edit: {
      editButtonContent: '<i class="ti-pencil text-info m-r-10"></i>'
  }
};


populateStats(data){
    
    this.countryRanking = data
    this.countryRanking =  data.sort((a, b) => (a.active < b.active) ? 1 : -1)

    for (let i = 0; i < data.length ; i++) {
      this.sortedRanking.push({
        Country : this.countryRanking[i].country,
        CountryCode : this.countryRanking[i].countryInfo.iso2,
        Active : this.countryRanking[i].active,
        TestsPerOneMillion : this.countryRanking[i].testsPerOneMillion,
        TotalConfirmed : this.countryRanking[i].active + this.countryRanking[i].deaths + this.countryRanking[i].recovered,
        TotalDeaths: this.countryRanking[i].deaths,
        Critical: this.countryRanking[i].critical,
        ActivePerOneMillion : this.countryRanking[i].activePerOneMillion
      })

    }
  }


}


