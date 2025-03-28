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
import { Product } from '../../interfaces/product';
import {MatDividerModule} from '@angular/material/divider';

@Component({
  selector: 'app-detail-product',
  standalone: true,
  imports: [
    MatCardModule, NgIf, NgFor, NgClass,
    MatProgressSpinnerModule,
    NavbarComponent,
    FooterComponent,
    MatButtonModule,
    MatIconModule, MatDividerModule
  ],
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'] // Corrección aquí
})
export class DetailComponent {
  productId: number = 0;
  product: any;  // Aquí almacenarás los detalles del producto
  currentImage: any;
  cart: Cart[] = [];


  constructor(
    private route: ActivatedRoute,  // Para obtener el ID desde la URL
    private _productService: ProductService,  // Servicio para obtener los detalles del producto
    private _storageService: StorageService,
    private cartService: CartService, // Inyectado el servicio del carrito
    private router: Router,
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

  addToCart() {
    if (!this.product) return;

    const cartItem = {
      id: this.product.id,
      product: {
        name: this.product.name,
        price: this.product.price,
        imageUrl: this.getPrincipalImage(this.product.imagenes) // ✅ Obtener imagen principal
      },
      quantity: 1,
      total: this.product.price
    };

    this.cartService.addToCart(cartItem);
    console.log("Producto agregado al carrito:", cartItem);
  }

  getPrincipalImage(imagenes?: { imageUrl: string; esPrincipal: boolean }[]): string {
    if (!imagenes || imagenes.length === 0) {
      return 'assets/no-image.png'; // Imagen por defecto
    }
    const principal = imagenes.find(img => img.esPrincipal);
    return principal?.imageUrl || imagenes[0]?.imageUrl || 'assets/no-image.png';
  }


}
