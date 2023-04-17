import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { PostCart, PostItemCart } from 'src/app/models/Posts';
import { PostServiceService } from 'src/app/services/post-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  private _cart: PostCart = { items: [] };
  itemsQuantity = 0;
  total = 0;
  constructor(private postService: PostServiceService) {}

  @Input()
  get cart(): PostCart {
    return this._cart;
  }

  set cart(cart: PostCart) {
    this._cart = cart;
    this.itemsQuantity = this.cart.items
      .map((item) => item.quantity)
      .reduce((acc, val) => acc + val, 0);
  }

  totalPrice(items: PostItemCart[]): Observable<number> {
    return this.postService.totalPrice(items);
  }

  onClearCart(): void {
    this.postService.clearCart();
  }

  clearProduct(slug: string): void {
    this.postService.clearProduct(slug);
  }

  onPlusQuantity(cart: PostItemCart): void {
    this.postService.addToCart(cart);
  }

  onMinusQuantity(cart: PostItemCart): void {
    this.postService.minusQuantity(cart);
  }
  ngOnInit(): void {}
}
