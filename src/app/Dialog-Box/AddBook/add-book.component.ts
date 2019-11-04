import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { BookService } from 'src/app/Services/BookService';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss']
})
export class AddBookComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private bookService: BookService, public dialogRef: MatDialogRef<AddBookComponent>) { }

  bookForm: FormGroup;

  ngOnInit() {
    this.bookForm = this.formBuilder.group({
        name: ['', Validators.required],
        datePublished: [new Date()],
        price: ['', Validators.required],
        author: ['', Validators.required]
    });
  }

  onSubmit() {
    this.bookService.AddBook(this.bookForm.value)
      .subscribe(data => {
        this.dialogRef.close();
      });
  }

  public hasError = (controlName: string, errorName: string) =>{
    return this.bookForm.controls[controlName].hasError(errorName);
  }
}