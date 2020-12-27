import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PermissionRoutingModule } from './permission-routing.module';
import { MainPermissionComponent } from './main-permission/main-permission.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [MainPermissionComponent],
  imports: [
    CommonModule,
    PermissionRoutingModule,
    
    FormsModule, ReactiveFormsModule
  ]
})
export class PermissionModule { }
