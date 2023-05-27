import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-debts',
  templateUrl: './debts.component.html',
  styleUrls: ['./debts.component.css']
})
export class DebtsComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  volver(): void {
    this.router.navigate(['/products']);
  }
}
