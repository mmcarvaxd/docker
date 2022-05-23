import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Image } from '../classes/image';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {
  apiUrl: string = environment.dockerApi
  constructor(private http: HttpClient) { }

  getAllImages() {
    let url = this.apiUrl + '/images/json' //get
    return this.http.get<Image[]>(url)
  }

  getImage(Id: string) {
    let url = this.apiUrl + `/images/${Id}/json` //get
  }

  deleteImage(name: string) {
    let url = this.apiUrl + `/images/${name}` //delete
    return this.http.delete<any>(url)
  }

  createImage(image: Image) {
    let url = this.apiUrl + `/images/create` //post
    return this.http.post<any>(url, image)
  }
}
