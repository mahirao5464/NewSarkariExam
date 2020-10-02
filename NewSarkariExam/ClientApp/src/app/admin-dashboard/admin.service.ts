import { Injectable } from '@angular/core';
import { ServerApiService } from '../shared/services/server-api.service';
import { Category, CategoryResponse } from '../models/category.model';
import { Observable } from 'rxjs';
import { Job, CategoryDrowDown } from '../models/job.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})

export class AdminService {
  
  constructor(private apiService: ServerApiService) { }
  login(user: User): Observable<any>{
    return this.apiService.login(user);
  }
  logOut() {
    localStorage.removeItem("jwt");
 }
  public addJob(job: Job): Observable<CategoryResponse> {
    return this.apiService.addJob(job);
  }
  public getJobs(): Observable<Job[]> {
    return this.apiService.getJobs();
  }
  updateJob(job: Job): Observable<CategoryResponse>{
    return this.apiService.updateJob(job);
  }
  /**
   * addCategory
   */
  public addCategory(category: Category): Observable<CategoryResponse> {
    return this.apiService.addCategory(category);
  }
  public getCategories(): Observable<Category[]> {
    return this.apiService.getCategories();
  }
  public deleteCategory(category: Category): Observable<CategoryResponse> {
    return this.apiService.deleteCategory(category);
  }
  public deleteJob(job: Job): Observable<CategoryResponse> {
    return this.apiService.deleteJob(job);
  }
  public updateCategory(category: Category): Observable<CategoryResponse> {
    return this.apiService.updateCategory(category);
  }
  public getDropDownList(): Observable<CategoryDrowDown[]> {
    return this.apiService.getDropDownList();
  }
}
