import { PostGuard } from './guards/post.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostListComponent } from './components/post-list/post-list.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { DetailPostComponent } from './detail-post/detail-post.component';
import { HomeComponent } from './home/home.component';
import { PostUpdateComponent } from './post-update/post-update.component';
import { DataToExcelComponent } from './data-to-exel/data-to-exel.component';
import { ChartComponent } from './chart/chart.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  // { path: 'posts', component: PostListComponent },
  // when use lazy load module should use canLoad
  // because when go in route use guard canActivate still load module
  { path: 'posts', component: PostListComponent, canActivate: [PostGuard] },
  {
    path: 'detail',
    // thay vì đặt từng canActivateChild trong từng component bên dưới thì có thể sử dụng như thế này
    canActivateChild: [PostGuard],
    children: [
      {
        path: ':slug/edit',
        component: PostUpdateComponent,
        canDeactivate: [PostGuard],
      },
      { path: ':slug', component: DetailPostComponent }, //detail/:slug
    ],
  },
  // { path: 'detail/:slug', component: DetailPostComponent },
  { path: 'posts/create-post', component: CreatePostComponent },
  { path: 'data-to-excel', component: DataToExcelComponent },
  { path: 'chart', component: ChartComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
