import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { BookService } from './Services/BookService';
import { Book } from './Modules/Book';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatPaginator, MatSort } from '@angular/material';
import { AddBookComponent } from './Dialog-Box/AddBook/add-book.component';
import { EditBookComponent } from './Dialog-Box/EditBook/edit-book.component';
import { DeleteBookComponent } from './Dialog-Box/DeleteBook/delete-book.component';
import { FilterModel } from './Modules/FilterModel';
import { merge } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'IneorAngular';

  books: any;
  displayedColumns: string[] = ['Name', 'DatePublished', 'Author', 'Price', 'Action'];

  constructor(private _bookService: BookService, public dialog: MatDialog) {}

  @ViewChild(MatPaginator, { static: false })
  paginator: MatPaginator;
  @ViewChild(MatSort, { static: false })
  sort: MatSort;

  filter: FilterModel;
  length: number;
  isFilter: boolean;

  ngOnInit() {
    this.GetBooks();
    this.books.paginator = this.paginator;
    this.books.sort = this.sort;
  }

  ngAfterViewInit() {

    // this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    if (this.isFilter != false) {
      this.paginator.page
      .pipe(
          tap(() => this.FilterBooks())
      )
      .subscribe();
    }
   /* merge(this.sort.sortChange, this.paginator.page)
    .pipe(
        tap(() => this.GetBooks())
    )
    .subscribe();*/

}

FilterBooks() {
  this.filter = {pageIndex : this.paginator.pageIndex, pageSize : this.paginator.pageSize, key : ''};
  this._bookService.FilterBooks(this.filter).subscribe(books => {
      this.books = books;
  });
}

GetBooks() {
  this._bookService.GetBooks().subscribe(books => {
    this.SetSourceData(books);
    this.isFilter = false;
    });
}

SetSourceData(books: Book[]){
  this.length = books.length;
  const start = this.paginator.pageIndex * this.paginator.pageSize;
  const end = (this.paginator.pageIndex + 1) * this.paginator.pageSize;
  this.books = books.slice(start, end);
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

  public filterBooks = (value: string) => {
    if (value != '') {
      const data: FilterModel = {key: value, pageIndex : 0, pageSize : this.paginator.pageSize};
      this._bookService.GetBookByFilter(data).subscribe(books => {
        this.isFilter = true;
        this.SetSourceData(books);
        });
    }

    if(this.isFilter){
      this.GetBooks();
    }
  }
}
