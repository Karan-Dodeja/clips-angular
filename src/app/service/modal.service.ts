import { Injectable } from '@angular/core';

@Injectable({ // class cam be injected into component
  providedIn: 'root' // globalaly injected
})
export class ModalService {
  
  private visible = false // tells modal should be shown/hidden
  
  constructor() { }
  
  isModalOpen() {
    return this.visible
  }
  
  toggleModal(){
    this.visible = !this.visible
  }
  
}