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
  gouvernorats = [
    {
      division: "Ariana",
      subDivisions: [
        "Ariana Medina",
        "Ettadhamen",
        " Kalaat El Andalous",
        "Mnihla",
        "Raoued",
        "Sidi Thabet",
        "Soukra"
      ]
    },
    {
      division: "Béja",
      subDivisions: [
        "Amdoun",
        "Beja North",
        "Beja South",
        "Goubellat",
        "Mejez El Bab",
        "Nefza",
        "Teboursouk",
        "Testour",
        "Thibar",
      ]
    },
    {
      division: "Ben Arous",
      subDivisions: [
        "Ben Arous",
        "Boumhel",
        "El Mourouj",
        "Ezzahra",
        "Fouchana",
        "Hammam Chott",
        "Hammam - Lif",
        "M'Hamdia",
        "Medina Jedida",
        "Mégrine",
        "Mornag",
        "Rades",
      ]
    }, {
      division: "Bizerte",
      subDivisions: [
        "Bizerte North",
        "Bizerte South",
        "Djoumime",
        "El Alia",
        "Ghar El Melh",
        "Ghezala",
        "Mateur",
        "Menzel Bourguiba",
        "Menzel Jemil",
        " Ras Jebel",
        "Sejenane",
        "Tinja",
        "Utique",
        "Zarzouna",
      ]
    }, {
      division: "Gabès",
      subDivisions: [
        "Gabes Medina",
        "Gabes West",
        "Gabes South",
        "Ghannouch",
        "Hamma",
        "Mareth",
        "Matmata",
        "New Matmata",
        "Menzel Habib",
        "Metouia",
      ]
    }, {
      division: "Gafsa",
      subDivisions: [
        "Gabes Medina",
        "Gabes West",
        "Gabes South",
        "Ghannouch",
        "Hamma",
        "Mareth",
        "Matmata",
        "New Matmata",
        "Menzel Habib",
        "Metouia",
      ]
    }, {
      division: "Jendouba",
      subDivisions: [
        "Aïn Draham",
        "Balta",
        "Bousalem",
        "Fernana",
        "Ghardimaou",
        "Jendouba",
        "Jendouba Nord",
        "Oued Mliz",
        "Tabarka",
      ]
    }, {
      division: "Kairouan",
      subDivisions: [
        "Alaa",
        "Bouhajla",
        "Chebika",
        "Chrarda",
        "Haffouz",
        "Hajeb El Ayoun",
        "Kairouan North",
        "Kairouan South",
        "Nasrallah",
        "Oueslatia",
        "Sbikha",
      ]
    }, {
      division: "Kasserine",
      subDivisions: [
        "Ayoun",
        "Ezzouhour",
        "Feriana",
        "Foussana",
        "Hassi El Ferid",
        "Hidra",
        "Jedeliane",
        "Kasserine North",
        "Kasserine South",
        "Majel Belabbes",
        "Sbeitla",
        "Sbiba",
        "Thala",
      ]
    }, {
      division: "Kebili",
      subDivisions: [
        "Douz North",
        "Douz South",
        "Faouar",
        "Kebili North",
        "Kebili South",
        "Souk El Ahed",
      ]
    }, {
      division: "Kef",
      subDivisions: [
        "Dahmani",
        "Es Sers",
        "Jerissa",
        "Kalaa Khasbat",
        "Kalaat Senane",
        "Kef East",
        "Kef West",
        "Ksour",
        "Nebeur",
        "Sakiet Sidi Youssef",
        "Tajerouine",
      ]
    }, {
      division: "Mahdia",
      subDivisions: [
        "Boumerdes",
        "Chebba",
        "Chorbane",
        "El Djem",
        "Hbira",
        "Ksour Essef",
        "Mahdia",
        "Melloulech",
        "Ouled Chamekh",
        "Sidi Alouane",
        "Souassi",
      ]
    }, {
      division: "Manouba",
      subDivisions: [
        "Borj El Amri",
        "Douar Hicher",
        "El Battan",
        "Jedaida",
        "Manouba",
        "Mornaguia",
        "Oued Ellil",
        "Tebourba",
      ]
    }, {
      division: "Medenine",
      subDivisions: [
        "Ben Guerdane",
        "Beni Khedache",
        "Djerba Ajim",
        "Djerba Midoun",
        "Djerba Houmt Souk",
        "Medenine North",
        "Medenine South",
        "Sidi Makhlouf",
        "Zarzis",
      ]
    }, {
      division: "Monastir",
      subDivisions: [
        "Bekalta",
        "Bembla",
        "Beni Hassen",
        "Jammel",
        "Ksar Hellal",
        "Ksibet El Mediouni",
        "Moknine",
        "Monastir",
        "Ouerdanine",
        "Sahline",
        "Sayada-Lamta-Bou Hjar",
        "Teboulba",
        "Zeramdine",
      ]
    }, {
      division: "Nabeul",
      subDivisions: [
        "Beni Khalled",
        "Beni Khiar",
        "Bou Argoub",
        "Dar Chaabane El Fehri",
        "El Mida",
        "Grombalia",
        "Hammam Ghezaz",
        "Hammamet",
        "Haouaria",
        "Kelibia",
        "Korba",
        "Menzel Bouzelfa",
        "Menzel Temime",
        "Nabeul",
        "Soliman",
        "Takelsa",
      ]
    }, {
      division: "Sfax",
      subDivisions: [
        "Agareb",
        "Bir Ali Ben Khelifa",
        "El Amra",
        "El Ghraiba",
        "Hencha",
        "Jebeniana",
        "Kerkennah",
        "Mahres",
        "Menzel Chaker",
        "Sakiet Eddaier",
        "Sakiet Ezzit",
        "Sfax Medina",
        "Sfax West",
        "Sfax South",
        "Skhira",
        "Thyna",
      ]
    }, {
      division: "Sidi Bouzid",
      subDivisions: [
        "Bir El Hfay",
        "Jelma",
        "Mazzouna",
        "Meknassi",
        "Menzel Bouzaiene",
        "Ouled Haffouz",
        "Regueb",
        "Sabalat Ouled Asker",
        "Sidi Ali Ben Aoun",
        "Sidi Bouzid East",
        "Sidi Bouzid West",
        "Souk Jedid",
      ]
    }, {
      division: "Siliana",
      subDivisions: [
        "Bargou",
        "Bouarada",
        "El Aroussa",
        "El Krib",
        "Gaafour",
        "Kesra",
        "Makthar",
        "Rouhia",
        "Sidi Bourouis",
        "Siliana North",
        "Siliana South",
      ]
    }, {
      division: "Sousse",
      subDivisions: [
        "Akouda",
        "Bouficha",
        "Enfidha",
        "Hammam Sousse",
        "Hergla",
        "Kalaa Kebira",
        "Kalaa Sghira",
        "Kondar",
        "M'Saken",
        "Sidi Bou Ali",
        "Sidi El Heni",
        "Sousse Jaouhara",
        "Sousse Medina",
        "Sousse Riadh",
        "Sousse Sidi Abdelhamid",
        "Zaouia Ksiba Thrayat",
      ]
    }, {
      division: "Tataouine",
      subDivisions: [
        "Bir Lahmar",
        "Dhiba",
        "Ghomrassen",
        "Remada",
        "Samar",
        "Tataouine North",
        "Tataouine South",]
    }
    , {
      division: "Tozeur",
      subDivisions: [
        "Degueche",
        "Hazoua",
        "Nefta",
        "Tamaghza",
        "Tozeur",

      ]
    }, {
      division: "Tunis",
      subDivisions: [
        "Bab Bhar",
        "Bab Souika",
        "Bardo",
        "Bouhaira",
        "Carthage",
        "El Khadra",
        "El Menzah",
        "El Ouardia",
        "El Tahrir",
        "Ezzouhour",
        "Hrairia",
        "Jebel Jelloud",
        "Kabaria",
        "La Goulette",
        "La Marsa",
        "Le Kram",
        "Medina",
        "Omrane",
        "Omrane Superieur",
        "Sidi El Bechir",
        "Sidi Hassine",
        "Sijoumi",

      ]
    }, {
      division: "Zaghouan",
      subDivisions: [
        "Bir Mchergua",
        "Fahs",
        "Nadhour",
        "Saouaf",
        "Zaghouan",
        "Zriba",

      ]
    },
    {
      division: "JUMIA",
      subDivisions: []
    },

  ]

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
      group: ['', Validators.required],
      tel: ['', [Validators.required, Validators.minLength(8)]],
      business: [undefined],
      userType: [undefined],
      services: [[]]


    });
    this.editUserForm = this.fb.group({
      lastName: ['', Validators.required],
      _id: ['', Validators.required],
      firstName: ['', Validators.required],
      name: [''],
      sexe: [''],
      status: ['', Validators.required],
      email: ['', [Validators.required, Validators.maxLength(50), Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,10})+$/)]],
      tel: [''],
      business: [undefined],
      services: [[]],
      regions: []
    });
  }

  ngOnInit(): void {

    // this.getMySubGroups();
    this.getAllBusinesses()
    this.filterUsers();

  }

  filterUsers() {
    this.usersService.getallUsers(this.filterBody.group, this.filterBody).then(d => {
      this.users = d.docs
      this.total = d.totalDocs
    })
  }
  addGroup() {
  }
  onKeyName(ev) {
    this.filterBody.name = ev.target.value
    this.filterBody.page = 1
    this.p = 1
    this.filterUsers()
  }
  onKeyEmail(ev) {
    this.filterBody.email = ev.target.value
    this.filterBody.page = 1
    this.p = 1
    this.filterUsers()
  }

  objInEditModal
  editGroup(group) {
    $('#addContactModal').modal('show');
    this.objInEditModal = Object.assign({}, group)
    let ObjToAdd = Object.assign({}, group)
    ObjToAdd["parentId"] = group?.parentId?._id

  }

  get f() { return this.editUserForm.controls; }
  get e() { return this.addUserForm.controls; }
  openEditModal(user) {
    this.editUserForm.reset()
    this.editUserForm.patchValue(user);
    // this.editUserForm.patchValue({ group: user.group._id });
    this.editUserForm.patchValue({ business: user?.business?._id });

    $('#editModal').modal('show');
 
    // this.groupChangedInEditForm(user.group._id)


  }
  addUser() {
    this.submittedAdd = false
    $('#addModal').modal('show');

  }


  updateUserInfo() {
    this.successMsg = undefined
    this.errorPMsg = undefined
    this.submitted = true
     this.editUserForm.patchValue({
      name: this.editUserForm.controls.firstName.value + " " + this.editUserForm.controls.lastName.value
    })
    if (this.editUserForm.valid) {
      this.usersService.editUser(this.filterBody.group, this.editUserForm.value).then(d => {
        var index = this.users.map(item => item._id).indexOf(d.data._id)
        this.users[index] = d.data
        // this.users[index].group = this.SubGroups[this.SubGroups.map(item => item._id).indexOf(d.group)]
        this.users[index].business = this.businesses[this.businesses.map(item => item._id).indexOf(d.data.business)]
        this.submitted = true
        $('#editModal').modal('toggle');
        this.successMsg = "Les informations de utilisateur " + this.users[index]?.name + " ont été mises à jour avec succès."

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


  sendEmailInvitation() {
    this.addUserForm.patchValue({
      userType: this.addUserForm.controls.group.value
    })
 
    this.submittedAdd = true
    if (this.addUserForm.valid) {
      this.submittedAdd = false
      this.usersService.sendInvitation(this.addUserForm.value).then(d => {
        $('#addModal').modal('toggle');
        this.filterUsers()
        this.addUserForm.reset()
        this.successMsg = "Utilisateur ajouté avec succès."

        setTimeout(() => {
          this.successMsg = undefined
        }, 6000);

      }).catch(e => {
         this.errorPMsg = e.error.message;
        setTimeout(() => {
          this.errorPMsg = undefined
        }, 6000);
      })


    }


  }

  selectedClient
  selectClient(ev) {
    this.filterBody.page = 1

    this.p = 1
    this.selectedClient = ev ? ev._id : undefined
    this.filterBody.business = this.selectedClient
    this.filterUsers()
  }


  pickGroup(group) {

    this.filterBody.page = 1


    this.filterBody.group = group
    this.filterUsers()



  }
  changePage($event) {
    this.p = $event
    this.filterBody.page = $event
    this.filterUsers();

  }


  valueOfGroupChanged(ev) {
  
    var index = this.SubGroups.map(item => item._id).indexOf(ev.target.value)
    if (this.SubGroups[index]?.name == "Clients") {
      this.showCheckBoxes = true;


    } else {
      this.showCheckBoxes = false;
      this.addUserForm.patchValue({
        services: []
      })

    }

  }

  onCheckChange(ev) {
     
     var services = this.addUserForm.controls.services.value
    if (!this.checkIfServiceExist(ev.target.value)) {
      services.push(ev.target.value)
    } else {
      var index = services.indexOf(ev.target.value)
      services.splice(index, 1)
    }
    this.addUserForm.patchValue({
      services: services
    })
   }
  onCheckChange4update(ev) {
    var services = this.editUserForm.controls.services.value
    if (!this.checkIfServiceExist4Edit(ev.target.value)) {
      services.push(ev.target.value)
    } else {
      var index = services.indexOf(ev.target.value)
      services.splice(index, 1)
    }
    this.editUserForm.patchValue({
      services: services
    })
   }

  checkIfServiceExist4Edit(service) {
    return (this.editUserForm.controls.services.value.includes("" + service))
  }
  checkIfServiceExist(service) {
    return (this.addUserForm.controls.services.value && this.addUserForm.controls.services.value.includes(service))
  }

  showCheckBoxesInEditForm = false
  groupChangedInEditForm(ev) {

    var index = this.SubGroups.map(item => item._id).indexOf(ev)
    if (this.filterBody.group == "User") {
      this.showCheckBoxesInEditForm = true
    } else {
      this.showCheckBoxesInEditForm = false

    }
  }


  getAllBusinesses() {
    this.usersService.getAllBusiness().then(d => {
      this.businesses = d
    })
  }

}
