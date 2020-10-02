import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Inject } from '@angular/core';
import { Category, CategoryResponse } from 'src/app/models/category.model';
import {  Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { CategoryDrowDown, Job } from 'src/app/models/job.model';
import { User } from 'src/app/models/user.model';

@Injectable({ providedIn: 'root' })
export class ServerApiService {
  apiEndPoint: string;
  constructor(private httpClient: HttpClient, @Inject('BASE_URL') baseURL: string, private toastr: ToastrService) {
    this.apiEndPoint = baseURL;
  }
  login(user: User): Observable<any> {
    return this.httpClient.post(`${this.apiEndPoint}api/Auth/Login`, user);
  }
  public addJob(job: Job): Observable<CategoryResponse> {
    return this.httpClient.post<CategoryResponse>(`${this.apiEndPoint}api/Job/AddJob`, job).pipe(
      catchError(this.handleError<CategoryResponse>('addJob', new CategoryResponse()))
    );
  }
  public getJobs(): Observable<Job[]> {
    return this.httpClient.get<Job[]>(`${this.apiEndPoint}api/job`).pipe(
      catchError(this.handleError<Job[]>('getJobs', new Array<Job>()))
    );
  }
  public getDropDownList(): Observable<CategoryDrowDown[]> {
    return this.httpClient.get<CategoryDrowDown[]>(`${this.apiEndPoint}api/job/GetCategoryListForDropDown`).pipe(
      catchError(this.handleError<CategoryDrowDown[]>('getDropDownList', new Array<CategoryDrowDown>()))
    );
  }
  public addCategory(categoryData: Category): Observable<any> {
    return this.httpClient.post(`${this.apiEndPoint}api/Category/AddCategory`, categoryData).pipe(
      catchError(this.handleError<CategoryResponse>('addCategory', new CategoryResponse()))
    );
  }
  public getCategories(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(`${this.apiEndPoint}api/Category`).pipe(
      catchError(this.handleError<Category[]>('getCtegories', new Array<Category>()))
    );
  }
  public deleteCategory(category: Category): Observable<any> {
    return this.httpClient.post(`${this.apiEndPoint}api/Category/DeleteCategory`, category).pipe(
      catchError(this.handleError<CategoryResponse>('deleteCategory', new CategoryResponse()))
    );
  }
  public deleteJob(job: Job): Observable<any> {
    return this.httpClient.post(`${this.apiEndPoint}api/Job/DeleteJob`, job).pipe(
      catchError(this.handleError<CategoryResponse>('deleteJob', new CategoryResponse()))
    );
  }
  public updateCategory(categoryData: Category): Observable<any> {
    return this.httpClient.post(`${this.apiEndPoint}api/Category/UpdateCategory`, categoryData).pipe(
      catchError(this.handleError<CategoryResponse>('addCategory', new CategoryResponse()))
    );
  }
  updateJob(job: Job): Observable<CategoryResponse>{
    return this.httpClient.post<CategoryResponse>(`${this.apiEndPoint}api/job/UpdateJob`, job).pipe(
      catchError(this.handleError<CategoryResponse>('updateJob', new CategoryResponse()))
    );
  }
  // tslint:disable-next-line: typedef
  private handleError<T>(operation = 'operation', result?: T){
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      this.toastr.error('Technical Error', 'ERROR!');
      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
