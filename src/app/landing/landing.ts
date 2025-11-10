import { Component } from '@angular/core';
import { Form } from './form/form';
import { Repos } from '../services/repos';

@Component({
  selector: 'app-landing',
  imports: [Form],
  templateUrl: './landing.html',
  styleUrl: './landing.css',
})
export class Landing {

  constructor(public repositories: Repos){}
  initRepos(inputtedUsername: string): void{
    this.repositories.fetchRepos(inputtedUsername)
    .subscribe({
      next: (res) => this.repositories.userRepos.set(res),
      error: (err) => console.log(err)
    });
  }
}
