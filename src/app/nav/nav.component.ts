import { Component, OnInit } from '@angular/core';
import { ModalService } from '../service/modal.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent implements OnInit {
  constructor(public modal: ModalService) {

  }

  openModal($event: Event) {
    $event.preventDefault()
    this.modal.toggleModal('auth')
  }
  
  ngOnInit() {

  }

}
