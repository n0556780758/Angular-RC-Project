import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Item } from './item.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'assets/angular_Response.json';
  constructor(private http: HttpClient) { }

  getData(): Observable<any> {
    return this.http.get<any>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }
  updateItem(item: Item): Observable<any> {
    return this.http.post<any>(this.apiUrl, item);
  }
  // Method to handle errors
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error occurred';
    if (error.error instanceof ErrorEvent) 
      errorMessage = `Error: ${error.error.message}`;
    else 
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
