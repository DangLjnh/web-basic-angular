import { Injectable } from '@angular/core';
import { Observable, of, map, tap, Subscription } from 'rxjs';
import { posts } from '../fakdeData';
import { Post } from '../models/Posts';
import { HttpClient, HttpHeaders } from '@angular/common/http';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
@Injectable({
  providedIn: 'root',
})
export class PostServiceService {
  private postURL = 'http://localhost:3000/posts';
  get posts$(): Observable<Post[]> {
    // return of<Post[]>(posts);
    return this.http.get<Post[]>(this.postURL);
    // .pipe(tap((receiver) => console.log(receiver)));
  }

  updatePost(post: Post): Observable<any> {
    return this.http.put(`${this.postURL}/${post.id}`, post, httpOptions);
  }

  getPostBySlug(slug: string) {
    return this.posts$.pipe(
      map((post) => post.find((pos) => pos.slug === slug))
    );
  }

  addPost(data: Post): Observable<any> {
    return this.http.post<Post>(this.postURL, data, httpOptions);
  }

  deletePost(id: number): Observable<any> {
    return this.http.delete<Post>(`${this.postURL}/${id}`);
  }

  searchPost(data: string): Observable<any> {
    if (!data.trim()) {
      return this.posts$;
    }
    return this.http.get<Post[]>(`${this.postURL}?title_like=${data}`);
  }

  constructor(private http: HttpClient) {}
}
