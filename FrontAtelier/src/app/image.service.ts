import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor() { }

  uploadImage(imageFile: File): FormData {
    const formData = new FormData();
    formData.append('image', imageFile);
    return formData;
  }
}
