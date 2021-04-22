import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Employee } from '../common/models/employee.model';
import { NgForm } from '@angular/forms';
import { EmployeeService } from '../common/services/employee.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {

  /** template Reference to modal */
  @ViewChild('content') addModal;

  
  
  employee: Employee = new Employee();

  closeResult = '';
  constructor(private modalService: NgbModal, 
              private employeeService: EmployeeService, 
              private toastr: ToastrService,
              ) { }

  ngOnInit(): void {
  }

  genId() {
    return Math.random().toString(36).slice(2);
  }

  /** add employee  */
  onSubmit(value) {
    value.id = this.genId();
    if (value) {
      this.employeeService.addEmployee(value).subscribe( result => {
        console.log(result, 'employee added')
      }); 
      this.toastr.success("Employee Added!");
      setTimeout( () => this.employeeService.announceChange('add'), 300);
      
    } 
  } 
  /** open modal  */
  open(content) {
    this.employee = new Employee();
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

  onDateChanged(event) {
    console.log(event)
  }


  openModal() {
    this.open(this.addModal);
  }

}
