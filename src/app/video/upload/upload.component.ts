import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.css'
})
export class UploadComponent implements OnInit {

  isDragover = false

  constructor() { }

  ngOnInit() {

  }

  storeFile($event: Event) {
    this.isDragover = false
  }
}
