import { Component, OnInit } from '@angular/core';
import { UsersService } from "./../users.service";
import { FormBuilder, Validators } from '@angular/forms';
import { AuthServiceZ } from "./../../../authentification/auth-service.service";
import { SharedService } from "./../../../shared/shared.service";
declare var $
@Component({
  selector: 'app-main-users',
  templateUrl: './main-users.component.html',
  styleUrls: ['./main-users.component.scss']
})
export class MainUsersComponent implements OnInit {
  p = 0
  showCheckBoxes = false
  total = 0
  users = []
  addUserForm
  editUserForm
  submitted = false
  submittedAdd = false
  successMsg = undefined
  errorPMsg = undefined
  SubGroups = []


  filterBody = {
    group: "User",
    name: "",
    email: "",
    page: 1,
    business: undefined
  }
  businesses = []


  constructor(
    private usersService: UsersService,
    private sharedService: SharedService,
    private fb: FormBuilder,
    private authService: AuthServiceZ
  ) {



    this.addUserForm = this.fb.group({
      email: ['', [Validators.required, Validators.maxLength(50), Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,10})+$/)]],
      tel: ['', [Validators.required, Validators.minLength(8)]],
      lastName: ['', Validators.required],
      firstName: ['', Validators.required],
      classe: ['', Validators.required],

    });
    this.editUserForm = this.fb.group({
      email: ['', [Validators.required, Validators.maxLength(50), Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,10})+$/)]],
      tel: ['', [Validators.required, Validators.minLength(8)]],
      lastName: ['', Validators.required],
      firstName: ['', Validators.required],
      classe: ['', Validators.required],
      id: [''],
    });
  }

  ngOnInit(): void {


    this.getStudents();

  }

  getStudents() {
    this.usersService.getallUsers().then(d => {
      console.log(d);

      this.users = d.
        _embedded.etudiants.reverse()
      this.total = d.page.totalElement
    })
  }
 


  get f() { return this.editUserForm.controls; }
  get e() { return this.addUserForm.controls; }
  openEditModal(user) {
    this.editUserForm.reset()
    console.log(user);
    console.log(user._links.self.href.split('/').pop());
    user["id"] = user._links.self.href.split('/').pop()
    this.editUserForm.patchValue(user);
    // this.editUserForm.patchValue({ group: user.group._id });

    $('#editModal').modal('show');


    this.usersService.upadateStudent(user.id, this.editUserForm).then(d => {
      console.log(d);
      this.getStudents()

    })

  }
  addUser() {
    this.submittedAdd = false
    $('#addModal').modal('show');

  }


  edit() {
    this.successMsg = undefined
    this.errorPMsg = undefined
    this.submitted = true

    if (this.editUserForm.valid) {
      this.usersService.upadateStudent(this.editUserForm.controls.id.value, this.editUserForm.value).then(d => {
        this.getStudents()
        this.submitted = false
        $('#editModal').modal('toggle');
        this.successMsg = "Les informations de utilisateur " + this.editUserForm.controls.firstName.value + " ont été mises à jour avec succès."

        setTimeout(() => {
          this.successMsg = undefined
        }, 4000);

      }).catch(e => {
        this.errorPMsg = "Une erreur s'est produite. Veuillez essayer plus tard ou contactez-nous."
        setTimeout(() => {
          this.errorPMsg = undefined
        }, 4000);
      })
    }

  } 
  
  
  delete(user,i) {
    this.successMsg = undefined
    this.errorPMsg = undefined
    this.submitted = true
    let id = user._links.self.href.split('/').pop();


      this.usersService.deleteStudent(id).then(d => {
   
      })
      this.users.splice(i,1)
  }


  
  changePage($event) {
    this.p = $event
    this.filterBody.page = $event
    this.getStudents();

  }


  
 




  add() {
    this.submittedAdd = true
    console.log(this.addUserForm.value);
    if (this.addUserForm.valid) {
      let id = 1
      this.usersService.addStudent(this.addUserForm.value).then(d => {

        this.getStudents()
        $('#addModal').modal('toggle');

      })
    }

  }


}
