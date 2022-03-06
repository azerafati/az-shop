import { Injectable } from '@angular/core';
import { Product } from '../../core/model/product';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { UserService } from './user.service';
import { BehaviorSubject, debounceTime, MonoTypeOperatorFunction, Observable, switchMap, tap, throwError } from 'rxjs';
import { Cart } from '../../core/model/cart';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  baseApiUrl = environment.baseApiUrl;

  private cart$ = new BehaviorSubject<Cart | null>(null);

  constructor(
    private httpClient: HttpClient,
    private userService: UserService
  ) {
    this.userService.getUser().pipe(
      debounceTime(400),
      tap(() => this.cart$.next(null)),
      switchMap(user =>
        this.httpClient.get<Cart>(this.baseApiUrl + '/carts/' + user.id)
      ),
      this.setCart()
    ).subscribe();
  }

  addToCart(product: Product): Observable<Cart> {
    const userId = this.userService.getCurrentUserId();
    if (!userId) return throwError(() => new Error('add to Cart should not be called when user is not logged in'));
    const cart = this.cart$.getValue() ?? {id: userId, products: []};
    if (!cart?.products?.length) {
      cart.products = [];
    }
    if (cart.products.find(p => p.id === product.id)) {
      return throwError(() => new Error('Product is already in cart'));
    }
    cart.products.push(product);
    // the current cart$ now holds expired data which we need to sync with server
    this.cart$.next(null);
    return this.saveCart(userId, cart.products);
  }

  getCart(): Observable<Cart | null> {
    return this.cart$.asObservable();
  }

  saveCart(userId: number, products: Product[]): Observable<Cart> {
    return this.httpClient.patch<Cart>(this.baseApiUrl + '/carts/' + userId, {products: products}).pipe(this.setCart());
  }

  private setCart(): MonoTypeOperatorFunction<Cart> {
    return tap(cart => this.cart$.next(cart));
  }

  removeFromCart(productId: number) {
    const userId = this.userService.getCurrentUserId();
    if (!userId) return throwError(() => new Error('remove from Cart should not be called when user is not logged in'));

    const cart = <Cart>this.cart$.getValue();
    const product = cart.products.find(p => p.id === productId);
    if (!product) {
      return throwError(() => new Error('This product is not in the Cart'));
    }
    cart.products.splice(cart.products.indexOf(product), 1);
    // the current cart$ now holds expired data which we need to sync with server
    this.cart$.next(null);
    return this.saveCart(userId, cart.products);
  }
}
