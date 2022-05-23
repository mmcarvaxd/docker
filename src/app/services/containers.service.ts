import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Container } from '../classes/container';
import { CreateContainer } from '../classes/createContainer';

@Injectable({
  providedIn: 'root'
})
export class ContainersService {
  apiUrl: string = environment.dockerApi
  constructor(private http: HttpClient) { }

  getAllContainers(): Observable<Container[]> {
    let url = this.apiUrl + '/containers/json?all=true' //get
    return this.http.get<Container[]>(url)
  }

  getContainer(Id: string) {
    let url = this.apiUrl + `/containers/${Id}/json` //get
  }

  startContainer(Id: string): Observable<any> {
    let url = this.apiUrl + `/containers/${Id}/start` //post
    return this.http.post<any>(url, {})
  }

  stopContainer(Id: string) {
    let url = this.apiUrl + `/containers/${Id}/stop` //post
    return this.http.post<any>(url, {})
  }

  deleteContainer(Id: string) {
    let url = this.apiUrl + `/containers/${Id}` //delete
    return this.http.delete<any>(url, {})
  }

  createContainer(createContainer: CreateContainer, name?: string) {
    let url = this.apiUrl + `/containers/create?name=${name}` //post
    return this.http.post<any>(url, createContainer)
  }
}
