import { Injectable } from '@angular/core';
import { WebsocketService } from './websocket.service';

@Injectable({
  providedIn: 'root'
})
export class VoteService {

  constructor(private websocketService: WebsocketService) { }

  votes(answer: string) {

    return this.websocketService.emit('votes', { answer });
  }


  answers() {
    return this.websocketService.listen('answers');
  }

  nameQuestion(title?: string) {

    return new Promise<void>((resolve, reject) => {
      this.websocketService.emit('questions', { title }, (res: any) => {
        resolve();
      });
    });

  }
}
