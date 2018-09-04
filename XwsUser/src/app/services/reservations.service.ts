import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ReservationRequest } from '../domain/reservation-request';
import { Observable } from 'rxjs';
import { Reservation } from '../domain/reservation';

@Injectable({
  providedIn: 'root'
})
export class ReservationsService {

  constructor(private client: HttpClient) { }

  public getUsersReservations(): Observable<Reservation[]> {
    return this.client.get<Reservation[]>("/backend/accommodation/user_reservations");
  }

  public checkAvailability(reservationRequest: ReservationRequest): Observable<boolean> {
    return this.client.post<boolean>("/backend/accommodation/check_if_available", reservationRequest);
  }

  public reserve(reservationRequest: ReservationRequest): Observable<Reservation> {
    return this.client.post<Reservation>("/backend/accommodation/reservation", reservationRequest);
  }

  public cancelReservation(id: number) {
    return this.client.get(`/backend/accommodation/cancel_reservation/${id}`);
  }
}
