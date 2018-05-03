import { Component, OnInit } from '@angular/core';
import { ItemServiceService } from "../services/item-service.service";
import { Item } from "../classes/item";
import { Comment } from "../classes/comment";
import {forEach} from "@angular/router/src/utils/collection";

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.css']
})
export class PostsListComponent implements OnInit {
items: Item[];
editState: boolean = false;
editCommentState: boolean = false;
commentToEdit: Comment;
commentsState: boolean = false;
itemToEdit: Item;
itemToShow: Item;
comment: Comment = {
  name: '',
  message: ''
}
  constructor(private itemService: ItemServiceService) { }

  ngOnInit() {
    this.itemService.getBlogs().subscribe(items => {
      items.forEach(item => {
        item.comments.subscribe(comment => {
          item.comments = comment;
          return items
        })
      })
      this.items = items;
      console.log(this.items)
    })
  }
deleteItem(event , item: Item){
    this.itemService.deleteBlog(item)
}
editItem(event, item: Item){
  this.editState = true;
  this.itemToEdit = item;
}
updateItem(item: Item) {
  this.itemService.editItem(item);
  this.clearState();
}
cancelUpdate() {

}
  clearState(){
    this.editState = false;
    this.itemToEdit = null;
  }
  clearCommentState() {
    this.editCommentState = false;
    this.commentToEdit = null;
  }
  //Comments
  onSubmitCom(item: Item) {
    if(this.commentsState && this.itemToShow.id == item.id){
      this.itemService.addComment(this.comment, item);
      this.comment.name = '';
      this.comment.message = '';
      this.itemToEdit = null;
    }

  }
  changeCommentState(item: Item) {
    this.itemToShow = item;
    this.commentsState = !this.commentsState;
  }
  deleteComment(event, item: Item, comment: Comment){
    this.itemService.deleteComment(item, comment);
  }
  editComment(event, comment: Comment){
    this.editCommentState = true;
    this.commentToEdit = comment;
  }
  updateComment(item: Item, comment: Comment) {
    this.itemService.editComment(item, comment);
    this.clearCommentState();
  }
}
