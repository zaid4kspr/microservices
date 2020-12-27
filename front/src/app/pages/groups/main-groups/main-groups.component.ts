import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {AuthServiceZ} from "./../../../authentification/auth-service.service";
import {GroupsService} from "./../groups.service";

declare var $: any

@Component({
  selector: 'app-main-groups',
  templateUrl: './main-groups.component.html',
  styleUrls: ['./main-groups.component.scss']
})
export class MainGroupsComponent implements OnInit {

  submitted = false
  SubGroups = []

  addGroupForm

  constructor(private fb: FormBuilder,
              private authService: AuthServiceZ,
              private groupsService: GroupsService,
  ) {

    this.addGroupForm = this.fb.group({
      name: ['', Validators.required],
      _id: [''],
      parentId: ['', Validators.required],
      status: ['', Validators.required],
      createdBy: [this.authService.credentials.user._id, Validators.required],
    });
  }

  ngOnInit(): void {
    this.getMySubGroups();
  }


  getMySubGroups() {
    this.groupsService.getMySubGroup().then(d => {
      this.SubGroups = d;
    })
  }

  addGroup() {
    this.submitted = true

    if (this.addGroupForm.valid) {
      //edit Api
      if (this.addGroupForm.controls._id.value) {

        this.groupsService.editGroup(this.addGroupForm.value).then(d => {
          this.addGroupForm.patchValue(d)
          var index = this.SubGroups.map(item => item._id).indexOf(d._id)
          this.SubGroups[index] = d
          this.SubGroups[index].createdBy = this.objInEditModal.createdBy
          this.SubGroups[index].parentId = this.SubGroups[this.SubGroups.map(item => item._id).indexOf(d.parentId)]
          this.submitted = false

          $('#addContactModal').modal('toggle');
        })

      } else {
        // add Api

        let ObjToAdd = Object.assign({}, this.addGroupForm.value)
        delete ObjToAdd._id
        this.groupsService.addGroup(ObjToAdd).then(d => {

          ObjToAdd["parentId"] = this.SubGroups[this.SubGroups.map(item => item._id).indexOf(ObjToAdd.parentId)]
          ObjToAdd["createdBy"] = this.authService.credentials.user
          ObjToAdd["_id"] = "" + d._id

          this.SubGroups.push(ObjToAdd)
          this.addGroupForm.reset();
          this.addGroupForm.controls["createdBy"].patchValue(this.authService.credentials.user._id)
          this.submitted = false
          document.getElementById("closeModal").click()

        })
      }

    }
  }

  openModal() {
    $('#addContactModal').modal('show');
    this.addGroupForm.patchValue({
      name: "",
      parentId: "",
      status: "",
      _id: null,
      createdBy: this.authService.credentials.user._id
    })
  }

  objInEditModal

  editGroup(group) {
    $('#addContactModal').modal('show');
    this.objInEditModal = Object.assign({}, group)
    let ObjToAdd = Object.assign({}, group)
    ObjToAdd["parentId"] = group?.parentId?._id
    this.addGroupForm.patchValue(ObjToAdd)
  }


  get f() {
    return this.addGroupForm.controls;
  }

}
