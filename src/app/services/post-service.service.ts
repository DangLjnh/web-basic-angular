import { Injectable } from '@angular/core';
import {
  Observable,
  of,
  map,
  tap,
  Subscription,
  BehaviorSubject,
  from,
  filter,
  reduce,
  find,
} from 'rxjs';
import { Post, PostCart, PostItemCart } from '../models/Posts';
import { HttpClient, HttpHeaders } from '@angular/common/http';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
@Injectable({
  providedIn: 'root',
})
export class PostServiceService {
  carts$ = new BehaviorSubject<PostCart>({ items: [] });
  private postURL = `http://localhost:3000/posts`;

  totalPrice(posts: PostItemCart[]) {
    return from(posts).pipe(
      map((item) => item.price * item.quantity),
      reduce((acc, val) => acc + val, 0)
    );
  }

  addToCart(item: PostItemCart) {
    const posts = [...this.carts$.value.items];
    const itemInCart = posts.find((_item) => _item.slug === item.slug);
    if (itemInCart) {
      itemInCart.quantity += 1;
    } else {
      posts.push(item);
    }
    // carts$ is  carts$ = new BehaviorSubject<PostCart>({ items: [] });
    this.carts$.next({ items: posts });
  }

  get posts$(): Observable<Post[]> {
    // return of<Post[]>(posts);
    return this.http.get<Post[]>(this.postURL);
    // .pipe(tap((receiver) => console.log(receiver)));
  }

  updatePost(post: Post): Observable<any> {
    return this.http.put(`${this.postURL}/${post.id}`, post, httpOptions);
  }

  getPostBySlug(slug: string) {
    return this.posts$.pipe(
      map((post) => post.find((pos) => pos.slug === slug))
    );
  }

  addPost(data: Post): Observable<any> {
    return this.http.post<Post>(this.postURL, data, httpOptions);
  }

  deletePost(id: number): Observable<any> {
    return this.http.delete<Post>(`${this.postURL}/${id}`);
  }

  searchPost(data: string): Observable<any> {
    if (!data.trim()) {
      return this.posts$;
    }
    return this.http.get<Post[]>(`${this.postURL}?title_like=${data}`);
  }

  clearCart() {
    this.carts$.next({ items: [] });
  }

  clearProduct(slug: string): PostItemCart[] {
    const posts = [...this.carts$.value.items];
    this.carts$.next({
      items: posts.filter((post) => post.slug !== slug),
    });
    return posts.filter((post) => post.slug !== slug);
  }

  minusQuantity(item: PostItemCart): void {
    let itemForRemove!: PostItemCart;
    let filteredItems = this.carts$.value.items.map((_item) => {
      if (item.slug === _item.slug) {
        _item.quantity -= 1;
        if (_item.quantity === 0) {
          itemForRemove = _item;
        }
      }
      return _item;
    });
    if (itemForRemove) {
      filteredItems = this.clearProduct(itemForRemove.slug);
    }
    return this.carts$.next({
      items: filteredItems,
    });
  }

  constructor(private http: HttpClient) {}
}
