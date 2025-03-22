import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { StorageService } from '../../../shared/services/storage.service';
import { MatCardModule } from '@angular/material/card';
import { NgIf, NgFor, NgClass } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NavbarComponent } from '../../../shared/pages/navbar/navbar.component';
import { FooterComponent } from '../../../shared/pages/footer/footer.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CartService } from '../../../Cart/services/cart.service';
import { Cart } from '../../../Cart/interfaces/cart';

@Component({
  selector: 'app-detail-product',
  standalone: true,
  imports: [
    MatCardModule, NgIf, NgFor, NgClass,
    MatProgressSpinnerModule,
    NavbarComponent,
    FooterComponent,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.scss'] // Corrección aquí
})
export class DetailProductComponent {
  productId: number = 0;
  product: any;  // Aquí almacenarás los detalles del producto
  currentImage: any;

  constructor(
    private route: ActivatedRoute,  // Para obtener el ID desde la URL
    private _productService: ProductService,  // Servicio para obtener los detalles del producto
    private _storageService: StorageService,
    private cartService: CartService, // Inyectado el servicio del carrito
    private router: Router
  ) {}

  ngOnInit(): void {
    // Obtener el 'id' desde la URL
    this.productId = +this.route.snapshot.paramMap.get('id')!;
    this.getProductDetail();
  }

  getProductDetail() {
    this._productService.getProductById(this.productId).subscribe({
      next: (data) => {
        if (data.isExitoso) {
          console.log("Producto obtenido por Id", data.resultado);
          this.product = data.resultado;
          // Establecer la imagen principal como la que tiene la propiedad EsPrincipal = true
          this.currentImage = this.product.imagenes.find((img: any) => img.esPrincipal) || this.product.imagenes[0];
        } else {
          this._storageService.mostrarAlerta('No se encontraron datos', 'Advertencia!');
        }
      },
      error: (e) => {
        this._storageService.mostrarAlerta(e.error.mensaje, 'Error!');
      },
    });
  }

  changeImage(imagen: any): void {
    this.currentImage = imagen; // Cambiar la imagen principal
  }

  BackHome(): void {
    this.router.navigate(['/']);
  }

  addToCart(product: any) {
    const cartItem: Cart = {
      id: product.id,
      product: {  // ✅ Debes incluir el objeto `product`
        name: product.name,
        price: product.price,
        imageUrl: product.imageUrl || '/assets/default-image.jpg'
      },
      quantity: 1,
      total: product.price
    };

    this.cartService.addToCart(cartItem);
  }

}
