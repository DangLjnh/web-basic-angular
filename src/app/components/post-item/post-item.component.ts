import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Post, PostItemCart } from 'src/app/models/Posts';

@Component({
  selector: 'app-post-item',
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.scss'],
})
export class PostItemComponent implements OnInit {
  @Input() post!: Post;
  @Output() delete = new EventEmitter<number>();
  @Output() edit = new EventEmitter<Post>();
  @Output() addToCart = new EventEmitter<Post>();

  constructor(private readonly route: Router) {}

  ngOnInit(): void {}
}
