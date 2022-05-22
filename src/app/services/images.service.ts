import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {
  apiUrl: string = environment.dockerApi
  constructor() { }

  getAllimages() {
    let url = this.apiUrl + '/images/json' //get
  }

  getImage(Id: string) {
    let url = this.apiUrl + `/images/${Id}/json` //get
  }

  deleteImage(name: string) {
    let url = this.apiUrl + `/images/${name}` //delete
  }

  createImage() {
    let url = this.apiUrl + `/images/create` //post
  }
}
