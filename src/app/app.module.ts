import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatTableModule,
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatCardModule,
  MatPaginatorModule,
  MatSortModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSnackBarModule} from '@angular/material/snack-bar';
import { AddBookComponent } from './Dialog-Box/AddBook/add-book.component';
import { EditBookComponent } from './Dialog-Box/EditBook/edit-book.component';
import { DeleteBookComponent } from './Dialog-Box/DeleteBook/delete-book.component';

@NgModule({
  declarations: [
    AppComponent,
    AddBookComponent,
    EditBookComponent,
    DeleteBookComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatCardModule,
    MatSnackBarModule,
    FlexLayoutModule,
    MatPaginatorModule,
    MatSortModule
  ],
  entryComponents: [
    AddBookComponent,
    EditBookComponent,
    DeleteBookComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
