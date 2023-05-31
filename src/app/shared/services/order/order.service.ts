import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IProductsRequest } from '../../interfaces/products/products.intefrace';
import { CollectionReference, DocumentData, Firestore, addDoc, collection, collectionData, deleteDoc, doc, updateDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  public changeBasket = new Subject<boolean>();

  private ordersCollection!: CollectionReference<DocumentData>;

  constructor(
    private afs: Firestore
  ) 
  {
    this.ordersCollection = collection(this.afs, 'orders')
  }

  getAllFirebase() {
    return collectionData(this.ordersCollection, { idField: 'id' })
  };

  createFirebase(order: any) {
    return addDoc(this.ordersCollection, order);
  };

  deleteFirebase(id: string) {
    const categoryDocumentReference = doc(this.afs, `orders/${id}`)
    return deleteDoc(categoryDocumentReference)
  };

  updateFirebase(orders: any, id: string) {
    const categoryDocumentReference = doc(this.afs, `users/${id}`)
    return updateDoc(categoryDocumentReference, { orders: orders })
  };

}
