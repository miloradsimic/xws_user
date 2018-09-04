import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Accommodation } from '../domain/accommodation';
import { BasicSearchQuery } from '../domain/basic-search-query';

@Injectable({
  providedIn: 'root'
})
export class AccommodationsService {

  lastBasicSearchQuery: BasicSearchQuery;

  constructor(private client: HttpClient) { }

  public getAllAccommodations(): Observable<Accommodation[]> {
    return this.client.get<Accommodation[]>("/backend/accommodation/accommodations");
  }

  public getSingleAccommodation(id: number): Observable<Accommodation> {
    return this.client.get<Accommodation>(`/backend/accommodation/accommodation/${id}`);
  }

  public basicSearch(query: BasicSearchQuery): Observable<Accommodation[]> {
    this.lastBasicSearchQuery = query;
    return this.client.post<Accommodation[]>("/backend/accommodation/search", query);
  }
}
