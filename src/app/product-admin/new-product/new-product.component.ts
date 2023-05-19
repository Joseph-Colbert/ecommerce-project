import { ProductService } from 'src/app/services/product.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/common/product';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {

  id!: number;
  sku!: '';
  name!: '';
  description!: '';
  unitPrice!: number;
  imageUrl!: '';
  active!: boolean;
  unitsInStock!: number;
  dateCreated!: Date;
  lastUpdated!:  Date;
  enterprise!: string;
  category!: string;
  
  

  constructor(
    private productService: ProductService,
    private router: Router
    ) { }

  ngOnInit() {
  }

  onCreate(): void {
    const product = new Product(this.id,this.sku, this.name, this.description, this.unitPrice, this.imageUrl, this.active, 
                                this.unitsInStock, this.dateCreated, this.lastUpdated, this.enterprise, this.category);
      this.productService.save(product).subscribe({
        next: data => {
          alert(`Producto Creado`)

        
          
          this.router.navigate(['/list']);
        },
        error: err => {
          alert(`Hubo un error`)

        }
    });
  }
}
