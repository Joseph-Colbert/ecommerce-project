import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Customer } from '../common/customer';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {
 /* customer!: Customer;
  postSource = new Subject();
  posts$ = this.postSource.asObservable().pipe
*/

private customers = 'http://localhost:8080/api/customers';
  constructor(private httpClient: HttpClient) { }

  customer(userName: string) {
    const customer= `${this.customers}/${userName}`;
    return this.httpClient.get<any>(customer);
  }
}
