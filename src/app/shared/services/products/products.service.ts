import { Injectable } from '@angular/core';
import { CollectionReference, DocumentData, Firestore, addDoc, collection, collectionData, deleteDoc, doc, docData, query, updateDoc } from '@angular/fire/firestore';
import { IProductsPost, IProductsRequest } from '../../interfaces/products/products.intefrace';
import { where } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private productsCollection!: CollectionReference<DocumentData>;

  constructor(
    private afs: Firestore
  ) {
    this.productsCollection = collection(this.afs, 'products')
  }

  getOneFirebase(id: string) {
    const productDocumentReference = doc(this.afs, `products/${id}`);
    return docData(productDocumentReference, { idField: 'id' });
  }

  getAllFirebase() {
    return collectionData(this.productsCollection, { idField: 'id' })
  };

  getAllFirebaseByCategory(category: string) {
    return collectionData(query(this.productsCollection, where("category", "==", category)), { idField: 'id' });
  };

  createFirebase(product: IProductsPost) {
    return addDoc(this.productsCollection, product);
  };

  deleteFirebase(id: string) {
    const categoryDocumentReference = doc(this.afs, `products/${id}`)
    return deleteDoc(categoryDocumentReference)
  };

  updateFirebase(product: IProductsRequest, id: string) {
    const categoryDocumentReference = doc(this.afs, `products/${id}`)
    return updateDoc(categoryDocumentReference, {...product})
  };
  
}
