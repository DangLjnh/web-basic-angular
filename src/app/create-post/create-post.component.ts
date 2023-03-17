import { PostServiceService } from './../services/post-service.service';
import { Component, OnInit } from '@angular/core';
import { Post } from '../models/Posts';
import { Location } from '@angular/common';
@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss'],
})
export class CreatePostComponent implements OnInit {
  post: any;
  constructor(
    private postService: PostServiceService,
    private location: Location
  ) {}

  onBack() {
    this.location.back();
  }

  addPost(title: any, name: string, body: string, slug: string): void {
    const data = {
      name,
      body,
      slug,
      title,
    };
    this.postService.addPost(data).subscribe(() => this.onBack());
  }

  ngOnInit(): void {
    this.postService.addPost(this.post);
  }
}
