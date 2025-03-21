import { Injectable } from '@angular/core';
import { Cart } from '../interfaces/cart';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: Cart[] = [];
  private cartItemCount = new BehaviorSubject<number>(0); // Emitirá un número
  cartItemCount$ = this.cartItemCount.asObservable(); // Observable de la cantidad

  constructor() {
    this.loadCart(); // Cargar carrito desde localStorage al iniciar
  }

  clearCart() {
    this.cart = [];
    this.updateCart();
  }

  private updateCart() {
    this.cartItemCount.next(this.cart.length); // Emitimos la cantidad, NO el arreglo
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  private loadCart() {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      this.cart = JSON.parse(storedCart);
      this.cartItemCount.next(this.cart.length); // Emitimos la cantidad de productos
    }
  }
}
