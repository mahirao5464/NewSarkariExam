import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtModule } from "@auth0/angular-jwt";

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { FireService } from './services/fire.service';
import { ServiceWorkerModule } from '@angular/service-worker';
import { AdmitcardsComponent } from './AdmitCards/admitcards.component';
import { HomeComponent } from './Home/home.component';
import { ResultsComponent } from './results/results.component';
import { AnswerKeysComponent } from './answer-keys/answer-keys.component';
import { OtherJobsComponent } from './other-jobs/other-jobs.component';
import { AllNotificationsComponent } from './all-notifications/all-notifications.component';
import { DeviceDetectorModule } from 'ngx-device-detector';
import { EditorModule } from '@tinymce/tinymce-angular';
import { AddJobcategoryComponent } from './admin-dashboard/add-jobcategory/add-jobcategory.component';
import { AddJobsComponent } from './admin-dashboard/add-jobs/add-jobs.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { CategorylistComponent } from './admin-dashboard/add-jobcategory/categorylist/categorylist.component';
import { UrlSerializer } from '@angular/router';
import { CustomUrlSerializer } from './utility/custom-url-serializer';
import { SafeHTMLPipe } from './safe-html.pipe';
import { NoSanitizePipe } from './no-sanitize.pipe';
import { JoblistComponent } from './admin-dashboard/add-jobs/joblist/joblist.component';
import { LoginComponent } from './user/login/login.component';
import { AuthInterceptorService } from './admin-dashboard/auth-interceptor.service';
import { MenuComponent } from './admin-dashboard/menu/menu.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

export function tokenGetter() {
  return localStorage.getItem("jwt");
}
@NgModule({
  declarations: [
    AppComponent,
    AdmitcardsComponent,
    HomeComponent,
    ResultsComponent,
    AnswerKeysComponent,
    OtherJobsComponent,
    AllNotificationsComponent,
    AddJobcategoryComponent,
    AddJobsComponent,
    AdminDashboardComponent,
    CategorylistComponent,
    SafeHTMLPipe,
    NoSanitizePipe,
    JoblistComponent,
    LoginComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DeviceDetectorModule ,
    FormsModule,
    EditorModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(),
    NgxSpinnerModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ['localhost:5000'],
        disallowedRoutes: []
      }
    }),
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule
  ],
  providers: [ 
    FireService,
    { provide: UrlSerializer, useClass: CustomUrlSerializer },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
