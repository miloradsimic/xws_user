import { Component, OnInit } from '@angular/core';
import { ReservationsService } from '../../services/reservations.service';
import { Reservation } from '../../domain/reservation';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css']
})
export class ReservationsComponent implements OnInit {

  private reservations: Reservation[];

  constructor(private reserationsService: ReservationsService) { }

  ngOnInit() {
    let component = this;
    this.reserationsService.getUsersReservations().subscribe(
      (reservations) => {
        component.reservations = reservations;
      }, 
      (errorResponse) => {
        alert("Remote error! Server response: " + JSON.stringify(errorResponse));
      }); 
  }

  cancelReservation(id: number) {
    let component = this;
    const confirmResult = confirm("Are you sure that you want to cancel reservation?");
    if(confirmResult) {
      this.reserationsService.cancelReservation(id).subscribe(
        (okResponse) => {
          const canceledReservationIndex = component.reservations.findIndex((item) => {
            return item.id == id;
          });
          component.reservations.splice(canceledReservationIndex, 1);
        },
        (errorResponse) => {
          alert("Remote error! Server response: " + JSON.stringify(errorResponse));
        }
      );
    }
  }

}
