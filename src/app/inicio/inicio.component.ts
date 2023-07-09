import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RoutingServiceService } from '../services/routing-service.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  hamburguer1 = document.querySelector('.hamburguer')
  constructor(private route: ActivatedRoute,// TODO
              private router: RoutingServiceService) { }// TODO

  ngOnInit(): void {
    this.router.routeSource.next(this.route);// TODO

    const hamburguer = document.querySelector('.hamburguer')
    const menu = document.querySelector('.menu-navegacion')


    hamburguer!.addEventListener('click', ()=>{
        menu!.classList.toggle("spread")
    })

    window.addEventListener('click', e =>{
      if(menu!.classList.contains('spread') 
          && e.target != menu && e.target != hamburguer){
          console.log('cerrar')
          menu!.classList.toggle("spread")
      } 
  })
  }
  

}
