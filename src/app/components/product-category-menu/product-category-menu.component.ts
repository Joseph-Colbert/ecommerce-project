import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ProductCategory } from 'src/app/common/product-category';
import { ProductService } from 'src/app/services/product.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-product-category-menu',
  templateUrl: './product-category-menu.component.html',
  styleUrls: ['./product-category-menu.component.css']
})
export class ProductCategoryMenuComponent implements OnInit {

  productCategories: ProductCategory[] = [];
  isLogged = false;

  constructor(private productService: ProductService,
              private tokenService: TokenService,
              private router: Router) { }

  ngOnInit(): void {

    if(this.tokenService.getToken()) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }


    this.listProductCategories();
  }

  listProductCategories() {
    this.productService.getProductCategories().subscribe(
      ( data: ProductCategory[]) => {
        console.log('Product Categories=' + JSON.stringify(data));
        this.productCategories = data;
      }
    );
  }

  debts(): void {
    this.router.navigate(['/debts']);
  }
  
  

}
