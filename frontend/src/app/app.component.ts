import { Component } from '@angular/core';
import { SharedService } from './services/shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  username: string;

  constructor(private sharedService: SharedService) { 
    this.username = 'test';
  }

  ngOnInit() {
    this.sharedService.getUsername().subscribe(username => this.username = username);
  }
}
