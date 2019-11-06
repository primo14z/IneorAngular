import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BookService } from 'src/app/Services/BookService';
import { Book } from 'src/app/Modules/Book';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';

@Component({
  selector: 'app-delete-book',
  templateUrl: 'delete-book.component.html',
  styleUrls: ['delete-book.component.scss']
})
export class DeleteBookComponent implements OnInit {

    bookId: string;

    ngOnInit(): void {
        this.bookId = window.localStorage.getItem('bookId');
    }

  constructor(
    public dialogRef: MatDialogRef<DeleteBookComponent>,
    @Inject(MAT_DIALOG_DATA) public book: Book,
    public bookService: BookService, private snackBar: MatSnackBar) { }

    onNoClick(): void {
    this.dialogRef.close();
  }

  deleteBook() {
    this.bookService.DeleteBook(Number(this.bookId)).subscribe(data => {
      if (data == true) {
        this.snackBar.open('Edit was succesful', 'OK', {
          duration: 2000,
        });
      } else {
        this.snackBar.open('Edit was un-succesful', 'OK', {
          duration: 2000,
        });
      }
      this.dialogRef.close();
      });
  }
}
