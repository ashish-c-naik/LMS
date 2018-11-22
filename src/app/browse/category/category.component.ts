import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  links = [{
    url : '../../assets/book.jpg',
    name: 'Mathematics',
    link: '/browse/mat'
  }, {
    url : '../../assets/book.jpg',
    name: 'Science',
    link: '/browse/sci'
  }, {
    url : '../../assets/book.jpg',
    name: 'Technology',
    link: '/browse/tec'
  }, {
    url : '../../assets/book.jpg',
    name: 'Art',
    link: '/browse/art'
  }, {
    url : '../../assets/book.jpg',
    name: 'History',
    link: '/browse/his'
  }, {
    url : '../../assets/book.jpg',
    name: 'Health',
    link: '/browse/hea'
  }, {
    url : '../../assets/book.jpg',
    name: 'Entertainment',
    link: '/browse/ent'
  }, {
    url : '../../assets/book.jpg',
    name: 'Fiction',
    link: '/browse/fic'
  }, {
    url : '../../assets/book.jpg',
    name: 'Miscellaneous',
    link: '/browse/mis'
  }];
  constructor() { }

  ngOnInit() {
  }

}
