import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoutingServiceService {

  routeSource: Subject<ActivatedRoute> = new Subject<ActivatedRoute>();
  route$: Observable<ActivatedRoute> = this.routeSource.asObservable();

  constructor() { }
}
