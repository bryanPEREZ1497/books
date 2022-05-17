import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { QuestionModel } from 'src/app/models/question-model';
import { ChatService } from 'src/app/services/chat.service';
import { VoteService } from 'src/app/services/vote.service';
import { WebsocketService } from 'src/app/services/websocket.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {

  question: QuestionModel = {};

  constructor(private voteService: VoteService,
    public chatService: ChatService,
    public wsService: WebsocketService,
    private http: HttpClient,

  ) { }

  ngOnInit(): void {
    this.votes();
    this.answers();
  }

  /**
   * Emit 
   */
  votes(answer: string = '') {
    this.voteService.votes(answer);

    if (answer !== '') {

      this.http.post(`${environment.WSHOTS}/grafica`, {
        opcion: answer === 'yes' ? 1 : 0,
        unidades: 1
      })
        .subscribe((res) => console.log(res));
    }
  }

  /**
   * Listen answers
   */
  answers() {
    this.voteService.answers()
      .subscribe((response) => {
        this.question = response as QuestionModel;
      });
  }

  nameQuestion(title: string) {
    this.voteService.nameQuestion(title);
  }

  salir() {
    this.chatService.wsService.logoutWS();
  }

}