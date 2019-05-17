import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { api } from './config';
import { map, catchError } from 'rxjs/operators';



/*
  Generated class for the ServicesUserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class OrderProvider {

  constructor(public http: HttpClient) {
    console.log('Hello ServicesUserProvider Provider');
  }

  pendingOrders(restId): Observable<any> {
    return this.http.get(api.atableApi + 'restaurant/pending_orders?rest_id=' + restId).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }


  orderDetails(orderRecId): Observable<any> {
    return this.http.get(api.atableApi + 'restaurant/order_details?order_rec_id=' + orderRecId).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  updateOrder(orderRecId, flag): Observable<any> {
    return this.http.post(api.atableApi + 'restaurant/update_order', {order_rec_id: orderRecId, flag: flag}).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  // Private
  private extractData(res: Response) {
    let body = res;
    return body || {};
  }

  private handleError (error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const err = error || '';
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}
