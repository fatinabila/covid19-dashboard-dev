import { Component, OnInit } from '@angular/core';
import { APIService } from "../../api.service";
import { DateService } from "../../date.service"
import { Chart } from 'chart.js';

import {GoogleAnalyticsService} from "../../ga.service"; // import our analytics service

@Component({
  selector: 'app-stat-by-country',
  templateUrl: './stat-by-country.component.html',
  styleUrls: ['./stat-by-country.component.css']
})

export class StatByCountryComponent implements OnInit {

  constructor(private _APIService: APIService,  private googleAnalyticsService:GoogleAnalyticsService) {}

  chart;
  listCountry;
  currentCountry = "Malaysia"

  ngOnInit() {

    this.getCountry()

    this._APIService.getStatByCountry("malaysia", 14)
      .subscribe(res => {
        this.drawChart(res)
      })

  }

  getCountry() {
    this._APIService.getCountry().subscribe(res => {
      this.listCountry = res

      this.listCountry.sort(function (a, b) {
        var textA = a.Country.toUpperCase();
        var textB = b.Country.toUpperCase();
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });

    })
  }


  changeCountry(slug, country) {

    this.currentCountry = country

    let timestamp = new Date()
    this.googleAnalyticsService.eventEmitter("chart", JSON.stringify(timestamp)+" - "+country, country, 1);

    this.chart.destroy();

    this._APIService.getStatByCountry(slug, 14)
      .subscribe(res => {
        this.drawChart(res)
        this.chart.update();
      })

  }
  drawChart(data) {

    let dateList = []
    let totalCases = []
    let totalActive = []
    let totalRecovered = []
    let totalDeath = []

  
    for (const property in data.timeline.cases) {
      dateList.push(property)
      totalCases.push(data.timeline.cases[property])
      totalRecovered.push(data.timeline.recovered[property])
      totalActive.push(data.timeline.cases[property] - data.timeline.recovered[property] - data.timeline.deaths[property])
      totalDeath.push(data.timeline.deaths[property])
    }

    this.chart = new Chart('canvas', {
      type: 'bar',
      data: {
        labels: dateList,
        datasets: [
          {
            data: totalCases,
            barThickness: 20,
            maxBarThickness: 20,
            label: "Total Confirmed",
            type: "line",
            borderColor : "#fff9dd",
            backgroundColor: "transparent",
            borderWidth : 2
          },

          {
            data: totalRecovered,
            // backgroundColor: "#f4c2c2",
            backgroundColor: "#fff",
            barThickness: 20,
            maxBarThickness: 20,
            label: "Total Recovered",
            fontColor: '#fff',
          },
          {
            data: totalDeath,
            backgroundColor: "#6236FF",
            barThickness: 20,
            maxBarThickness: 20,
            label: "Total Death(s)",
            fontColor: '#fff',
          },
          {
            data: totalActive,
            backgroundColor: "#EF843C",
            barThickness: 20,
            maxBarThickness: 20,
            label: "Active Case(s)",
            fontColor: '#fff',
          },

        ]
      },
      options: {
        maintainAspectRatio: false,
        legend: {
          labels: {
            fontColor: "#fff",
            fontFamily :  'B612'
        }
        },
        scales: {
          xAxes: [{
            stacked: true,
            display: true,
            gridLines: {
              display: false
            },
            ticks: {
              beginAtZero: true,
              fontColor: "white",
              fontFamily :  'B612'
            },
          }],
          yAxes: [{

            display: true,
            stacked: true,
            gridLines: {
              display: true,
              drawBorder: false,
              color: "transparent",
              zeroLineBorderDashOffset: 50
            },
            ticks: {
              beginAtZero: true,
              fontColor: "white",
              fontFamily :  'B612'
            },

          }],
        }
      }
    });

  }




}
