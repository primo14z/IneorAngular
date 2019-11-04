import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { BookService } from 'src/app/Services/BookService';
import { AppComponent } from 'src/app/app.component';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.scss']
})
export class EditBookComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private bookService: BookService,  public dialogRef: MatDialogRef<EditBookComponent>) { }

  bookForm: FormGroup;

  ngOnInit() {
    let bookId = window.localStorage.getItem('bookId');
    this.bookForm = this.formBuilder.group({
        id: [''],
        name: ['', Validators.required],
        datePublished: [new Date()],
        price: ['', Validators.required],
        author: ['', Validators.required]
    });

    this.bookService.GetBookById(Number(bookId))
      .subscribe( data => {
        this.bookForm.setValue(data);
      });
  }

  onSubmit() {
    this.bookService.EditBook(this.bookForm.value)
      .subscribe(data => {
        this.dialogRef.close();
      });
  }

  public hasError = (controlName: string, errorName: string) =>{
    return this.bookForm.controls[controlName].hasError(errorName);
  }
}