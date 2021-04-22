import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  employeeUrl = 'http://localhost:3000/employee';
  headers = { 'content-type': 'application/json'}; 
  
  private employeeChangeSource = new Subject<string>();

  employeeChangeAnnounce$ = this.employeeChangeSource.asObservable();

constructor(private http: HttpClient) { }

  

  getEmployees(): Observable<Array<Employee>> {
    return this.http.get<Array<Employee>>(this.employeeUrl);
  }

  addEmployee(employee: Employee): Observable<Employee> {
    // const headers = { 'content-type': 'application/json'}  
    const body = JSON.stringify(employee);
    return this.http.post<Employee>(this.employeeUrl, body,{'headers': this.headers})
  }

  editEmployee(employee: Employee) {
    let editUrl = this.employeeUrl + '/' + employee.id;
    const body = JSON.stringify(employee);
    return this.http.put(editUrl, body, {'headers': this.headers} );
  }

  deleteEmployee(employee: Employee) {
    let deleteUrl = this.employeeUrl + '/' + employee.id;
    return this.http.delete(deleteUrl, {'headers': this.headers});
  } 

  announceChange(type: string) {
    this.employeeChangeSource.next(type);
  }
}
