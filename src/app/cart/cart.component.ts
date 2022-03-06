import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/service/user.service';
import { OrderService } from '../shared/service/order.service';
import { MessageService } from '../shared/service/message.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  user$ = this.userService.getUser();
  cart$ = this.orderService.getCart().pipe(
    tap(cart => {
      if (cart) {
        this.total = cart.products.reduce((t, p) => t + p.price, 0)
      }
    })
  );
  total?: number;

  constructor(
    private userService: UserService,
    private orderService: OrderService,
    private messageService: MessageService
  ) {
  }

  ngOnInit(): void {
  }

  removeFromCart(id: number) {
    this.orderService.removeFromCart(id).subscribe({
      next: () => this.messageService.snack('Product is removed from your cart!', 'OK'),
      error: err => this.messageService.snack(err, 'OK'),
    });
  }

}
