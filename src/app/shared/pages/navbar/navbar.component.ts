import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import { Router, RouterModule } from '@angular/router';
import { CartService } from '../../../Cart/services/cart.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    RouterModule, MatIconModule,NgIf
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  constructor(private router: Router,
    private cartService: CartService
  ) {}
  cartItemCount = 4;
  ngOnInit() {
    // Suscribirse para obtener cambios en la cantidad del carrito
    this.cartService.cartItemCount$.subscribe(count => {
      this.cartItemCount = count;
    });
  }
  navigateToLogin() {
    this.router.navigate(['login']);
  }
}
