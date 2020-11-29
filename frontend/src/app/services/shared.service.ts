import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private username = new BehaviorSubject<string>('');

  constructor() { }

  getUsername() {
    return this.username.asObservable();
  }

  updateUsername(username: string) {
    this.username.next(username);
  }
}
