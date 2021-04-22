import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Employee } from '../../models/employee.model';
@Component({
  selector: 'app-employee-card',
  templateUrl: './employee-card.component.html',
  styleUrls: ['./employee-card.component.css']
})
export class EmployeeCardComponent implements OnInit {

  @Input() employee;

  @Output() editEmployee = new EventEmitter<Employee>();

  @Output() deleteEmployee = new EventEmitter<Employee>();
  constructor() { }

  ngOnInit(): void {
  }


  onEditEmployee() {
    this.editEmployee.emit(this.employee);
  }

  onDeleteEmployee() {
    this.deleteEmployee.emit(this.employee);
  }
}
