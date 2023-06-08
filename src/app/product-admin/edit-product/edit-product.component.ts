import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { tap, catchError } from 'rxjs/operators';
import { of, throwError } from 'rxjs';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';


@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  productId!: number;
  product!: Product;

  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }
  
  ngOnInit() {
    this.productId = this.activatedRoute.snapshot.params['id'];

    this.productService.getProduct(this.productId).pipe(
      catchError((error) => {
        console.error(error);
        return of(null);
      })
    ).subscribe((response: Product | null) => {
      if (response) {
        this.product = response;
      } else {
        // Manejar el caso de error aquí
      }
    });
  }

  updateProduct(): void {
    this.productService.updateProduct(this.productId, this.product).pipe(
      catchError((error) => {
        console.error(error);
        return of(null);
      })
    ).subscribe((response: any) => {
      // Manejar la respuesta después de la actualización del producto
      console.log('Producto actualizado exitosamente');
      this.router.navigate(['/list']); // Redireccionar a la lista de productos
    });
  }

  volver(): void {
    this.router.navigate(['/list']);
  }

}
