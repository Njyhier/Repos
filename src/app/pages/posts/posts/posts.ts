import { Component, inject } from '@angular/core';
import { AppService } from '../../../services/app/app-service';
import { JsonPipe } from '@angular/common';
import { IPost } from '../../../models/post.interface';
import { concatMap, map, Observable, switchMap } from 'rxjs';

@Component({
  selector: 'app-posts',
  imports: [JsonPipe],
  templateUrl: './posts.html',
  styleUrl: './posts.css',
})
export class Posts {
  appService: AppService = inject(AppService);

  posts: IPost[] = [];

  constructor() {
    // this.listPosts();
    // this.fetchDataUsingConcatMap();
    this.fetchDataUsingSwithcMap();
  }

  fetchDataUsingConcatMap(): void {
    this.appService
      .listPosts()
      ?.pipe(
        map((posts) => {
          console.log(posts, 'Fetched Posts before mapping IDs');
          this.posts = posts;
          return posts.map((post) => post.id);
        })
      )
      ?.pipe(
        concatMap((posts) => {
          console.log(posts, 'Mapped Post IDs');
          return this.listUsers();
        })
      )
      ?.pipe(concatMap((users) => this.listComments()))
      // ?.pipe(map((comments) => console.log(comments)))
      ?.subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (err) => console.log(err),
      });
  }
  fetchDataUsingSwithcMap(): void {
    this.appService
      .listPosts()
      // ?.pipe(
      //   map((posts) => {
      //     console.log(posts, 'Fetched Posts before mapping IDs');
      //     this.posts = posts;
      //     return posts.map((post) => post.id);
      //   })
      // )
      ?.pipe(
        switchMap((posts) => {
          console.log(posts, 'Mapped Post IDs');
          return this.listUsers();
        })
      )
      ?.pipe(switchMap((users) => this.listComments()))
      // ?.pipe(map((comments) => console.log(comments)))
      ?.subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (err) => console.log(err),
      });
  }

  listUsers(): Observable<any> {
    return this.appService.listUsers();
  }

  listComments(): Observable<any> {
    return this.appService.listComments();
  }
  listPosts(): Observable<IPost[]> {
    return this.appService.listPosts();
  }
  // listPosts(): void {
  //   this.appService.listPosts().subscribe({
  //     next: (res) => {
  //       this.posts = res;
  //       console.log(this.posts);
  //     },
  //     error: (err) => console.log(err),
  //   });
  // }

  // listUsers(): void {
  //   this.appService.listUsers().subscribe({
  //     next: (res) => {
  //       console.log(res);
  //     },
  //     error: (err) => console.log(err),
  //   });
  // }

  // listComments(): void {
  //   this.appService.listComments().subscribe({
  //     next: (res) => {
  //       console.log(res);
  //     },
  //     error: (err) => console.log(err),
  //   });
  // }
}
