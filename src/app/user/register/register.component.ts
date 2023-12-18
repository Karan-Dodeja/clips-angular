import { Component } from '@angular/core';
import {
  FormGroup
  // Allow us to creat a new form, 
  , FormControl
  // Controls a individual input
  , Validator,
  Validators
  // Every Validation Function can be found under this object
} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  name= new FormControl('', [
    Validators.required,
    Validators.minLength(3)
  ])
  email= new FormControl('', [])
  age= new FormControl('')
  password= new FormControl('')
  confirm_password= new FormControl('')
  phoneNumber= new FormControl('')

  registerForm = new FormGroup({
    name: this.name,
    email: this.email,
    age: this.age,
    password: this.password,
    confirm_password: this.confirm_password,
    phoneNumber: this.phoneNumber
  })
}