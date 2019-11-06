import { Component, OnInit, Inject } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { BookService } from 'src/app/Services/BookService';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Book } from 'src/app/Modules/Book';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.scss']
})
export class EditBookComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private bookService: BookService,
              public dialogRef: MatDialogRef<EditBookComponent>,
              @Inject(MAT_DIALOG_DATA) public book: Book, private snackBar: MatSnackBar) { }

  bookForm: FormGroup;

  ngOnInit() {
    this.bookForm = this.formBuilder.group({
        id: [''],
        name: ['', Validators.required],
        datePublished: [new Date()],
        price: ['', Validators.required],
        author: ['', Validators.required]
    });

    this.bookForm.setValue(this.book);
  }

  onSubmit() {
    this.bookService.EditBook(this.bookForm.value)
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
