import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { Cart } from '../interfaces/cart';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, NgIf } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    MatFormFieldModule, MatInputModule, MatIconModule, MatCardModule,
    ReactiveFormsModule, NgIf, MatTableModule, FormsModule, CommonModule,
    MatDividerModule
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  cartItems: Cart[] = [];
  totalAmount: number = 0;

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit(): void {
    this.cartService.cart$.subscribe(cart => {
      this.cartItems = cart;
      this.calculateTotal();
    });
  }

  removeItem(itemId: number): void {
    this.cartService.removeItem(itemId);
  }

  clearCart(): void {
    this.cartService.clearCart();
  }

   calculateTotal(): void {
    this.totalAmount = this.cartItems.reduce((sum, item) => sum + item.total, 0);
  }

  increaseQuantity(item: Cart) {
    item.quantity++;
    item.total = item.quantity * item.product.price;
    this.cartService.updateCart();
  }

  decreaseQuantity(item: Cart) {
    if (item.quantity > 1) {
      item.quantity--;
      item.total = item.quantity * item.product.price;
      this.cartService.updateCart();
    }
  }

  BackHome(): void {
    this.router.navigate(['/']);
  }
  loadCart(): void {
    this.cartItems = this.cartService.getCart();
    console.log('Carrito cargado:', this.cartItems); // 🔍 Verifica los datos en consola
    this.calculateTotal();
  }

}
