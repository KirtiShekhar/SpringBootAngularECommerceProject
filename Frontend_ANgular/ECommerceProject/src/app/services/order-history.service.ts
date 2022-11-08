import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OrderHistory } from '../common/order-history';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OrderHistoryService {
  //  private OrderHistoryViewUrl = `${this.baseUrl}/purchase/getOrderHistory?emailAddress=kirtishekhar1997%40allaccessecommerce.in`;

  constructor(private httpCLient: HttpClient) {}

  // method to get order history based on email
  getOrderHistory(email: string): Observable<OrderHistory[]> {
    const orderHistoryViewUrl =
      environment.baseUrl +
      '/purchase/getOrderHistory?emailAddress=kirtishekhar1997%40allaccessecommerce.in';

    return this.httpCLient.get<OrderHistory[]>(orderHistoryViewUrl);
  }
}
