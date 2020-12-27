import { Component, OnInit } from '@angular/core';

import { Location, Appearance } from '@angular-material-extensions/google-maps-autocomplete';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthServiceZ } from "../../../authentification/auth-service.service";
import { BusinessService } from "../business.service";
import { Router } from "@angular/router";

import PlaceResult = google.maps.places.PlaceResult;
import { isNgTemplate } from '@angular/compiler';
declare var $: any

@Component({
  selector: 'app-livraison',
  templateUrl: './livraison-express.component.html',
  styleUrls: ['./livraison-express.component.scss']
})
export class LivraisonExpressComponent implements OnInit {
  pname
  pnameError = false;
  submitted = false
  zoom = 9
  latitude
  longitude
  showAmount = false
  today = new Date()
  datePickerConfig = {
    locale: "fr",
    firstDayOfWeek: "mo",
    format: "YYYY-MM-DD",
    min: this.today.toISOString()
  }
  requestDelivery
  public selectedAddress: PlaceResult;
  pickUpSelectInput
  pickUpForm
  boxSize = [1, 0, 0, 0, 0];
  oldPickUpPoints = [];
  showNewPickUpInputField = false;
  iconFrom = {
    url: './../../../../assets/img/mapIcons/marker.png',
    scaledSize: {
      width: 30,
      height: 30
    }
  }
  iconTo = {
    url: './../../../../assets/img/mapIcons/map.png',
    scaledSize: {
      width: 30,
      height: 30
    }
  }
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
    }



  ]
  disableSendBtn = false


  selectedDivision = 0
  constructor(private fb: FormBuilder,
    private authService: AuthServiceZ,
    private businessService: BusinessService,
    private router: Router

  ) {

  }

  ngOnInit(): void {
    this.getMyPickUpsPoint();
    this.setCurrentPosition();
    this.creatRequestDeliveryForm();
    this.getAllDrivers() 
  }

  private setCurrentPosition() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude - 1;

      });
    }
  }


  onPickUpAutocompleteSelected(result: PlaceResult) {
    this.requestDelivery.patchValue({
      pickUp: {
        pickUpAddress: result.name + ", " + result.formatted_address,
      }
    })
  }
  onDropOffAutocompleteSelected(result: PlaceResult) {
    this.requestDelivery.patchValue({
      dropOff: {
        dropOffAddress: result.name + ", " + result.formatted_address,
      }
    })
  }

  onPickUpLocationSelected(location: Location) {
    this.latitude = location.latitude;
    this.longitude = location.longitude;
    this.requestDelivery.patchValue({

      pickUp: {
        latitude: location.latitude,
        longitude: location.longitude
      },


    })
  }
  onDropOffLocationSelected(location: Location) {
    this.latitude = location.latitude;
    this.longitude = location.longitude;
    this.requestDelivery.patchValue({

      dropOff: {
        latitude: location.latitude,
        longitude: location.longitude
      },


    })
  }
  showAmountBox() {
    this.showAmount = true
  }

  creatRequestDeliveryForm() {

    this.requestDelivery = this.fb.group({
      pickUp: this.fb.group({
        _id: [''],
        longitude: ['', Validators.required],
        latitude: ['', Validators.required],
        pickUpAddress: ['', Validators.required],
        name: [''],
      }),
      dropOff: this.fb.group({
        longitude: [''],
        latitude: [''],
        dropOffAddress: [''],

        deliveredTo: this.fb.group({
          name: ['', Validators.required],
          email: ['', [Validators.maxLength(50), Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,10})+$/)]],
          phone: ['', Validators.required]
        })

      }),
      city: ["", Validators.required],
      subDivision: ["", Validators.required],
      addInfo: [''],

      when: ['2', Validators.required],
      amount: [undefined, Validators.required],
      business: [JSON.parse(localStorage.getItem("connectedAdmin")).user.business, Validators.required],
      createdBy: [this.authService?.credentials?.user?._id, Validators.required],
      paymentStatus: ['', Validators.required],
      packageSize: [undefined, Validators.required],
      status: [1, Validators.required],
      startDate: [new Date(), Validators.required],
      fromTo: [''],
      endDate: [''],
      driver: [undefined],

    });
  }

  selectBoxSize(size) {
    this.boxSize = [0, 0, 0, 0, 0];
    this.boxSize[size] = 1;
  }




  getMyPickUpsPoint() {
    var query = {
      createdBy: this.authService.credentials.user._id
    }
    this.businessService.getMyPickUpPoints(JSON.stringify(query)).then(d => {
      this.oldPickUpPoints = d
    })
  }

  showNewPickUpInput(event) {



    if (event.target.value == 1) {
      this.showNewPickUpInputField = !this.showNewPickUpInputField
      this.requestDelivery.patchValue({
        pickUp: {
          _id: '',
          longitude: '',
          latitude: '',
          pickUpAddress: '',
        }
      })
    } else {




      var index = event.target.value - 2


      // this.oldPickUpPoints.map(item => item.pickUpAddress).indexOf(event.target.value);


      var temp = this.oldPickUpPoints[index]
      if (temp.name) {
        this.requestDelivery.patchValue({
          pickUp: {
            speceficName: true,
            name: temp.name
          }
        })
      } else {
        this.requestDelivery.patchValue({
          pickUp: {
            speceficName: false,
            name: ''
          }
        })
      }

      this.requestDelivery.patchValue({
        pickUp: {
          _id: temp?._id,
          longitude: temp?.geoLocation.coordinates[0],
          latitude: temp?.geoLocation.coordinates[1],
          pickUpAddress: temp?.pickUpAddress,
          name: temp?.name
        }
      })

    }


  }


  saveRequestDelivery() {



    this.submitted = true
    var today = new Date()
    var tomorrow = new Date()
    tomorrow.setDate(today.getDate() + 1)

    this.requestDelivery.patchValue({
      packageSize: (this.boxSize.indexOf(1)) + 1,
    })

    if (this.requestDelivery.controls.when.value == 1) {
      this.requestDelivery.patchValue({
        when: today,
      })
    } else {
      this.requestDelivery.patchValue({
        when: tomorrow,
      })
    }

    if (this.requestDelivery.controls.paymentStatus.value == 1) {
      this.requestDelivery.patchValue({
        amount: 0,
      })
    }

    this.requestDelivery.patchValue({
      when: '2',
    })

 

    let reqBody = Object.assign({}, this.requestDelivery.value)
    let endTime = Number(this.requestDelivery.controls.fromTo.value.substr(0, 2)) + 4;


    let t1 = new Date()
    let t2 = new Date(this.requestDelivery.controls.startDate.value + 'T' + endTime + ':00:00')


    reqBody.startDate = t1
    reqBody.endDate = t2


    if (this.requestDelivery.valid) {


      this.disableSendBtn = true



      this.businessService.addExpressDeliveryRequest(reqBody).then(d => {

        var dropOffJobRequest = this.requestDelivery.value
        dropOffJobRequest["pickUp"] = undefined
        dropOffJobRequest["pickUpJob"] = d._id

        this.router.navigate(['/business/express'])
      }).catch(err => {
        this.disableSendBtn = false

      })

    }



  }

  get f() { return this.requestDelivery.controls; }


  choosePickUpDate(pickUp) {

  }




  startTimeSet(event) {
    if (this.f.endTime.value) {
      let startTime = new Date();
      let endTime = new Date();
   

      startTime.setHours(event.substring(0, 2))
      startTime.setMinutes(event.substring(3, 5))

      endTime.setHours(this.f.endTime.value.substring(0, 2))
      endTime.setMinutes(this.f.endTime.value.substring(3, 5))

      if (startTime > endTime) {
        this.requestDelivery.patchValue({
          endTime: undefined
        })

      }

    }


  }

  cityChanged(event) {
    return this.selectedDivision = this.gouvernorats.map(item => item.division).indexOf(this.f.city.value)

  }

  pickUpInputChanged(event) {

    this.requestDelivery.patchValue({
      pickUp: {
        pickUpAddress: event.target.value
      }
    })
    if (event.target.value == "") {
      this.requestDelivery.patchValue({
        pickUp: {
          pickUpAddress: event.target.value,
          longitude: '',
          latitude: '',
          _id: '',
          name: ''
        }
      })
    }

  }

  dropOffInputChanged(event) {
    this.requestDelivery.patchValue({
      dropOff: {
        dropOffAddress: event.target.value
      }
    })
    if (event.target.value == "") {
      this.requestDelivery.patchValue({
        dropOff: {
          dropOffAddress: event.target.value,
          longitude: '',
          latitude: '',
          _id: '',
          name: ''
        }
      })
    }

  }


  savePickUpName($event) {
    if (!this.pname) {
      this.pnameError = true;
    }
    else {
      this.requestDelivery.controls.pickUp.controls.name.value = this.pname;
      this.requestDelivery.patchValue({
        pickUp: {
          name: this.pname
        }
      });

      this.pnameError = false;
      $('#pickUpNameModal').modal('hide');

    }

  }


  openPickUpNameModal(event) {
    if (event.target.value) {
      setTimeout(() => {
        let pickUpAddress = this.requestDelivery.controls.pickUp.controls.pickUpAddress.value;
        if (pickUpAddress) {
          this.pnameError = false;
          $('#pickUpNameModal').modal('show');
        }

      }, 400)

    }
    else {

      this.requestDelivery.patchValue({
        pickUp: {
          pickUpAddress: "",
          latitude: "",
          longitude: "",
          name: ""
        }
      })
      this.requestDelivery.controls.pickUp.controls.name.value = "";

    }

  }
  drivers = []
  getAllDrivers() {
    // 3 for delivery express service
    this.businessService.getAllDrivers(3).then(d => {
      this.drivers = d
    })
  }

}


