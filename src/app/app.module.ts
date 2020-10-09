import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StatByCountryComponent } from './main-dashboard/stat-by-country/stat-by-country.component';
import { HttpClientModule } from '@angular/common/http';
import { StatWorldwideComponent } from './main-dashboard/stat-worldwide/stat-worldwide.component';
import { Separator } from "./thousand-separator.pipe";
import { StatRankingComponent } from './main-dashboard/stat-ranking/stat-ranking.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxPaginationModule} from 'ngx-pagination'; 
import { FormsModule } from '@angular/forms';
import { TablePipe } from "./search.pipe";
import { FullListCasesComponent } from './main-dashboard/full-list-cases/full-list-cases.component';
import { MainDashboardComponent } from './main-dashboard/main-dashboard.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { InfoSectionComponent } from './main-dashboard/info-section/info-section.component';
import { CovidMapComponent } from './main-dashboard/covid-map/covid-map.component';
import {LeafletModule} from '@asymmetrik/ngx-leaflet';
import { WorldwideTrendsComponent } from './main-dashboard/worldwide-trends/worldwide-trends.component';
import {GoogleAnalyticsService} from "./ga.service"; // import our Google Analytics service

@NgModule({
  declarations: [
    AppComponent,
    StatByCountryComponent,
    StatWorldwideComponent,
    Separator,
    StatRankingComponent ,
    TablePipe,
    FullListCasesComponent,
    MainDashboardComponent,
    InfoSectionComponent,
    CovidMapComponent,
    WorldwideTrendsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule ,
    NgxPaginationModule,
    FormsModule,
    Ng2SmartTableModule,
    LeafletModule
  ],
  providers: [GoogleAnalyticsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
