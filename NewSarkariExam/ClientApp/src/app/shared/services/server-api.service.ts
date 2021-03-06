import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Inject } from '@angular/core';
import { Category, CategoryResponse } from '../../models/category.model';
import {  Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { CategoryDrowDown, Job } from '../../models/job.model';
import { User } from '../../models/user.model';
import { Result } from '../../models/result.model';


@Injectable({ providedIn: 'root' })
export class ServerApiService {
  apiEndPoint: string;
  constructor(private httpClient: HttpClient, @Inject('BASE_URL') baseURL: string, private toastr: ToastrService) {
    this.apiEndPoint = baseURL;
  }
  login(user: User): Observable<any> {
    return this.httpClient.post(`${this.apiEndPoint}api/Auth/Login`, user);
  }

// FrontEnd API call - start 
public getFrontEndJobs(count?: Number): Observable<any>{
 let endPoint = `${this.apiEndPoint}api/job/getjobs`;
 if(count!=undefined) endPoint= `${endPoint}?count=${count}`;
 return this.httpClient.get<any>(endPoint).pipe(
  catchError(this.handleError<any>('getFrontEndJobs', new Array<any>()))
);
}
public getJobDetailByCatNJob(cat: string, job?: string): Observable<any>{
  let endPoint = `${this.apiEndPoint}api/job/getJobDetailByCatNJob?category=${cat}&jobName=${job!=null?job:''}`;
  return this.httpClient.get<any>(endPoint).pipe(
   catchError(this.handleError<any>('getFrontEndJobs', new Array<any>()))
 );
 }
 
// FrontEnd API Call - End

  public addJob(job: Job): Observable<CategoryResponse> {
    return this.httpClient.post<CategoryResponse>(`${this.apiEndPoint}api/Job/AddJob`, job).pipe(
      catchError(this.handleError<CategoryResponse>('addJob', new CategoryResponse()))
    );
  }
  public getJobs(isFrontEnd?: boolean): Observable<Job[]> {

    let endPoint = `${this.apiEndPoint}api/job`;
    if (isFrontEnd) endPoint += '/getjobs';
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

  addResult(result: Result): Observable<CategoryResponse>{
    console.log(result);
    return this.httpClient.post<CategoryResponse>(`${this.apiEndPoint}api/results/addresult`, result).pipe(
      catchError(this.handleError<CategoryResponse>('addResult', new CategoryResponse()))
    );
  }
  public getResultById(id: number): Observable<Result>{
    
    return this.httpClient.get<Result>(`${this.apiEndPoint}api/results/GetResultById?id=${id}`).pipe(
      catchError(this.handleError<Result>('addResult', new Result()))
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
