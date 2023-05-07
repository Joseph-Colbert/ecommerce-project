import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-admin.component.html',
  styleUrls: ['./product-list-admin.component.css']
})
export class ProductListAdminComponent implements OnInit {

  products: Product[] = [];
  
  roles!: string[];
  isAdmin = false;

  constructor(
    private productService: ProductService,
    private tokenService: TokenService) { }

  ngOnInit() {
    this.cargarProductos();
    this.roles = this.tokenService.getAuthorities();
    this.roles.forEach(rol => {
      if (rol === 'ROLE_ADMIN') {
        this.isAdmin = true;
      }
    });
  }

  cargarProductos(): void {
    this.productService.list().subscribe({
      next: data => {
        console.log(data);
        this.products = data._embedded.products;
      },
      error: err => {
        console.log(err);
      }
    });
  }

  borrar(id: number) {
    this.productService.delete(id).subscribe({
      next: data => {

        this.cargarProductos();
      },
      error: err => {

      }
  });
  }

}
