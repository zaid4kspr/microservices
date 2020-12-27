import { Component, OnInit } from '@angular/core';
import { SharedService } from "./../../../shared/shared.service";
import { AuthServiceZ } from "./../../../authentification/auth-service.service";
import { Router } from "@angular/router";
@Component({
  selector: 'app-main-permission',
  templateUrl: './main-permission.component.html',
  styleUrls: ['./main-permission.component.scss']
})
export class MainPermissionComponent implements OnInit {
  profile
  SubGroups = []
  permissions = [

    {
      name: "getUsers",
    },
    {
      name: "deleteUsers",
    },
    {
      name: "filterUsers",
    },
    {
      name: "updateUsers",
    },
    {
      name: "createUsers",
    },
    {
      name: "createUsers",
    },




  ]





  constructor(private sharedService: SharedService, private authService: AuthServiceZ, private router: Router) {

    this.sharedService.getMyProfile(this.authService.credentials.user._id).then(d => {
      this.profile = d
      if (d.group.name != "Super Admins") {
        this.router.navigate(['/'])
      } else {

        this.getMySubGroups()
        this.getAllPermissions()
      }
    })
  }

  ngOnInit(): void {



  }

  checkIfPermissionExist(permission, group) {

    if (group.permissions.map(item => item._id).indexOf(permission._id) != -1)
      return true


    return false;

  }

  editPermissionforGroup(permission, group) {
    var index = group.permissions.map(item => item._id).indexOf(permission._id)

    if (index == -1) {

      group.permissions.push(permission)
      this.updateGroup(group)

    } else {
      group.permissions.splice(index, 1)
      this.updateGroup(group)
      this.dealWithMyChildren(group._id, permission)
    }


  }

  updateGroup(group) {
    group.permissions.map(item => item._id)
    this.sharedService.editGroup(group).then(d => {

    })
  }

  getAllPermissions() {
    this.sharedService.getAllPermissions().then(d => {
      this.permissions = d
    })
  }

  getMySubGroups() {
    this.sharedService.getMySubGroup().then(d => {
      this.SubGroups = d;
    })
  }




  dealWithMyChildren(parentId, permission) {
 

    this.SubGroups.forEach(group => {
      if (group?.parentId?._id == parentId) {

        var index = group.permissions.map(item => item._id).indexOf(permission._id)
        

        if (index != -1) {
          this.editPermissionforGroup(permission, group)
        }
      }
    })
  }

  verifHisFatherHasThePermission(permission, group) {

    if (!group.parentId) {
      return true
    }
    var index = this.SubGroups.map(item => item._id).indexOf(group.parentId._id)
 
    var res = this.SubGroups[index]?.permissions.map(item => item._id).indexOf(permission._id)
 
    return res == -1
  }

}
