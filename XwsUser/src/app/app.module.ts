import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { MainViewComponent } from './components/main-view/main-view.component';
import { AccommodationViewComponent } from './components/accommodation-view/accommodation-view.component';
import { NewCommentComponent } from './components/new-comment/new-comment.component';
import { NewMessageComponent } from './components/new-message/new-message.component';
import { MessagesComponent } from './components/messages/messages.component';
import { ReservationsComponent } from './components/reservations/reservations.component';
import { AuthInterceptor } from './services/auth-interceptor';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainViewComponent,
    AccommodationViewComponent,
    NewCommentComponent,
    NewMessageComponent,
    MessagesComponent,
    ReservationsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule.forRoot()
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
