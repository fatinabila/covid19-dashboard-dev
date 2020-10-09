import { Component, OnInit } from '@angular/core';
import {GoogleAnalyticsService} from "../ga.service"; // import our analytics service

@Component({
  selector: 'app-main-dashboard',
  templateUrl: './main-dashboard.component.html',
  styleUrls: ['./main-dashboard.component.css']
})
export class MainDashboardComponent implements OnInit {

  constructor(private googleAnalyticsService:GoogleAnalyticsService) { }

  ngOnInit(): void {
  }

  track(){
    let timestamp = new Date()
    this.googleAnalyticsService.eventEmitter("githubVisit", JSON.stringify(timestamp), null, 1);
  }

}
