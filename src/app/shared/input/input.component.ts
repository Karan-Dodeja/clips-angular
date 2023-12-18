import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrl: './input.component.css'
})
export class InputComponent implements OnInit {
  @Input() control: FormControl = new FormControl()
  @Input() type='text'
  @Input() placeholder=''

  constructor() { }
  
  ngOnInit() {

  }
}
