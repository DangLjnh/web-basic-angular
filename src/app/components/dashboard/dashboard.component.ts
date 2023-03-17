import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor() {}

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
  ];

  ngOnInit(): void {}
}
