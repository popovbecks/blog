import { Comment } from "./comment";
import {Observable} from "rxjs/Observable";

export interface Item{
  id?: string;
  title?: string;
  description?: string;
  date?: any;
  comments?: any;
}
