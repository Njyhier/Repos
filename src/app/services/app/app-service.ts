import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPost } from '../../models/post.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  // using a constructor
  // using inject from angular/core

  private readonly httpClient: HttpClient = inject(HttpClient);

  constructor(){}


  /**
   * List user posts. 
   * @author Crispus Njenga
   * @returns Observable<IPost[]>
   * @alias listPosts
   * @memberof AppService
   * @example
   * ```typescript
   * this.appService.listPosts().subscribe({
   *  next: (res) => {
   *    console.log(res);
   *  },
   *  error: (err) => console.log(err),
   * });
   * ```  
   */
  listPosts(): Observable<IPost[]> {
    return this.httpClient.get<IPost[]>("https://jsonplaceholder.typicode.com/posts")
  }

  /**
   * List users
   * @returns Observable<any>
   */
  listUsers(): Observable<any> {
    return this.httpClient.get<any>("https://jsonplaceholder.typicode.com/use")
  }

  /**
   * List comments
   * @returns Observable<any>
   */
  listComments(): Observable<any> {
    return this.httpClient.get<any>("https://jsonplaceholder.typicode.com/comments")
  }

  /**
   * A test method by Crispus Njenga
   * @param param0 
   * @returns string
   */
  testCrispus({name, age}: {name: string, age: number}){
    return `Hello ${name}, you are ${age} years old.`;
  }
}
