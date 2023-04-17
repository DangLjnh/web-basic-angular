import { Component, OnInit } from '@angular/core';
import { PostCart } from 'src/app/models/Posts';
import { PostServiceService } from 'src/app/services/post-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  cart: PostCart = { items: [] };
  constructor(private postService: PostServiceService) {}

  headerList = [
    {
      id: 1,
      name: 'Home',
      url: '/home',
    },
    {
      id: 2,
      name: 'Posts',
      url: 'posts',
    },
    {
      id: 3,
      name: 'Data excel',
      url: 'data-to-excel',
    },
    {
      id: 4,
      name: 'Chart',
      url: 'chart',
    },
  ];
  ngOnInit(): void {
    this.postService.carts$.subscribe((next) => {
      this.cart = next;
    });
  }
}
