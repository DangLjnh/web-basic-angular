import { PostServiceService } from './../services/post-service.service';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from '../models/Posts';
import { pluck, switchMap, Observable, filter, map } from 'rxjs';
import { Location } from '@angular/common';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-detail-post',
  templateUrl: './detail-post.component.html',
  styleUrls: ['./detail-post.component.scss'],
})
export class DetailPostComponent implements OnInit {
  post$!: Observable<any>;
  post!: Post;

  constructor(
    private readonly router: ActivatedRoute,
    private postService: PostServiceService,
    private location: Location
  ) {}

  onBack() {
    this.location.back();
  }

  async save() {
    this.postService.updatePost(this.post).subscribe(() => this.onBack());
  }

  ngOnInit(): void {
    // this.post$ = this.router.params.pipe(
    //   pluck('slug'),
    //   switchMap((slug) => this.postService.getPostBySlug(slug)),
    //   filter((post) => !!post)
    // );
    const slug = this.router.snapshot.paramMap.get('slug');
    this.postService.getPostBySlug(slug!).subscribe((val) => {
      this.post = val!;
    });
  }
}
