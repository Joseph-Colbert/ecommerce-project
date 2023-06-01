import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-debts',
  templateUrl: './debts.component.html',
  styleUrls: ['./debts.component.css']
})
export class DebtsComponent implements OnInit {

  constructor(private router: Router,
              private token: TokenService) { }

  ngOnInit(): void {
    
  }
/*
  handleDebts() {
    
  const userName = this.token.getUserName();

  // obtener datos delsde el service
  this.d.getOrderHistory(userName).subscribe(
    data => {
      this.orderHistoryList = data._embedded.orders;
    }
  );
}

  }*/


  volver(): void {
    this.router.navigate(['/products']);
  }
}
