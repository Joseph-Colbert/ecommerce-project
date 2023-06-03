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
  storage: Storage = sessionStorage;

  constructor(private debtsHistoryService: DebtsService,
              private router: Router,
              private token: TokenService) { }

  ngOnInit(): void {
    this.handleDebts();
  }

  handleDebts() {
    
      const userName = this.token.getUserName();

      // obtener datos desde el service
      this.debtsHistoryService.getDebtsHistory(userName).subscribe(
        data => {
          this.debtsHistoryList = data._embedded.orderOnCredits;
        }
      );
    }

    
  volver(): void {
    this.router.navigate(['/products']);
  }
}



