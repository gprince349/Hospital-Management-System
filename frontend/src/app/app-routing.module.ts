import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { Page404Component } from './page404/page404.component';
import { PatientProfileComponent } from './patient-profile/patient-profile.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: "", component: HomeComponent},
  { path: "login", component: LoginComponent},
  { path: "register", component: RegisterComponent},
  { path: "dashboard", component: DashboardComponent, canActivate: [AuthGuard],
          children: [
            { path: "staffDashboard", component: HomeComponent},
            { path: "patDashboard", component: HomeComponent},
            { path: "patProfile", component: PatientProfileComponent},
            { path: "staffProfile", component: PatientProfileComponent},
            { path: "bookAppoint", component: Page404Component},
            { path: "bookTestAppoint", component: Page404Component},
            { path: "addMoney", component: Page404Component},
            { path: "withdrawMoney", component: Page404Component},
            { path: "patHistory", component: Page404Component},
            { path: "appoints", component: Page404Component},
            { path: "docHistory", component: Page404Component},
            { path: "staff", component: Page404Component},
            { path: "labs", component: Page404Component},
            { path: "**", component: Page404Component},
          ]
  },
  { path: "**", component: Page404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
