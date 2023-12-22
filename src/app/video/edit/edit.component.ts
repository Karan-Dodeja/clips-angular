import { Component, Input, OnDestroy, OnInit, OnChanges, Output, EventEmitter } from '@angular/core';
import { ModalService } from '../../service/modal.service';
import IClip from '../../models/clip.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ClipService } from '../../services/clip.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent implements OnInit, OnDestroy, OnChanges {

  @Input() activeClip: IClip | null = null
  inSubmission = false
  showAlert = false
  alertColor = 'blue'
  alertMsg = 'Please wait! Updating clip.'
  @Output() update = new EventEmitter()

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

  constructor(private modal: ModalService, private clipService: ClipService) {

  }
  ngOnChanges() {
    if (!this.activeClip) {
      return
    }
    this.inSubmission = false
    this.showAlert = false
    // this.clipID.setValue(this.activeClip.docID)
    this.title.setValue(this.activeClip.title)
  }

  ngOnInit() {
    this.modal.register('editClip')
  }

  ngOnDestroy() {
    this.modal.unregister('editClip')
  }

  async submit() {

    if (!this.activeClip) {
      return 
    }

    this.inSubmission = true
    this.showAlert = true
    this.alertColor = 'blue'
    this.alertMsg = 'Please wait! Updating clip.'

    try {
      await this.clipService.updateClip(this.clipID.value, this.title.value)
    } catch (error) {
      this.inSubmission = false
      this.alertColor = 'red'
      this.alertMsg = 'Something went wrong try again later.'
      return
    }

    this.activeClip.title = this.title.value
    this.update.emit(this.activeClip)

    this.inSubmission = false
    this.alertColor = 'green'
    this.alertMsg = 'Success!'

  }

}