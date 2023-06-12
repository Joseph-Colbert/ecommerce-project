import { OrderOnCredit } from 'src/app/common/order-on-credit';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Debts } from 'src/app/common/debts';
import { DebtsService } from 'src/app/services/debts.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-debts',
  templateUrl: './debts.component.html',
  styleUrls: ['./debts.component.css']
})
export class DebtsComponent implements OnInit {

  debtsHistoryList: Debts[] = [];
  debtsHistory: any[] = [];
  storage: Storage = sessionStorage;

  constructor(private debtsHistoryService: DebtsService,
              private router: Router,
              private token: TokenService) { }

  ngOnInit(): void {
    this.handleDebts().then((v) => this.orderItem(v));
  }

  async handleDebts() {
    
      const userName = this.token.getUserName();

      return new Promise<any>((resolve,reject) => {
          // obtener datos desde el service
      this.debtsHistoryService.getDebtsHistory(userName).subscribe({
        next: (data) => {

          this.debtsHistoryList = data._embedded.orderOnCredits;
             
          resolve(data._embedded.orderOnCredits);
        }, 
        error: (error) => {
          reject(error);
        }
      }
        // 
      );
      })
    }

  orderItem(t:any) {
    t.forEach((v:any) => {
      this.debtsHistoryService.getDebtsHistoryOrders(v.orderTrackingNumber).subscribe(
        data => {
          this.debtsHistory.push(data._embedded.orderItemOnCredits[0]);
          v.idOrderItem = data._embedded.orderItemOnCredits[0]?.id;
          v.imageUrl = data._embedded.orderItemOnCredits[0]?.imageUrl;
          v.payment = data._embedded.orderItemOnCredits[0]?.payment;
          v.unitPrice = data._embedded.orderItemOnCredits[0]?.unitPrice;
          v.numberOfFeesPaid = data._embedded.orderItemOnCredits[0]?.numberOfFees;
          v.numberOfFeesToPay = data._embedded.orderItemOnCredits[0]?.monthlyFees; ///cambiar a entero
        }
      );

    })
  }  


    
  volver(): void {
    this.router.navigate(['/products']);
  }
}



