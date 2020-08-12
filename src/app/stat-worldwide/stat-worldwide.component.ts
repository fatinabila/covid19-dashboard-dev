import { Component, OnInit ,Input} from '@angular/core';
import { APIService } from "../api.service";
import { DateService } from "../date.service"
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

    this._APIService.getWorldWideTrend()
    .subscribe(res => {
      this.drawChart(res)
    })

    //getWorldWideTrend()

  }

  globalConfirmed;
  globalRecovered;
  globalActive;
  globalDeaths;

  globalNewConfirmed

  lastDate

  populateStats(data){

    let indexMY = data.Countries.findIndex(x => x.CountryCode === "MY")
    this.drawChart(data.Countries[indexMY])

    //.findIndex(x => x.SysName.trim().toLowerCase() === system.trim().toLowerCase());

    this.globalConfirmed = data.Global.TotalConfirmed
    this.globalRecovered = data.Global.TotalRecovered
    this.globalDeaths = data.Global.TotalDeaths
    this.globalActive  = this.globalConfirmed - this.globalRecovered - this.globalDeaths;
    this.globalNewConfirmed = data.Global.NewConfirmed;

    this.lastDate = this._DateService.getMonth(this._DateService.getFormattedDate(new Date(data.Date)))


  }

  chartLine

  drawChart(data){

    this.chartLine = new Chart('canvasLine', {
      type: 'doughnut',
      data: {
        labels: ["New Confirmed", "New Death", "New Recovered"],
        datasets: [
          {
            data:  [data.NewConfirmed, data.NewDeaths, data.NewRecovered],
            backgroundColor: ["#110F48", "#D8F4FF" , "#E63A54", ]

          },
        
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        legend: {
          position : "bottom"
        },
        cutoutPercentage: 70,
        scales: {
          xAxes: [{
            display: false,
            gridLines: {
              display: false
            },
            ticks: {
              beginAtZero: true
            },
          }],
          yAxes: [{

            display: false,
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

    Chart.pluginService.register({
      beforeDraw: function(chart) {
        var width = chart.chart.width,
            height = chart.chart.height,
            ctx = chart.chart.ctx,
            type = chart.config.type;
    
        if (type == 'doughnut')
        {
          var percent = chart.config.data.datasets[0].data[0]
          var oldFill = ctx.fillStyle;
          var fontSize = 0.8;
    
          ctx.restore();
          ctx.font = fontSize + "em Merriweather";
          // ctx.textBaseline = "middle"
    
          var text = percent + "New Case(s)",
          textX = Math.round((width - ctx.measureText(text).width) / 2),
          textY = height/ 3;
    
          ctx.fillStyle = chart.config.data.datasets[0].backgroundColor[0];
          ctx.fillText(text, textX, textY);
          ctx.fillStyle = oldFill;
          ctx.save();
        }
      }
    });

 
  }

  

}
