import { Injectable } from '@angular/core';
import { Firestore, doc, updateDoc } from '@angular/fire/firestore';
import { Subject } from 'rxjs';
import { IProductsRequest } from '../../interfaces/products/products.intefrace';

@Injectable({
  providedIn: 'root'
})
export class FavouriteService {

  public changeFavourite = new Subject<boolean>();

  constructor(
    private afs: Firestore,
  ) { }

  updateFirebase(favourites: IProductsRequest[], id: string) {
    const categoryDocumentReference = doc(this.afs, `users/${id}`)
    return updateDoc(categoryDocumentReference, { favourites: favourites })
  };


}
