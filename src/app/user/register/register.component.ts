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
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  constructor(private auth: AngularFireAuth, private db: AngularFirestore) { }
  inSubmission = false
  name = new FormControl('', [
    Validators.required,
    Validators.minLength(3)
  ])
  email = new FormControl('', [
    Validators.required,
    Validators.email
  ])
  age = new FormControl('', [
    Validators.required,
    Validators.min(18),
    Validators.max(120)
  ])
  password = new FormControl('', [
    Validators.required,
    Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm)
  ])
  confirm_password = new FormControl('', [
    Validators.required,

  ])
  phoneNumber = new FormControl('', [
    Validators.required,
    Validators.min(13),
    Validators.max(13)
  ])

  showAlert = false
  alertMsg = 'Please wait! Your account is being created.'
  alertColor = 'blue'

  registerForm = new FormGroup({
    name: this.name,
    email: this.email,
    age: this.age,
    password: this.password,
    confirm_password: this.confirm_password,
    // phoneNumber: this.phoneNumber
  })

  async register() {
    this.showAlert = true
    this.alertMsg = 'Please wait! Your account is being created.'
    this.alertColor = 'blue'
    this.inSubmission = true
    const { email, password } = this.registerForm.value // Destructuring values from registerform

    try {
      const userCred = await this.auth.createUserWithEmailAndPassword(
        email as string, password as string
      )
      await this.db.collection('users').add({
        name: this.name.value,
        email: this.email.value,
        age: this.age.value,
        phoneNumber: this.phoneNumber.value
      }) // Create collection named users and add properties that want to save
      
    } catch (error) {
      console.log(error)
      this.alertColor = 'red'
      this.alertMsg = 'An unexpexted error occured! please try again later!'
      this.inSubmission = false
      return
    }
    this.alertMsg = 'Success! your account has been created.'
    this.alertColor = 'green'
  }
}