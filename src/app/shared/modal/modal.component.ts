import { Component, Input, OnInit } from '@angular/core';
import { ModalService } from '../../service/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent implements OnInit {
  
  @Input() modalID = ''

  closeModal() {
    this.modal.toggleModal(this.modalID)
  }

  constructor(public modal: ModalService) { 
    
  }

  ngOnInit() {

  }

}
