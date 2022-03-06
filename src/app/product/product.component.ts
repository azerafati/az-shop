import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../core/model/product';
import { OrderService } from '../shared/service/order.service';
import { MessageService } from '../shared/service/message.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  @Input()
  product!: Product;

  constructor(
    private orderService: OrderService,
    private messageService: MessageService
  ) {
  }

  ngOnInit(): void {
  }

  addToCart(product: Product): void {
    this.orderService.addToCart(product).subscribe({
      next: () => this.messageService.snack('Product is added to your cart successfully!', 'OK'),
      error: err => this.messageService.snack(err, 'OK'),
    });
  }


}
