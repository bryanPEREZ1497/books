import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormControl } from '@angular/forms';
import { MenuItem } from 'primeng/api';
import { BookModel } from '../../models/book.model';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.css']
})
export class BooksListComponent implements OnInit {
  private subscriptions: Subscription[] = [];
  cols: any[] = [];
  items: MenuItem[] = [];
  books: BookModel[] = [];
  selectedBook: BookModel = {};
  selectedBooks: BookModel[] = [];

  constructor(
    private router: Router,
    private httpService: HttpService,
  ) { }

  ngOnInit(): void {
    this.setCols();
    this.setItems();
    this.loadBooks();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  loadBooks() {
    this.subscriptions.push(
      this.httpService.getBooks().subscribe(
        response => {
          this.books = response.data;
        }
      ));
  }

  filterCourses(event: any) {
    if (event.key === 'Enter' || event.type === 'click') {
      this.loadBooks();
    }
  }

  editBook(book: BookModel) {
    this.router.navigate(['/book/', book.id]);
  }

  createBook() {
    this.router.navigate(['/book/', 'new']);
  }

  selectBook(book: BookModel) {
    this.selectedBook = book;
  }

  deleteBook(book: BookModel): void {
    this.subscriptions.push(
      this.httpService.deleteBook(book.id!).subscribe(
        response => {
          this.removeBook(book);
        }
      ));
  }

  deleteBooks(): void {
    const ids = this.selectedBooks.map(element => element.id);
    this.subscriptions.push(
      this.httpService.deleteBooks(ids)
        .subscribe(
          response => {
            this.removeBooks(ids!);
          }
        ));
  }

  removeBook(book: BookModel) {
    this.books = this.books.filter(element => element.id !== book.id);
  }

  removeBooks(ids: (number | undefined)[]) {
    for (const id of ids) {
      this.books = this.books.filter(element => element.id !== id);
    }
    this.selectedBooks = [];
  }

  setCols() {
    this.cols = [
      { field: 'title', header: 'Title' },
      { field: 'dateEdition', header: 'Date of edition' },
      { field: 'numberEdition', header: 'Number of edition' },
    ];
  }

  setItems() {
    this.items = [
      {
        label: 'Edit', icon: 'pi pi-pencil', command: () => {
          this.editBook(this.selectedBook);
        }
      },
      {
        label: 'Delete', icon: 'pi pi-trash', command: () => {
          this.deleteBook(this.selectedBook);
        }
      }
    ];
  }


}
