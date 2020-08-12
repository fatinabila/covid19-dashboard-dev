import { Component, OnInit } from '@angular/core';
import { APIService } from "../api.service";
import { DateService } from "../date.service"
import { Chart } from 'chart.js';

@Component({
  selector: 'app-stat-by-country',
  templateUrl: './stat-by-country.component.html',
  styleUrls: ['./stat-by-country.component.css']
})

export class StatByCountryComponent implements OnInit {

  constructor(private _APIService: APIService, private _DateService: DateService) {}

  chart;
  listCountry;
  currentCountry = "Malaysia"

  ngOnInit() {

    this.getCountry()

    this._APIService.getStatByCountry("malaysia")
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
    this.chart.destroy();

    this._APIService.getStatByCountry(slug)
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

    for (let i = 0; i < data.length; i++) {

      dateList.push(this._DateService.getMonth(this._DateService.getFormattedDate(new Date(data[i].Date))))
      totalCases.push(data[i].Confirmed)
      totalActive.push(data[i].Confirmed - data[i].Recovered - data[i].Deaths)
      totalRecovered.push(data[i].Recovered)
      totalDeath.push(data[i].Deaths)

    }

    this.chart = new Chart('canvas', {
      type: 'bar',
      data: {
        labels: dateList,
        datasets: [{
            data: totalCases,
            barThickness: 20,
            maxBarThickness: 20,
            label: "Total Confirmed",
            type: "line"
          },

          {
            data: totalRecovered,
            backgroundColor: "#FFCF60",
            barThickness: 20,
            maxBarThickness: 20,
            label: "Total Recovered",
          },
          {
            data: totalDeath,
            backgroundColor: "#8BBBFF",
            barThickness: 20,
            maxBarThickness: 20,
            label: "Total Death(s)"
          },
          {
            data: totalActive,
            backgroundColor: "#EF843C",
            barThickness: 20,
            maxBarThickness: 20,
            label: "Active Case(s)",

          },

        ]
      },
      options: {
        maintainAspectRatio: false,
        legend: {
          labels: {}
        },
        scales: {
          xAxes: [{
            stacked: true,
            display: true,
            gridLines: {
              display: false
            },
            ticks: {
              beginAtZero: true
            },
          }],
          yAxes: [{

            display: true,
            stacked: true,
            gridLines: {
              display: true,
              drawBorder: false,
              color: "#EDEDF2",
              zeroLineBorderDashOffset: 50
            },
            ticks: {
              beginAtZero: true
            },

          }],
        }
      }
    });

  }




}
