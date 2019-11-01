import { Component, OnInit } from '@angular/core';
import { BookService } from './Services/BookService';
import { Book } from './Modules/Book';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'IneorAngular';


  books: any;

  constructor(private _bookService: BookService,)
  {
  }

  ngOnInit()
  {
    this.GetBooks();
  }

  GetBooks()
  {
    this._bookService.GetBook().subscribe(devices => {
      this.books = devices;
    });
  }
}
