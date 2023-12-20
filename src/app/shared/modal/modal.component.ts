import { Component, Input, OnDestroy, OnInit, ElementRef } from '@angular/core';
import { ModalService } from '../../service/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent implements OnInit, OnDestroy {
  
  @Input() modalID = ''

  closeModal() {
    this.modal.toggleModal(this.modalID)
  }

  constructor(public modal: ModalService, public el: ElementRef) { 
    
  }

  ngOnInit() {
    document.body.appendChild(this.el.nativeElement)
    // document.body.appendChild(this.el.nativeElement)
  }

  ngOnDestroy() {
    document.body.removeChild(this.el.nativeElement)
  }

}
