

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { ViewEmployeeComponent } from './view-employee/view-employee.component';

const routes: Routes = [
    { path: '', redirectTo: 'view-employee', pathMatch: 'full'},
    { path: '**', redirectTo: 'view-employee' },
    { path: 'view-employee', component: ViewEmployeeComponent },
    { path: 'add-employee', component: AddEmployeeComponent}
]


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}