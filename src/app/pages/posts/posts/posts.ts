import { Component, inject } from '@angular/core';
import { AppService } from '../../../services/app/app-service';

@Component({
  selector: 'app-posts',
  imports: [],
  templateUrl: './posts.html',
  styleUrl: './posts.css',
})
export class Posts {
  appService: AppService = inject(AppService);

  constructor() {
    console.log(this.appService.testCrispus({ name: 'Crispus', age: 30 }));
  }
}
