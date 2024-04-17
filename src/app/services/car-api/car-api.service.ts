import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { catchError } from 'rxjs';
import { ICar } from '../../interfaces/car';

@Injectable({
  providedIn: 'root'
})
export class CarApiService {

  // Properties
  private _siteURL = "http://3.252.82.196:5050/Cars"

  // Constructor
  constructor(private _http: HttpClient) { }

  // Methods
  getCarDetails(): Observable<any> {
    return this._http.get<ICar>(this._siteURL)
      .pipe(
        tap(data => console.log('car data/error' + JSON.stringify(data))
        ),
        catchError(this.handleError)
      );
  }


  addCarDetails(car: ICar): Observable<any> {
    return this._http.post<ICar>(this._siteURL, car)
      .pipe(
        tap(data => console.log('add car message/error' + JSON.stringify(data))
        ),
        catchError(this.handleError)
      );
  }


  delCarDetails(carId: string): Observable<any> {
    let deleteURL = this._siteURL + "/" + carId;
    return this._http.delete(deleteURL)
      .pipe(
        tap(data => console.log('del car message/error' + JSON.stringify(data))
        ),
        catchError(this.handleError)
      );

  }

  private handleError(err: HttpErrorResponse) {
    console.log('CarApiService: ' + err.message);
    return err.message;
  }
}
