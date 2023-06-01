import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  hamburguer1 = document.querySelector('.hamburguer')
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
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
