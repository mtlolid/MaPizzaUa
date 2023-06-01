import { Injectable } from '@angular/core';
import { Firestore, doc, updateDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private afs: Firestore,
  ) { }

  updateFirebase(firstName: string, lastName: string, phone: string, id: string) {
    const categoryDocumentReference = doc(this.afs, `users/${id}`)
    return updateDoc(categoryDocumentReference,
      {
        phone: phone,
        firstName: firstName,
        lastName: lastName
      }
    )
  };
}
