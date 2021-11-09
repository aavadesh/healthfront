import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Guid } from "guid-typescript";
import { environment } from '../../../../../../environments/environment';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  constructor(private httpClient: HttpClient) { }
  
  getAllByRoute(page: number, pageSize: number): Observable<any> {
    return this.httpClient.get(`${environment.AUTH_API}Category/GetCategoryAll?page=${page}&&pageSize=${pageSize}`)
    .pipe(
      catchError(this.errorHandler)
    )
  }
  getAll(tableName:string): Observable<any> {
    return this.httpClient.get(`${environment.AUTH_API}${tableName}`)
    .pipe(
      catchError(this.errorHandler)
    )
  }
  create(post:any): Observable<any> {
    debugger
    return this.httpClient.post(`${environment.AUTH_API}Category`, JSON.stringify(post), httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  } 

  find(id:Guid): Observable<any> {
    return this.httpClient.get(`${environment.AUTH_API}Category/${id}`)
    .pipe(
      catchError(this.errorHandler)
    )
  }
     
  update(data: any): Observable<any> {
    return this.httpClient.put(`${environment.AUTH_API}Category`, JSON.stringify(data), httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }
     
  delete(id:Guid){
    return this.httpClient.delete(`${environment.AUTH_API}Category/${id}`, httpOptions)

    .pipe(
      catchError(this.errorHandler)
    )
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
