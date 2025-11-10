import { Component, OnInit, signal, effect, OnDestroy } from '@angular/core';
import { Repos } from '../services/repos';
import { FormsModule } from '@angular/forms';
import { RouterLinkWithHref } from '@angular/router';

@Component({
  selector: 'app-repo-details',
  imports: [FormsModule,RouterLinkWithHref],
  templateUrl: './repo-details.html',
  styleUrl: './repo-details.css',
})
export class RepoDetails implements OnInit,OnDestroy{
  inputtedRepoName:string = '';
  toDisplay = signal<any>([])
  currentPage = 1;
  loading: boolean = false;
  showClearSearchBtn: boolean = false;

  constructor(public repoService:Repos){
    this.loading = true;
    effect(() => {
      const repos = this.repoService.userRepos();
      if (repos.length > 0) {
        this.divideIntoPages();
        this.loading = false;
      }
    });
  }
  ngOnInit(): void {
    this.divideIntoPages()
  }

  divideIntoPages(){
    const startIndex = (this.currentPage-1)*6;
    const endIndex = startIndex + 6;

    this.toDisplay.set(this.repoService.userRepos().slice(startIndex, endIndex));
  }

  nextPage(){
    if( this.repoService.userRepos().length/6 < this.currentPage){alert("You have reached the last page!")};
    if( this.repoService.userRepos().length/6 > this.currentPage){this.currentPage++};
    this.divideIntoPages();

  }

  previousPage(){
    if(this.currentPage === 1){
      alert("This is the first page")
    }
    if(this.currentPage>1){
      this.currentPage--;
    }
    this.divideIntoPages();
  }

  displaySearched(){
    this.loading = true
    const toSearch = this.inputtedRepoName.trim().toLowerCase();
    const filtered = this.repoService.userRepos().filter(repo => repo.name.toLowerCase().includes(toSearch));
    this.toDisplay.set(filtered)
    this.showClearSearchBtn = true
    this.loading = false;
  }

  clearSearch(){
    this.inputtedRepoName = '';
    this.currentPage = 1;
    this.showClearSearchBtn = false;
    this.divideIntoPages()
  }

  ngOnDestroy(): void {
    this.repoService.userRepos.set([])
  }

}
