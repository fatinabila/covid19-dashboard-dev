import { Component, OnInit } from '@angular/core';
import {GoogleAnalyticsService} from "../../ga.service"; // import our analytics service

@Component({
  selector: 'app-info-section',
  templateUrl: './info-section.component.html',
  styleUrls: ['./info-section.component.css']
})
export class InfoSectionComponent implements OnInit {

  constructor(private googleAnalyticsService:GoogleAnalyticsService) { }

  ngOnInit(): void {
  }
  
  track(){
    let timestamp = new Date()
    this.googleAnalyticsService.eventEmitter("live update", JSON.stringify(timestamp), null, 1);
  }
}
