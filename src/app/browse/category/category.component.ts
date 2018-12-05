import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../../util/navigation/navigation.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  links = [{
    url : '../../assets/icons/Math_Icon.png',
    name: 'Mathematics',
    link: '/browse/mat'
  }, {
    url : '../../assets/icons/Science_Icon.png',
    name: 'Science',
    link: '/browse/sci'
  }, {
    url : '../../assets/icons/Technology_Icon.png',
    name: 'Technology',
    link: '/browse/tec'
  }, {
    url : '../../assets/icons/Art_Icon.png',
    name: 'Art',
    link: '/browse/art'
  }, {
    url : '../../assets/icons/History_Icon.png',
    name: 'History',
    link: '/browse/his'
  }, {
    url : '../../assets/icons/Health_Icon.png',
    name: 'Health',
    link: '/browse/hea'
  }, {
    url : '../../assets/icons/Entertainment_Icon.png',
    name: 'Entertainment',
    link: '/browse/ent'
  }, {
    url : '../../assets/icons/Fiction_Icon.png',
    name: 'Fiction',
    link: '/browse/fic'
  }, {
    url : '../../assets/icons/Misc_Icon.png',
    name: 'Miscellaneous',
    link: '/browse/mis'
  }];
  constructor(
    public navigationService: NavigationService
  ) { }

  ngOnInit() {
    this.navigationService.showLogin = true;
    this.navigationService.showRegister = true;
    this.navigationService.showSearch = true;
  }

}
