import { Injectable } from '@angular/core';
import { CollectionReference, DocumentData, Firestore, addDoc, collection, collectionData, deleteDoc, doc, docData, updateDoc } from '@angular/fire/firestore';
import { IActionsPost, IActionsRequest } from '../../interfaces/actions/actions.interface';

@Injectable({
  providedIn: 'root'
})
export class ActionsService {

  private actionCollection!: CollectionReference<DocumentData>;

  constructor(
    private afs: Firestore
  ) {
    this.actionCollection = collection(this.afs, 'actions')
  }

  getOneFirebase(id: string) {
    const categoryDocumentReference = doc(this.afs, `actions/${id}`);
    return docData(categoryDocumentReference, { idField: 'id' });
  };

  getAllFirebase() {
    return collectionData(this.actionCollection, { idField: 'id' })
  };

  createFirebase(action: IActionsPost) {
    return addDoc(this.actionCollection, action);
  };

  deleteFirebase(id: string) {
    const categoryDocumentReference = doc(this.afs, `actions/${id}`)
    return deleteDoc(categoryDocumentReference)
  };

  updateFirebase(action: IActionsRequest, id: string) {
    const categoryDocumentReference = doc(this.afs, `actions/${id}`)
    return updateDoc(categoryDocumentReference, {...action})
  };

}
