import { Component, OnInit } from '@angular/core';
import { Accommodation } from '../../domain/accommodation';
import { AccommodationType } from '../../domain/accommodation-type';
import { AccommodationsService } from '../../services/accommodations.service';
import { BasicSearchQuery } from '../../domain/basic-search-query';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.css']
})
export class MainViewComponent implements OnInit {

  private sortByCategoryDirection = 1;
  private sortByDailyPriceDirection = 1;

  private accommodations: Accommodation[];
  private basicSearchQuery: BasicSearchQuery;

  constructor(private accommodationsService: AccommodationsService) {
    this.accommodations = null;
    this.basicSearchQuery = {
      address: null,
      from: null,
      to: null
    }
  }

  ngOnInit() {
    let component = this;
    this.accommodationsService.getAllAccommodations().subscribe(
      (accommodations) => {
        component.accommodations = accommodations;
      },
      (errorResponse) => {
        alert("Remote error! Server response: " + JSON.stringify(errorResponse));
      }
    );
  }

  valid(): boolean {
    let result = true;
    if (this.basicSearchQuery.to || this.basicSearchQuery.from) {
      result = this.basicSearchQuery.from.getTime() < this.basicSearchQuery.to.getTime();
    }
    return result;
  }

  basicSearch() {
    let component = this;
    this.accommodationsService.basicSearch(this.basicSearchQuery).subscribe(
      (foundAccommodations) => {
        component.accommodations = foundAccommodations;
      },
      (errorResponse) => {
        alert("Remote error! Server response: " + JSON.stringify(errorResponse));
      }
    );
  }

  sortByCategory() {
    let component = this;
    this.sortByCategoryDirection *= -1;
    this.accommodations.sort(
      (first: Accommodation, second: Accommodation) => {
        const firstCategory = first.category;
        const secondCategory = second.category;
        if (firstCategory != null) {
          if (secondCategory != null) {
            return (firstCategory - secondCategory) * component.sortByCategoryDirection;
          } else {
            return -1 * component.sortByCategoryDirection;
          }
        } else {
          if (secondCategory != null) {
            return 1 * component.sortByCategoryDirection;
          }
          else {
            return 0;
          }
        }
      }
    );
  }

  sortByPrice() {
    let component = this;
    this.sortByDailyPriceDirection *= -1;
    this.accommodations.sort(
      (first: Accommodation, second: Accommodation) => {
        const firstDailyPrice = first.dailyPrice;
        const secondDailyPrice = second.dailyPrice;
        if (firstDailyPrice != null) {
          if (secondDailyPrice != null) {
            return (firstDailyPrice - secondDailyPrice) * component.sortByDailyPriceDirection;
          } else {
            return -1 * component.sortByDailyPriceDirection;
          }
        } else {
          if (secondDailyPrice != null) {
            return 1 * component.sortByDailyPriceDirection;
          }
          else {
            return 0;
          }
        }
      }
    );
  }

}
