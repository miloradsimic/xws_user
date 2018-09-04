import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component'
import { MainViewComponent } from './components/main-view/main-view.component';
import { AccommodationViewComponent } from './components/accommodation-view/accommodation-view.component';
import { ReservationsComponent } from './components/reservations/reservations.component';
import { MessagesComponent } from './components/messages/messages.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/main'},
  { path: 'login', component: LoginComponent },
  { path: 'main', component: MainViewComponent },
  { path: 'accommodation/:id', component: AccommodationViewComponent },
  { path: 'reservations', component: ReservationsComponent },
  { path: 'messages', component: MessagesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
