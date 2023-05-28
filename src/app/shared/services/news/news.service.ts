import { Injectable } from '@angular/core';
import { CollectionReference, DocumentData, Firestore, collection, doc, docData, collectionData, addDoc, deleteDoc, updateDoc } from '@angular/fire/firestore';
import { INewsPost, INewsRequest } from '../../interfaces/news/news.interface';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  private newsCollection!: CollectionReference<DocumentData>;

  constructor(
    private afs: Firestore
  ) {
    this.newsCollection = collection(this.afs, 'news')
  }

  getOneFirebase(id: string) {
    const categoryDocumentReference = doc(this.afs, `news/${id}`);
    return docData(categoryDocumentReference, { idField: 'id' });
  }

  getAllFirebase() {
    return collectionData(this.newsCollection, { idField: 'id' })
  };

  createFirebase(action: INewsPost) {
    return addDoc(this.newsCollection, action);
  };

  deleteFirebase(id: string) {
    const categoryDocumentReference = doc(this.afs, `news/${id}`)
    return deleteDoc(categoryDocumentReference)
  };

  updateFirebase(news: INewsRequest, id: string) {
    const categoryDocumentReference = doc(this.afs, `news/${id}`)
    return updateDoc(categoryDocumentReference, {...news})
  };
  
}
