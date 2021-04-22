import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Employee } from '../common/models/employee.model'; 
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { EmployeeService } from '../common/services/employee.service';
import { catchError, tap } from 'rxjs/operators';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit {

  employee: Employee = new Employee();

  ngOnInit(): void {
  }

    /** template Reference to modal */
    @ViewChild('content') editModal;
  
    closeResult = '';
    constructor(private modalService: NgbModal, 
                private employeeService: EmployeeService, 
                private toastr: ToastrService) { }
  

    /** open modal  */
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
    

    onSubmit(value) {
      if (value) {
        this.editEmployee();
      }
    }
  
    openModal(employee) { 
      this.employee = new Employee();
      Object.assign(this.employee, employee);
      this.open(this.editModal);
    }

    editEmployee() {
      this.employeeService.editEmployee(this.employee).subscribe( 
        res => {
          if (res) {
             this.employeeService.announceChange('edit');
             this.toastr.success('Employee edited successfully!');
          } 
        },
        error => {console.log(error), this.toastr.error(error)}
      );

    }
}
