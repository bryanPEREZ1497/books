import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { ChatService } from 'src/app/services/chat.service';
import { WelcomeService } from 'src/app/services/welcome.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent {
  constructor(
    public chatService: ChatService,
    public welcomeService: WelcomeService
  ) { }

  salir() {
    this.chatService.wsService.logoutWS();
  }
}
