
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Employee } from '../common/models/employee.model';
import { EmployeeService } from '../common/services/employee.service';

@Component({
  selector: 'app-view-employee',
  templateUrl: './view-employee.component.html',
  styleUrls: ['./view-employee.component.css']
})
export class ViewEmployeeComponent implements OnInit, AfterViewInit {

  @ViewChild('deleteEmployee') deleteEmployeeComponent;
  @ViewChild('editEmployee') editEmployeeComponent;
  employees: Array<Employee>= [];
  searchVal: Employee = new Employee();

  noEmployees = false;

  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
    
    this.employeeService.employeeChangeAnnounce$.subscribe( result => { 
      if (result) {
        this.getEmployees();
      }
    })
  }

  ngAfterViewInit() {
    this.getEmployees();
  }


  /** retreive all employees */
  getEmployees() {
    this.employeeService.getEmployees().subscribe( result => {
      if ( result.length > 0) {
        this.employees = Array.from(result);
      } else {
        this.noEmployees = true;
      }
    })
  }

  /** if user adds employee refresh employee data */
  onEmployeeAdded(event) {
    if (event){
      this.getEmployees();
    }
  }

  onEditEmployeeChange(event) {
    this.editEmployeeComponent.openModal(event);
  }

  onDeleteEmployeeChange(event) {
    this.deleteEmployeeComponent.openModal(event);
  }
}
