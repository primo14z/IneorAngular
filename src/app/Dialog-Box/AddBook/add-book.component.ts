import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { BookService } from 'src/app/Services/BookService';
import { MatDialogRef } from '@angular/material';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss']
})
export class AddBookComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private bookService: BookService,
              public dialogRef: MatDialogRef<AddBookComponent>, private snackBar: MatSnackBar) { }

  bookForm: FormGroup;

  ngOnInit() {
    this.bookForm = this.formBuilder.group({
        name: ['', Validators.required, Validators.maxLength(60)],
        datePublished: [new Date(), Validators.required],
        price: ['', Validators.required],
        author: ['', Validators.required]
    });
  }

  onSubmit() {
    this.bookService.AddBook(this.bookForm.value)
      .subscribe(data => {
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

  public hasError = (controlName: string, errorName: string) => {
    return this.bookForm.controls[controlName].hasError(errorName);
  }
}
