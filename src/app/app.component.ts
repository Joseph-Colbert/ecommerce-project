import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { RoutingServiceService } from './services/routing-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angular-ecommerce';
  actualRoute: any;

  constructor(private routerService: RoutingServiceService) {
    /*this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.actualRoute = event.url;
        console.log(this.actualRoute + "dsadadasdasdasd");
      }
    });*/
  }

  ngOnInit(): void {
    this.rutaActualSubscribe();
    //console.log(this.activatedRoute)
  }  

  async rutaActualSubscribe() {
    this.routerService.route$.subscribe(res => {
      this.actualRoute = res;
      console.log(res);
    });
  }

  mostrarNavBar(): boolean {  
    
    return this.actualRoute.component.name  !== 'InicioComponent';
  
    
  }
}
