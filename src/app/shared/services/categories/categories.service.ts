import { Injectable } from '@angular/core';
import { CollectionReference, DocumentData, Firestore, addDoc, collection, collectionData, deleteDoc, doc, docData, updateDoc } from '@angular/fire/firestore';
import { ICategoriesPost, ICategoriesRequest } from '../../interfaces/categories/categories.interface';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private categoriesCollection!: CollectionReference<DocumentData>;

  constructor(
    private afs: Firestore
  ) {
    this.categoriesCollection = collection(this.afs, 'categories')
  }

  getOneFirebase(id: string) {
    const categoryDocumentReference = doc(this.afs, `categories/${id}`);
    return docData(categoryDocumentReference, { idField: 'id' });
  }

  getAllFirebase() {
    return collectionData(this.categoriesCollection, { idField: 'id' })
  };

  createFirebase(action: ICategoriesPost) {
    return addDoc(this.categoriesCollection, action);
  };

  deleteFirebase(id: string) {
    const categoryDocumentReference = doc(this.afs, `categories/${id}`)
    return deleteDoc(categoryDocumentReference)
  };

  updateFirebase(category: ICategoriesRequest, id: string) {
    const categoryDocumentReference = doc(this.afs, `categories/${id}`)
    return updateDoc(categoryDocumentReference, {...category})
  };
  
}
