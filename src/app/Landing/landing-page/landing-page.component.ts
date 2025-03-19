import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../../shared/pages/navbar/navbar.component";
import { FooterComponent } from '../../shared/pages/footer/footer.component';
import {MatCardModule} from '@angular/material/card';
import { NgFor } from '@angular/common';
import { ProductService } from '../../Product/services/product.service';
import { StorageService } from '../../shared/services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [NavbarComponent, FooterComponent,
     MatCardModule, NgFor
    ],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent implements OnInit{
  products: any[] = [];
  constructor(private _productService: ProductService,
    private _storageService: StorageService,
    private router: Router
  ){}
  ngOnInit(): void {
    this.obtenerProducts();
  }
  obtenerProducts() {
    this._productService.lista().subscribe({
      next: (data) => {
        if (data.isExitoso) {
          this.products = data.resultado;
          console.log(data.resultado);
        } else
          this._storageService.mostrarAlerta(
            'No se  encontraron datos',
            'Advertencia!'
          );
      },
      error: (e) => {
        this._storageService.mostrarAlerta(e.error.mensaje, 'Error!');
      },
    });
  }
  getPrincipalImage(imagenes: any[]): string {
    // Busca la imagen principal o devuelve la primera
    const principal = imagenes.find(image => image.esPrincipal);
    return principal ? principal.imageUrl : imagenes[0]?.imageUrl || 'assets/no-image.png';
  }

  ProductDetalle(productId: number){
    console.log('ID del producto seleccionado:', productId);
    this.router.navigate([`product/detail/${productId}`]);

  }
}
