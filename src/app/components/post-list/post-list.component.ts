import { Observable, map, debounceTime, switchMap } from 'rxjs';
import { PostServiceService } from './../../services/post-service.service';
import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/Posts';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
})
export class PostListComponent implements OnInit {
  posts$!: Observable<Post[]>;

  constructor(
    private readonly postService: PostServiceService,
    private readonly router: Router
  ) {}

  onDelete(id: number) {
    this.posts$ = this.posts$.pipe(
      map((results) => results.filter((r) => r.id !== id))
    );
    this.postService
      .deletePost(id)
      .subscribe(() => (this.posts$ = this.postService.posts$));
  }

  searchInput(data: string): void {
    this.posts$ = this.postService.searchPost(data).pipe(debounceTime(500));
  }

  onAddToCart(post: Post) {
    this.postService.addToCart({
      name: post.name,
      slug: post.slug,
      quantity: 1,
      price: 200,
    });
  }

  onEdit(post: Post) {
    this.router.navigate(['/detail', post.slug, 'edit']);
  }

  ngOnInit(): void {
    this.posts$ = this.postService.posts$;
    // this.posts$ = this.searchSubject.pipe(
    //   debounceTime(500),
    //   switchMap((searchString) => this.postService.searchPost(searchString))
    // );
  }
}
