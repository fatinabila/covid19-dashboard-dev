import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FullListCasesComponent } from './main-dashboard//full-list-cases/full-list-cases.component';
import { MainDashboardComponent } from './main-dashboard/main-dashboard.component';

const routes: Routes = [
  { path : '' , component : MainDashboardComponent},
  { path : 'cases-by-country' , component : FullListCasesComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
