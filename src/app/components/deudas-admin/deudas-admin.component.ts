import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DeudasAdmin } from 'src/app/common/deudas-admin';
import { DeudasAdminService } from 'src/app/services/deudas-admin.service';
import { TokenService } from 'src/app/services/token.service';
import { defineComponents, IgcRatingComponent } from 'igniteui-webcomponents';

defineComponents(IgcRatingComponent);

@Component({
  selector: 'app-deudas-admin',
  templateUrl: './deudas-admin.component.html',
  styleUrls: ['./deudas-admin.component.css']
})
export class DeudasAdminComponent implements OnInit {

  debtsHistoryList: DeudasAdmin[] = [];
  debtsHistory: any[] = [];
  storage: Storage = sessionStorage;

  ratingVal: number;

  constructor(private debtsHistoryService: DeudasAdminService,
              private router: Router,
              private token: TokenService) { 

                const currentDate = new Date();
                const targetDate = new Date(); // Usamos la fecha actual para obtener una diferencia de meses igual a 4
            
                targetDate.setMonth(currentDate.getMonth() + 4); // Agregamos 4 meses a la fecha actual
            
                const diffInMonths = this.calculateMonthDifference(targetDate, currentDate);
            
                // Ajusta la puntuación en base a la diferencia de meses
                this.ratingVal = this.calculateRating(diffInMonths);
              }

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

calculateMonthDifference(date1: Date, date2: Date): number {
    const diffInMilliseconds = Math.abs((date1.getTime() + 120) - date2.getTime());
    const diffInMonths = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24 * 30));
    return diffInMonths;
  }

  calculateRating(monthDifference: number): number {
    // Lógica para ajustar la puntuación en base a la diferencia de meses

    if (monthDifference >= 12) {
      return 5;
    } else if (monthDifference >= 6) {
      return 4;
    } else if (monthDifference >= 3) {
      return 3;
    } else if (monthDifference >= 1) {
      return 2;
    } else {
      return 1;
    }
  }
  ratingChanged(event: any) {
    this.ratingVal = event.rating;
  }

  ratingValue(paid:number, toPay:number){
    const stars = 5;
    const starsPondered = stars/toPay;
    return paid*starsPondered;
  }
    
  volver(): void {
    this.router.navigate(['/products']);
  }
}
