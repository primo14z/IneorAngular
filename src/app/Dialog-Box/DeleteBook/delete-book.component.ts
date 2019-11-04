import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BookService } from 'src/app/Services/BookService';

@Component({
  selector: 'app-delete-book',
  templateUrl: 'delete-book.component.html',
  styleUrls: ['delete-book.component.scss']
})
export class DeleteBookComponent implements OnInit{

    bookId: string;

    ngOnInit(): void {
        this.bookId = window.localStorage.getItem('bookId');
    }

  constructor(
    public dialogRef: MatDialogRef<DeleteBookComponent>,
    @Inject(MAT_DIALOG_DATA) public name: string,
    public bookService: BookService) { }

    onNoClick(): void {
    this.dialogRef.close();
  }

  deleteBook() {
    this.bookService.DeleteBook(Number(this.bookId)).subscribe(data => {
        this.dialogRef.close();
      });
  }
}
