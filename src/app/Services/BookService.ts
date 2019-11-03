import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Book } from '../Modules/Book';

@Injectable({
    providedIn: 'root'
  })

  export class BookService {

    baseUrl = environment.baseUrl + 'Book/';
  
    constructor(private _HTTP: HttpClient) { }
  
    GetBook(): Observable<Book[]> {
      const headers = new HttpHeaders({ 'Access-Control-Allow-Origin': '*'});
      return this._HTTP.get<Book[]>(this.baseUrl + 'GetBooks', {headers}).pipe(
          catchError(this.handleError)
        );
      }

      handleError(error) {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
          // client-side error
          errorMessage = `Error: ${error.error.message}`;
        } else {
          // server-side error
          errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        window.alert(errorMessage);
        return throwError(errorMessage);
      }
  }
