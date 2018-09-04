import { Component, OnInit } from '@angular/core';
import { Accommodation } from '../../domain/accommodation';
import { AccommodationType } from '../../domain/accommodation-type';
import { Comment } from '../../domain/comment';
import { AccommodationsService } from '../../services/accommodations.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { CommentService } from '../../services/comment.service';
import { ReservationRequest } from '../../domain/reservation-request';
import { LoginServiceService } from '../../services/login-service.service';
import { ReservationsService } from '../../services/reservations.service';

@Component({
  selector: 'app-accommodation-view',
  templateUrl: './accommodation-view.component.html',
  styleUrls: ['./accommodation-view.component.css']
})
export class AccommodationViewComponent implements OnInit {

  private accommodation: Accommodation;
  private reservationRequest: ReservationRequest;
  private comments: Comment[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private loginService: LoginServiceService,
    private accommodationsService: AccommodationsService,
    private reservationsService: ReservationsService,
    private commentService: CommentService) {
    this.accommodation = {};
    this.comments = null;
  }

  ngOnInit() {
    let component = this;
    this.activatedRoute.paramMap.subscribe(
      (params: ParamMap) => {
        component.accommodationsService.getSingleAccommodation(Number.parseInt(params.get("id"))).subscribe(
          (singleAccommodation: Accommodation) => {
            component.accommodation = singleAccommodation;
            component.reservationRequest = {
              accommodation_id: singleAccommodation.id,
              from: null,
              to: null
            };
            if(component.accommodationsService.lastBasicSearchQuery) {
              component.reservationRequest.from = component.accommodationsService.lastBasicSearchQuery.from;
              component.reservationRequest.to = component.accommodationsService.lastBasicSearchQuery.to; 
            }
            component.commentService.getCommentsForAccommodation(component.accommodation.id).subscribe(
              (comments) => {
                component.comments = comments;
              },
              (errorResponse) => {
                alert("Remote error! Server response: " + JSON.stringify(errorResponse));    
              }
            );
          },
          (errorResponse) => {
            alert("Remote error! Server response: " + JSON.stringify(errorResponse));
          }
        );
      },
      (error) => {
        alert("Routing error! Error object: " + JSON.stringify(error));
      }
    );
  }

  checkAvailability() {
    
    if(!this.loginService.isLoggedIn()) {
      let result = confirm("You are not logged in! Redirect to login?");
      if(result) {
        this.router.navigate(["/login"]);
        return true;
      }
      else {
        return false;
      }
    }

    let component = this;
    this.reservationsService.checkAvailability(this.reservationRequest).subscribe(
      (availabilityStatus) => {
        if(availabilityStatus) {
          alert(`AVAILABLE!\n Accommodation '${component.accommodation.address}' IS available in period from '${component.reservationRequest.from}' to '${component.reservationRequest.to}'`);
        } else {
          alert(`UNAVAILABLE!\n Accommodation '${component.accommodation.address}' is NOT available in period from '${component.reservationRequest.from}' to '${component.reservationRequest.to}'`);
        }
      },
      (errorResponse) => {
        alert("Remote error! Server response: " + JSON.stringify(errorResponse));
      }
    );
  }

  reserve() {
    
    if(!this.loginService.isLoggedIn()) {
      let result = confirm("You are not logged in! Redirect to login?");
      if(result) {
        this.router.navigate(["/login"]);
        return true;
      }
      else {
        return false;
      }
    }
    
    let component = this;
    this.reservationsService.reserve(this.reservationRequest).subscribe(
      (reservation) => {
        alert(`You have successfully reserved accommodation '${component.accommodation.address}' in period from '${component.reservationRequest.from}' to '${component.reservationRequest.to}'`);
      },
      (errorResponse) => {
        alert("Remote error! Server response: " + JSON.stringify(errorResponse));
      }
    );
  }
}
