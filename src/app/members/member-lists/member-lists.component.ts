import { Component, OnInit } from '@angular/core';
import { User } from '../../_models/user';
import { UserService } from '../../_services/user.service';
import { AlertifyService } from '../../_services/alertify.service';
import { PaginatedResult, Pagination } from 'src/app/_models/Pagination';

@Component({
  selector: 'app-member-lists',
  templateUrl: './member-lists.component.html',
  styleUrls: ['./member-lists.component.css']
})
export class MemberListsComponent implements OnInit {

  users: User[];
  user: User = JSON.parse(localStorage.getItem('user'));
  genderList = [{ value: 'male', display: 'Males' }, { value: 'female', display: 'Females' }];
  userParams: any = {};
  pagination: Pagination;
  pageNumber = 1;
  pageSize = 5;

  constructor(private userService: UserService, private alertify: AlertifyService) {
  }

  ngOnInit() {
    this.userParams.gender = this.user.gender === 'female' ? 'male' : 'female';
    this.userParams.minAge = 18;
    this.userParams.maxAge = 99;
    this.loadUsers();
  }

  resetFilters() {
    this.userParams.gender = this.user.gender === 'female' ? 'male' : 'female';
    this.userParams.minAge = 18;
    this.userParams.maxAge = 99;
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers(this.pageNumber, this.pageSize, this.userParams).subscribe(
      (users: PaginatedResult<User[]>) => {
        this.users = users.result;
        this.pagination = users.pagination;

        this.pageNumber = this.pagination.currentPage;
        this.pageSize = this.pagination.itemsPerPage;
      },
      error => {
        this.alertify.error(error);
      });
  }

  pageChanged(event: any): void {
    this.pageNumber = event.page;
    this.loadUsers();
  }

}
