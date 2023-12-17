import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../service/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent implements OnInit {
  
  closeModal() {
    this.modal.toggleModal
  }

  constructor(public modal: ModalService) { 
    
  }

  ngOnInit() {

  }

}
