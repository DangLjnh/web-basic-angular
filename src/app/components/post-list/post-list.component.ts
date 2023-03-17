import {
  Observable,
  filter,
  from,
  map,
  of,
  debounceTime,
  switchMap,
  Subject,
} from 'rxjs';
import { PostServiceService } from './../../services/post-service.service';
import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/Posts';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
})
export class PostListComponent implements OnInit {
  posts$!: Observable<Post[]>;
  private searchSubject = new Subject<string>();

  constructor(private readonly postService: PostServiceService) {}

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

  ngOnInit(): void {
    this.posts$ = this.postService.posts$;
    // this.posts$ = this.searchSubject.pipe(
    //   debounceTime(500),
    //   switchMap((searchString) => this.postService.searchPost(searchString))
    // );
  }
}
