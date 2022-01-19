import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { MainUsersComponent } from './main-users/main-users.component';
import { UsersService } from './users.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination'; // <-- import the module
import { NgSelectModule } from '@ng-select/ng-select';
import { SharedModule } from "./../../shared/shared.module";
import { LivreComponent } from "./livre/livre.component";
import { AdministratifComponent } from "./administratif/administratif.component";

@NgModule({
  declarations: [MainUsersComponent,LivreComponent,AdministratifComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    NgSelectModule,
    SharedModule
    
  ],
  providers: [
    UsersService
  ]
})
export class UsersModule { }
