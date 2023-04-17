import { Component, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import {
  Observable,
  filter,
  of,
  pluck,
  shareReplay,
  switchMap,
  take,
} from 'rxjs';
import { PostServiceService } from '../services/post-service.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Post } from '../models/Posts';
import { CheckDeactivate } from '../models/CheckDeactivate';

@Component({
  selector: 'app-post-update',
  templateUrl: './post-update.component.html',
  styleUrls: ['./post-update.component.scss'],
})
export class PostUpdateComponent implements OnInit, CheckDeactivate {
  initialFormValue: unknown;
  form$: Observable<FormGroup> | undefined;
  constructor(
    private readonly route: ActivatedRoute,
    private readonly postService: PostServiceService,
    private readonly fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form$ = this.route.params.pipe(
      pluck('slug'),
      switchMap((slug) => this.postService.getPostBySlug(slug)),
      filter((post) => !!post),
      switchMap((post) => of(this.initForm(post))),
      shareReplay(1)
    );
  }

  checkDeactivate(): Observable<boolean> {
    let currentFormValue = {};
    this.form$?.pipe(take(1)).subscribe((form) => {
      currentFormValue = form.getRawValue();
    });
    const isEdited =
      JSON.stringify(this.initialFormValue) !==
      JSON.stringify(currentFormValue);
    return of(!isEdited || confirm('Do you want to cancel changes?'));
  }

  initForm(post: Post | undefined): FormGroup {
    const form = this.fb.group({
      name: [post?.name],
      title: [post?.title],
      body: [post?.body],
      slug: [post?.slug],
    });
    this.initialFormValue = form.getRawValue();
    return form;
  }
}
