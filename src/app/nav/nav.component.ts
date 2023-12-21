import { Component, OnInit } from '@angular/core';
import { ModalService } from '../service/modal.service';
import { AuthService } from '../services/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent implements OnInit {

  constructor(
      public modal: ModalService, 
      public auth: AuthService, 
    ) {
  }

  openModal($event: Event) {
    $event.preventDefault()
    this.modal.toggleModal('auth')
  }

  ngOnInit() {

  }


}