import { ProductService } from 'src/app/services/product.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/common/product';
import Swal from 'sweetalert2';

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
  enterprise: string = "Maquillaje123";
  category!: string;
  
  

  constructor(
    private productService: ProductService,
    private router: Router
    ) { }

  ngOnInit() {
  }

  onCreate(): void {
    const product = new Product(this.id,this.sku, this.name, this.description, this.unitPrice, this.imageUrl, this.active, 
                                this.unitsInStock, this.dateCreated, this.lastUpdated, "/enterprises/2", this.category);
      this.productService.save(product).subscribe({
        next: data => {
          Swal.fire('Felicidades!',
                    'Producto Creado',
                    'success'); 
          
          this.router.navigate(['/list']);
        },
        error: err => {
          Swal.fire('Error!',
                    'Hubo un Error',
                    'error'); 
        }
    });
  }

  volver(): void {
    this.router.navigate(['/list']);
  }

}
