import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DocAppointsComponent } from './doc-appoints/doc-appoints.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { Page404Component } from './page404/page404.component';
import { PatDashboardComponent } from './pat-dashboard/pat-dashboard.component';
import { PatientProfileComponent } from './patient-profile/patient-profile.component';
import { RegisterComponent } from './register/register.component';
import { StaffDashboardComponent } from './staff-dashboard/staff-dashboard.component';
import { StaffProfileComponent } from './staff-profile/staff-profile.component';
import { AppointmentComponent } from './appointment/appointment.component';
import { TestAppointComponent } from './test-appoint/test-appoint.component';
import { WithdrawMoneyComponent } from './withdraw-money/withdraw-money.component';
import { AddMoneyComponent } from './add-money/add-money.component';

const routes: Routes = [
  { path: "", component: HomeComponent},
  { path: "login", component: LoginComponent},
  { path: "register", component: RegisterComponent},
  { path: "dashboard", component: DashboardComponent, canActivate: [AuthGuard],
          children: [
            { path: "staffDashboard", component: StaffDashboardComponent},
            { path: "patDashboard", component: PatDashboardComponent},
            { path: "patProfile", component: PatientProfileComponent},
            { path: "staffProfile", component: StaffProfileComponent},
            
            { path: "bookAppoint", component: AppointmentComponent},
            { path: "bookTestAppoint", component: TestAppointComponent},
            { path: "addMoney", component: AddMoneyComponent},
            { path: "withdrawMoney", component: WithdrawMoneyComponent},
            { path: "patHistory", component: Page404Component},
            { path: "appoints", component: DocAppointsComponent},
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
