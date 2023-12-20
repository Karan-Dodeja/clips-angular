import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import IUser from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private usersCollection: AngularFirestoreCollection<IUser>
  constructor(private auth: AngularFireAuth, private db: AngularFirestore) {
    this.usersCollection = db.collection('users')
  }

  public async createUser(userData: IUser) {
    if (!userData.password) {
      throw new Error("password not provided!")
    }
    const userCred = await this.auth.createUserWithEmailAndPassword(
      userData.email as string, userData.password as string
    )

    if (!userCred.user) {
      throw new Error("User can not be found!")
    }

    await this.usersCollection.doc(userCred.user?.uid).set({
      name: userData.name,
      email: userData.email,
      age: userData.age,
      // phoneNumber: userData.phoneNumber
    }) // Create collection named users and add properties that want to save

    await userCred.user.updateProfile({
      displayName: userData.name
    })
  }
}