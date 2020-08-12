import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StatByCountryComponent } from './stat-by-country/stat-by-country.component';
import { HttpClientModule } from '@angular/common/http';
import { StatWorldwideComponent } from './stat-worldwide/stat-worldwide.component';
import { Separator } from "./thousand-separator.pipe";
import { StatRankingComponent } from './stat-ranking/stat-ranking.component'

@NgModule({
  declarations: [
    AppComponent,
    StatByCountryComponent,
    StatWorldwideComponent,
    Separator,
    StatRankingComponent 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule ,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
