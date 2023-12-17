import { Injectable } from '@angular/core';

interface IModal {
  id: string;
  visible: boolean;
}

@Injectable({ // class cam be injected into component
  providedIn: 'root' // globalaly injected
})
export class ModalService {

  private modals: IModal[] = [] // tells modal should be shown/hidden

  constructor() { }

  register(id: string) {
    this.modals.push({
      id,
      visible: false
    })
  }

  isModalOpen(id: string): boolean {
    return !!this.modals.find(element => element.id === id)?.visible
  }

  toggleModal(id: string) {
    //   this.visible = !this.visible
    const modal = this.modals.find(element => element.id === id)
    if (modal) {
      modal.visible = !modal.visible
    }
  }

}