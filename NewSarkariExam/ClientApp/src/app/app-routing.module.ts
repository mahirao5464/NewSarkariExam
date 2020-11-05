import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './Home/home.component';
import { AdmitcardsComponent } from './AdmitCards/admitcards.component';
import { ResultsComponent } from './results/results.component';
import { AnswerKeysComponent } from './answer-keys/answer-keys.component';
import { OtherJobsComponent } from './other-jobs/other-jobs.component';
import { AllNotificationsComponent } from './all-notifications/all-notifications.component';
import { AddJobsComponent } from './admin-dashboard/add-jobs/add-jobs.component';
import { AddJobcategoryComponent } from './admin-dashboard/add-jobcategory/add-jobcategory.component';
import { CategorylistComponent } from './admin-dashboard/add-jobcategory/categorylist/categorylist.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { JoblistComponent } from './admin-dashboard/add-jobs/joblist/joblist.component';
import { LoginComponent } from './user/login/login.component';
import { AuthGuardService as AuthGuard } from './AuthGuard/auth-guard.service'
import { MenuComponent } from './admin-dashboard/menu/menu.component';



const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'admitcards', component: AdmitcardsComponent },
  { path: 'results', component: ResultsComponent },
  { path: 'answer-keys', component: AnswerKeysComponent },
  { path: 'other-jobs', component: OtherJobsComponent },
  { path: 'all-notifications', component: AllNotificationsComponent },
  { path: 'user/login', component: LoginComponent },
  {
    path: 'dashboard', component: AdminDashboardComponent, canActivate: [AuthGuard],
    children:[
      { path: 'add-job', component: AddJobsComponent },
      { path: 'job-list', component: JoblistComponent },
      { path: 'menu', component: MenuComponent},
      { path: 'add-jobcategory', component: AddJobcategoryComponent },
      { path: 'category-list', component: CategorylistComponent }

    ] 
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
