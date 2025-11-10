import { Component, EventEmitter, Output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from "@angular/router";

@Component({
  selector: 'app-form',
  imports: [FormsModule, RouterLink],
  templateUrl: './form.html',
  styleUrl: './form.css',
})
export class Form {
 public userName = '';
 constructor(private router:Router){}

 @Output() sendUser = new EventEmitter<string>()

 submitUserName (){
  this.sendUser.emit(this.userName)
  this.userName = '';
  this.router.navigate(['/repo-details']);

 }
}
