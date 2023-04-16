import { ProductService } from './../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product!: Product; 

  constructor(private ProductService: ProductService,
              private route: ActivatedRoute ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.handleProductDetails();
    })
  }

  handleProductDetails() {

    //convertir string en number usando el simbolo "+"
    const theProductId: number = +this.route.snapshot.paramMap.get('id')!;

    this.ProductService.getProduct(theProductId).subscribe(
      data => {
        this.product = data;
      }
    )
  }

}
