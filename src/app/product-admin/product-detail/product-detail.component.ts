import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';



@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  product: Product = null!;

  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    
    private router: Router
  ) { }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.params?.['id'];
    this.productService.detail(id).subscribe({
      next: data => {
        this.product = data;
      },
      error: err => {

      }
  });
  }

  volver(): void {
    this.router.navigate(['/list']);
  }

}