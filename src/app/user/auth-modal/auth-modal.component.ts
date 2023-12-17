import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../service/modal.service';

@Component({
  selector: 'app-auth-modal',
  templateUrl: './auth-modal.component.html',
  styleUrl: './auth-modal.component.css'
})
export class AuthModalComponent implements OnInit {

  constructor(public modal: ModalService) { }

  ngOnInit(): void {
    this.modal.register('auth')
  }

}
