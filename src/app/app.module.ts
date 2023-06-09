import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PostItemComponent } from './components/post-item/post-item.component';
import { PostListComponent } from './components/post-list/post-list.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { DetailPostComponent } from './detail-post/detail-post.component';
import { HttpClientModule } from '@angular/common/http';
import { CreatePostComponent } from './create-post/create-post.component';
import { PostSearchComponent } from './post-search/post-search.component';
import { HeaderComponent } from './components/header/header.component';
import { PostUpdateComponent } from './post-update/post-update.component';
import { DataToExcelComponent } from './data-to-exel/data-to-exel.component';
import { ChartComponent } from './chart/chart.component';
@NgModule({
  declarations: [
    AppComponent,
    PostListComponent,
    PostItemComponent,
    DashboardComponent,
    HomeComponent,
    DetailPostComponent,
    CreatePostComponent,
    PostSearchComponent,
    HeaderComponent,
    PostUpdateComponent,
    DataToExcelComponent,
    ChartComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
