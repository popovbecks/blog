import { Component, OnInit } from '@angular/core';
import { ItemServiceService } from "../services/item-service.service";
import { Item } from "../classes/item";

@Component({
  selector: 'app-add-blog',
  templateUrl: './add-blog.component.html',
  styleUrls: ['./add-blog.component.css']
})
export class AddBlogComponent implements OnInit {

  constructor(private itemService: ItemServiceService) { }
  dateCreate = new Date();
  item: Item = {
    title: '',
    description: '',
    date: this.dateCreate.getDate() + "." + (+this.dateCreate.getMonth() + 1) + "." + this.dateCreate.getFullYear()
  }

  blogState: boolean = false;
  ngOnInit() {
  }
  onSubmit(){
    if(this.item.title != '' && this.item.description != ''){
      this.itemService.addBlogItem(this.item);
      this.item.title = '';
      this.item.description = '';
      this.blogState = false;
    }
  }
  showAdd(){
    this.blogState = !this.blogState;
  }
  onCancel() {
    this.item.title = '';
    this.item.description = '';
    this.blogState = false;
  }

}
