import { Component, OnInit } from '@angular/core';
import { BookService } from './Services/BookService';
import { Book } from './Modules/Book';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material';
import { AddBookComponent } from './Dialog-Box/AddBook/add-book.component';
import { EditBookComponent } from './Dialog-Box/EditBook/edit-book.component';
import { DeleteBookComponent } from './Dialog-Box/DeleteBook/delete-book.component';
import { FilterModel } from './Modules/FilterModel';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'IneorAngular';

  books: any;
  displayedColumns: string[] = ['Name', 'DatePublished', 'Author', 'Price', 'Action'];

  constructor(private _bookService: BookService, public dialog: MatDialog) {}

  ngOnInit() {
    this.GetBooks();
  }

  GetBooks() {
    this._bookService.GetBooks().subscribe(books => {
      this.books = books;
      });
  }

  addBookDialog() {
    const dialogRef = this.dialog.open(AddBookComponent, {
      width: '350px'
    });
    dialogRef.afterClosed().subscribe(() => {
      this.GetBooks();
    });
  }

  editBookDialog(book: Book) {
    const dialogRef = this.dialog.open(EditBookComponent, {
      width: '350px',
      data: book
    });

    dialogRef.afterClosed().subscribe(() => {
      this.GetBooks();
    });
  }

  deleteBookDialog(book: Book) {
    const dialogRef = this.dialog.open(DeleteBookComponent, {
      width: '350px',
      data: book
    });

    dialogRef.afterClosed().subscribe(() => {
      this.GetBooks();
    });
  }

  public doFilter = (value: string) => {
    if (value != '') {
      const data: FilterModel = {key: value };
      this._bookService.GetBookByFilter(data).subscribe(books => {
        this.books = new MatTableDataSource<Book>(books);
        });
    }
  }
}
