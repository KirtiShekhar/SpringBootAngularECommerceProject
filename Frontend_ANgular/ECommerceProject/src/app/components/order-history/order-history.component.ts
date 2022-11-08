import { Component, OnInit } from '@angular/core';
import { OrderHistory } from 'src/app/common/order-history';
import { OrderHistoryService } from 'src/app/services/order-history.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css'],
})
export class OrderHistoryComponent implements OnInit {
  orderHistoryList: OrderHistory[] = [];
  emailStorage: Storage = sessionStorage;

  constructor(private orderHistoryService: OrderHistoryService) {}

  ngOnInit(): void {
    this.handleViewOrderHistory();
  }

  handleViewOrderHistory() {
    // read the user email address from browser setting
    const emailAddress = 'kirtishekhar1997@allaccessecommerce.in'; //JSON.parse(this.emailStorage.getItem('email')!);

    // retrieve data from service
    this.orderHistoryService.getOrderHistory(emailAddress).subscribe((data) => {
      this.orderHistoryList = data;
    });
  }
}
