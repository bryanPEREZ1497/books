import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { QuestionModel } from 'src/app/models/question-model';
import { VoteService } from 'src/app/services/vote.service';

@Component({
  selector: 'app-votes',
  templateUrl: './votes.component.html',
  styleUrls: ['./votes.component.css']
})
export class VotesComponent {
  title = '';

  constructor(private voteService: VoteService,
    private router: Router) {

  }

  createQuestion() {
    // if (this.title === '') {
    //   return;
    // }
    console.log('title',this.title);
    this.voteService.nameQuestion(this.title==='' ? undefined : this.title)
      .then(() => {
        this.router.navigateByUrl('questions');
      })
      .catch(e => console.log(e))
  }

}
