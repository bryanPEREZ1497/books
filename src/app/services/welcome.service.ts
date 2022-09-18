import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class WelcomeService {

  enabled = new BehaviorSubject<boolean>(false);

  listenLogin() {
    this.enabled.next(true);
  }

  listenLogout() {
    this.enabled.next(false);
  }
}
