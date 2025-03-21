import { Component } from '@angular/core';
import { CartService } from '../services/cart.service';
import { Cart } from '../interfaces/cart';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, NgIf } from '@angular/common';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule,
    MatIconModule, MatCardModule, ReactiveFormsModule,
    NgIf, MatTableModule, FormsModule, CommonModule
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  cartItems: Cart[] = [];
  totalAmount = 0;

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartService.getCart().subscribe(items => {
      this.cartItems = items;
      this.calculateTotal();
    });
  }

  calculateTotal() {
    this.totalAmount = this.cartItems.reduce((sum, item) => sum + item.total, 0);
  }

  removeItem(id: number) {
    this.cartService.removeFromCart(id);
  }

  clearCart() {
    this.cartService.clearCart();
  }
}
