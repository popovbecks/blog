import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from "angularfire2/firestore";
import { Item } from "../classes/item";
import { Observable } from "rxjs/Observable";
import {Comment } from "../classes/comment";

@Injectable()
export class ItemServiceService {
blogsCollection: AngularFirestoreCollection<any>;
commentsCollection: AngularFirestoreCollection<any>;
items: Observable<Item[]>;
itemDoc: AngularFirestoreDocument<Item>;
commentDoc: AngularFirestoreDocument<any>;
  constructor(public afs: AngularFirestore) {
    this.blogsCollection = this.afs.collection('items')
    this.items = this.blogsCollection.snapshotChanges().map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Item;
        data.id = a.payload.doc.id;
        data.comments = this.afs.collection(`items/${data.id}/comments/`).snapshotChanges().map(changesCom => {
          return changesCom.map(b => {
            const dataCom = b.payload.doc.data() as Comment;
            dataCom.id = b.payload.doc.id;
            return dataCom
          })
        })
        console.log(data)
        return data;
      });
    });
  }
  getBlogs() {
  return this.items;
  }
  addBlogItem(item: Item) {
  this.blogsCollection.add(item)
  }
  deleteBlog(item: Item){
    this.itemDoc = this.afs.doc(`items/${item.id}`);
    this.itemDoc.delete();
}
editItem(item: Item){
  this.itemDoc = this.afs.doc(`items/${item.id}`);
  this.itemDoc.update(item);
  }
  addComment(comment, item: Item) {
    this.afs.collection(`items/${item.id}/comments/`).add(comment);
  }
  deleteComment(item: Item, comment: Comment){
  this.commentDoc = this.afs.doc(`items/${item.id}/comments/${comment.id}`);
  this.commentDoc.delete();
  }
  editComment(item: Item, comment: Comment) {
    this.commentDoc = this.afs.doc(`items/${item.id}/comments/${comment.id}`);
    this.commentDoc.update(comment);
  }
}
