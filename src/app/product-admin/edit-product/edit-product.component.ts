import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';


@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

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
      error:err => {

        this.router.navigate(['/']);
      }
    });
  }

  onUpdate(): void {
    const id = this.activatedRoute.snapshot.params?.['id'];
    this.productService.update(id, this.product).subscribe({
      next: data => {

        this.router.navigate(['/list']);
      },
      error: err => {

      }
  });
  }

}
