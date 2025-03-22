import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Cart } from '../interfaces/cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: Cart[] = [];
  private cartSubject = new BehaviorSubject<Cart[]>([]);
  cart$ = this.cartSubject.asObservable();
  private cartItemCount = new BehaviorSubject<number>(0);
  cartItemCount$ = this.cartItemCount.asObservable();

  constructor() {
    this.loadCart();
  }

  getCart(): Cart[] {
    return this.cart;
  }

  addToCart(item: Cart): void {
    const existingItem = this.cart.find(cartItem => cartItem.id === item.id);

    if (existingItem) {
      existingItem.quantity += 1;
      existingItem.total = existingItem.product.price * existingItem.quantity;
    } else {
      this.cart.push({
        id: item.id,
        product: item.product, // ✅ Asegura que `product` esté definido
        quantity: 1,
        total: item.product.price
      });
    }

    this.updateCart();
  }



  removeItem(itemId: number): void {
    this.cart = this.cart.filter(item => item.id !== itemId);
    this.updateCart();
  }

  clearCart(): void {
    this.cart = [];
    this.updateCart();
  }

   updateCart(): void {
    this.cartItemCount.next(this.cart.length);
    this.cartSubject.next(this.cart);
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

   loadCart(): void {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      this.cart = JSON.parse(storedCart);
      this.cartItemCount.next(this.cart.length);
      this.cartSubject.next(this.cart);
    }
  }
}
