import { Component, OnInit } from '@angular/core';
import { OrderHistory } from 'src/app/common/order-history';
import { OrderHistoryService } from 'src/app/services/order-history.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {

  orderHistoryList: OrderHistory[] = [];
  storage: Storage = sessionStorage;

  constructor(private orderHistoryService: OrderHistoryService, 
    private token: TokenService) { }

  ngOnInit(): void {
    this.handleOrderHistory();
  }
  handleOrderHistory() {
  

    const userName = this.token.getUserName();

    // obtener datos delsde el service
    this.orderHistoryService.getOrderHistory(userName).subscribe(
      data => {
        this.orderHistoryList = data._embedded.orders;
      }
    );
  }

}
