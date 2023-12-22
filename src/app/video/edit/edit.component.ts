import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalService } from '../../service/modal.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent implements OnInit, OnDestroy {

  constructor(private modal:ModalService) { 
    this.modal.register('editClip')
  }
  
  ngOnInit() {
    
  }
  
  ngOnDestroy() {
    this.modal.unregister('editClip')
  }

}