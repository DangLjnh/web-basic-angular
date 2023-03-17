import { Post } from 'src/app/models/Posts';
import { Component, OnInit } from '@angular/core';
import { Subject, Observable, of, debounceTime, switchMap } from 'rxjs';
import { PostServiceService } from '../services/post-service.service';

@Component({
  selector: 'app-post-search',
  templateUrl: './post-search.component.html',
  styleUrls: ['./post-search.component.scss'],
})
export class PostSearchComponent implements OnInit {
  posts$!: Observable<Post[]>;
  private searchSubject = new Subject<string>();
  constructor(private postService: PostServiceService) {}

  searchInput(data: string): void {
    this.posts$ = this.postService.searchPost(data);
  }

  ngOnInit(): void {
    this.posts$ = this.searchSubject.pipe(
      debounceTime(500),
      switchMap((searchString) => this.postService.searchPost(searchString))
    );
  }
}
