import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Employee } from '../common/models/employee.model';
import { EmployeeService } from '../common/services/employee.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-delete-employee',
  templateUrl: './delete-employee.component.html',
  styleUrls: ['./delete-employee.component.css']
})
export class DeleteEmployeeComponent implements OnInit {
 
  /** template Reference to modal */
  @ViewChild('content') deleteModal;


  employee: Employee = new Employee();
  closeResult = '';

  constructor(private modalService: NgbModal, 
              private employeeService: EmployeeService, 
              private toastr: ToastrService) { }

  ngOnInit(): void {
  }


  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }


  openModal(employee) { 
    this.employee = new Employee();
    Object.assign(this.employee, employee);
    this.open(this.deleteModal);
  }


  onDeleteEmployee() {
    
    this.employeeService.deleteEmployee(this.employee).subscribe(
      res => {
        if (res) {
          this.employeeService.announceChange('delete');
          this.toastr.success('Employee Deleted!');
        }
      },
      error => {  console.log(error), this.toastr.error(error)} 
    )
  }

}
