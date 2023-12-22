import { Component, Input, OnDestroy, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { ModalService } from '../../service/modal.service';
import IClip from '../../models/clip.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent implements OnInit, OnDestroy, OnChanges {

  @Input() activeClip: IClip | null = null

  clipID = new FormControl('')
  title = new FormControl('', {
    validators: [
      Validators.required,
      Validators.minLength(3)
    ],
    nonNullable: true
  },)

  editForm = new FormGroup({
    title: this.title,
    id: this.clipID
  })

  constructor(private modal: ModalService) {
    this.modal.register('editClip')
  }
  ngOnChanges() {
    if (!this.activeClip) {
      return
    }
    this.clipID.setValidators(this.activeClip.docID)
    this.title.setValue(this.activeClip.title)
  }

  ngOnInit() {

  }

  ngOnDestroy() {
    this.modal.unregister('editClip')
  }

}