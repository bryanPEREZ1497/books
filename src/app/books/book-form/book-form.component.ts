import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthorModel } from '../../models/author.model';
import { BookModel } from '../../models/book.model';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css']
})
export class BookFormComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  bookForm: FormGroup;
  authors: AuthorModel[] = [];

  constructor(private formBuilder: FormBuilder,
    private httpService: HttpService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {
    this.bookForm = this.newForm();
  }

  ngOnInit(): void {
    if (this.activatedRoute.snapshot.params['id'] != 'new') {
      this.loadBook();
    }
    this.loadAuthors();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  storeBook(book: BookModel): void {
    this.returnList();
    alert(book);

  }

  updateBook(book: BookModel): void {
    this.returnList();
    alert(book);
  }

  onSubmit() {
    if (this.bookForm.valid) {
      if (this.idField.value) {
        this.updateBook(this.bookForm.value);
      } else {
        this.storeBook(this.bookForm.value);
        console.log(this.bookForm.value);
      }
    } else {
      this.bookForm.markAllAsTouched();
    }
  }

  loadBook() {
    this.subscriptions.push(
      this.httpService
        .getBook(this.activatedRoute.snapshot.params['id'])
        .subscribe(
          response => {
            this.bookForm.patchValue(response.data);
            console.log(response.data);
          }
        ));
  }

  loadAuthors() {
    this.subscriptions.push(
      this.httpService.getAuthors()
        .subscribe(
          response => {
            this.authors = response.data;
            this.authors.map(author => {
              author.user?.name;
            });
          }
        ));
  }

  returnList() {
    this.router.navigate(['/job-board/professional', 1]);
  }

  newForm(): FormGroup {
    return this.formBuilder.group({
      id: [null,],
      title: [null, [Validators.required]],
      dateEdition: [null, [Validators.required]],
      numberEdition: [null, [Validators.required]],
      author: [null,],
    });
  }

  get idField() {
    return this.bookForm.controls['id'];
  }
  get titleField() {
    return this.bookForm.controls['title'];
  }
  get editionDateField() {
    return this.bookForm.controls['dateEdition'];
  }
  get editionNumberField() {
    return this.bookForm.controls['numberEdition'];
  }
  get authorField() {
    return this.bookForm.controls['author'];
  }
}
