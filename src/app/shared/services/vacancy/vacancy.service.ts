import { Injectable } from '@angular/core';
import { CollectionReference, DocumentData, Firestore, addDoc, collection, collectionData, deleteDoc, doc, docData, updateDoc } from '@angular/fire/firestore';
import { IVacancyPost } from '../../interfaces/vacancy/vacancy.interface';

@Injectable({
  providedIn: 'root'
})
export class VacancyService {

  private vacancyCollection!: CollectionReference<DocumentData>;

  constructor(
    private afs: Firestore
  ) 
  {
    this.vacancyCollection = collection(this.afs, 'vacancy')
  }

  getAllFirebase() {
    return collectionData(this.vacancyCollection, { idField: 'id' })
  };

  createFirebase(vacancy: IVacancyPost) {
    return addDoc(this.vacancyCollection, vacancy);
  };

  deleteFirebase(id: string) {
    const categoryDocumentReference = doc(this.afs, `vacancy/${id}`)
    return deleteDoc(categoryDocumentReference)
  };

}
