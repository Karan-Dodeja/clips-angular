import { Component, OnInit } from '@angular/core';
import { ModalService } from '../service/modal.service';
import { AuthService } from '../services/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent implements OnInit {

  constructor(
      public modal: ModalService, 
      public auth: AuthService, 
      private afAuth: AngularFireAuth, 
      private router: Router
    ) {
  }

  openModal($event: Event) {
    $event.preventDefault()
    this.modal.toggleModal('auth')
  }

  ngOnInit() {

  }

  async logout($event: Event) {
    $event.preventDefault()
    await this.afAuth.signOut()
    await this.router.navigateByUrl('/')
  }

}