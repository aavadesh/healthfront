import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Guid } from "guid-typescript";
const AUTH_API = 'https://localhost:44353/api/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class PostService {
  
  constructor(private httpClient: HttpClient) { }

  getAll(tableName:string): Observable<any> {
    return this.httpClient.get(`${AUTH_API}${tableName}`)
    .pipe(
      catchError(this.errorHandler)
    )
  }
  getAllByRoute(tableName:string, routeName:string): Observable<any> {
    return this.httpClient.get(`${AUTH_API}${tableName}/${routeName}`)
    .pipe(
      catchError(this.errorHandler)
    )
  }
     
  create(post:any, tableName:string): Observable<any> {
    debugger
    return this.httpClient.post(`${AUTH_API}${tableName}`, JSON.stringify(post), httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }  
     
  findById(id:Guid, tableName:string, routeName:string): Observable<any> {
    return this.httpClient.get(`${AUTH_API}${tableName}/${routeName}/${id}`)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  find(id:Guid, tableName:string): Observable<any> {
    return this.httpClient.get(`${AUTH_API}${tableName}/${id}`)
    .pipe(
      catchError(this.errorHandler)
    )
  }
     
  update(data: any, tableName:string): Observable<any> {
    return this.httpClient.put(`${AUTH_API}${tableName}`, JSON.stringify(data), httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }
     
  delete(id:Guid, tableName:string){
    return this.httpClient.delete(`${AUTH_API}${tableName}/${id}`, httpOptions)

    .pipe(
      catchError(this.errorHandler)
    )
  }
    // Search By Name
  filterByName(name: any, tableName:string): Observable<any> {
    return this.httpClient.get(`${AUTH_API}${tableName}?title_like=${name}`).pipe(
      catchError(this.errorHandler)
    );
  }
    
  errorHandler(error:any) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
 }
}
