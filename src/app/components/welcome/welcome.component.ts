import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  constructor(
    public chatService: ChatService,

  ) { }

  ngOnInit(): void {
  }

  salir(){
    this.chatService.wsService.logoutWS();
  }

  

}
