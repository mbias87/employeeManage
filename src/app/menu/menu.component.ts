
import { Component, OnInit, ViewChild } from '@angular/core';
import { AddEmployeeComponent } from './../add-employee/add-employee.component';
import { Employee } from '../common/models/employee.model';
import { EmployeeService } from '../common/services/employee.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {


  @ViewChild('addEmployeeRef') addEmployee;
  constructor( private employeeService: EmployeeService) { }

  ngOnInit(): void {
  }


  openAddEmployee() {
    this.addEmployee.openModal();
  }

}
