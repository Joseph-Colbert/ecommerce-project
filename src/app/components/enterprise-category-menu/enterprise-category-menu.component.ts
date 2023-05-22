import { Component, ElementRef, OnInit } from '@angular/core';
import { EnterpriseCategory } from 'src/app/common/enterprise-category';
import { EnterpriseService } from 'src/app/services/enterprise.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-enterprise-category-menu',
  templateUrl: './enterprise-category-menu.component.html',
  styleUrls: ['./enterprise-category-menu.component.css']
})
export class EnterpriseCategoryMenuComponent implements OnInit {

  enterpriseCategories: EnterpriseCategory[] = [];
  isLogged = false;

  constructor(private enterpriseService: EnterpriseService,
    private elementRef: ElementRef,
    private tokenService: TokenService) { }


  ngOnInit(): void {

    if(this.tokenService.getToken()) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }

    this.listEnterpriseCategories();    

        //funcion barra desplegable
       /* let arrow = document.querySelectorAll(".arrow");
        for (var i = 0; i < arrow.length; i++) {
          arrow[i].addEventListener("click", (e)=>{
            let arrowParent = (e.target as HTMLElement).parentElement?.parentElement;
    
         arrowParent!.classList.toggle("showMenu");
          });
        }
        
        let sidebar = document.querySelector(".sidebar");
        let sidebarBtn = document.querySelector(".bx-menu");
        console.log(sidebarBtn);
        sidebarBtn!.addEventListener("click", ()=>{
          sidebar!.classList.toggle("close");
        });*/
  }

  listEnterpriseCategories() {
    this.enterpriseService.getEnterpriseCategories().subscribe(
      ( data: EnterpriseCategory[]) => {
        console.log('Enterprise Categories=' + JSON.stringify(data));
        this.enterpriseCategories = data;
      }
    );
  }


}
