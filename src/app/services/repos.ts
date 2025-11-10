import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Repos {

public userRepos = signal<any[]>([])

constructor(private http: HttpClient){}
fetchRepos(userName: string): Observable<any[]>{
   return this.http.get<any[]>(`https://api.github.com/users/${userName}/repos`) 
  }
}
