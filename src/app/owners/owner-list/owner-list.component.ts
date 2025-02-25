/*
 *
 *  * Copyright 2016-2017 the original author or authors.
 *  *
 *  * Licensed under the Apache License, Version 2.0 (the "License");
 *  * you may not use this file except in compliance with the License.
 *  * You may obtain a copy of the License at
 *  *
 *  *      http://www.apache.org/licenses/LICENSE-2.0
 *  *
 *  * Unless required by applicable law or agreed to in writing, software
 *  * distributed under the License is distributed on an "AS IS" BASIS,
 *  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  * See the License for the specific language governing permissions and
 *  * limitations under the License.
 *
 */

/**
 * @author Vitaliy Fedoriv
 */

import {Component, Input, OnInit} from '@angular/core';
import {OwnerService} from '../owner.service';
import {Owner} from '../owner';
import {Router} from '@angular/router';

@Component({
  selector: 'app-owner-list',
  templateUrl: './owner-list.component.html',
  styleUrls: ['./owner-list.component.css']
})
export class OwnerListComponent implements OnInit {
  errorMessage: string;
  owners: Owner[];

  @Input() owner: Owner;
  responseStatus: number;
  deleteSuccess = false;


  constructor(private router: Router, private ownerService: OwnerService) {
  }

  ngOnInit() {
    this.ownerService.getOwners().subscribe(
      owners => this.owners = owners,
      error => this.errorMessage = error as any);
  }

  onSelect(owner: Owner) {
    this.router.navigate(['/owners', owner.id]);
  }

  addOwner() {
    this.router.navigate(['/owners/add']);
  }

  deleteOwner(owner: Owner) {
      this.ownerService.deleteOwner(owner.id.toString()).subscribe(
        response => {
          this.deleteSuccess = true;
          this.owners = this.owners.filter(currentItem => !(currentItem.id === owner.id));
        },
        error => this.errorMessage = error as any);      
  }


}
