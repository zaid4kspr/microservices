import { Injectable } from '@angular/core';
import {
  HttpClient
} from '@angular/common/http';
import { environment } from './../../environments/environment';
import { AuthServiceZ } from './../authentification/auth-service.service';


@Injectable({
  providedIn: 'root'
})
export class SharedService {

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

  user
  itemsPerPage = 50
  constructor(private httpClient: HttpClient, private authServiceZ: AuthServiceZ) {
    this.getMyProfileNow();

    if (localStorage.getItem("itemsPerPage")) {
      this.itemsPerPage = parseInt(localStorage.getItem("itemsPerPage"))
    }



  }

  updateApiKey(id): any {
    return this.httpClient.post(environment.api.business + '/updateapikey',{id:id})
      .toPromise();
  }

  updateNumberOfItemPerPage() {
 
    localStorage.setItem("itemsPerPage", this.itemsPerPage + "")
  }

  getMySubGroup(): any {
    return this.httpClient
      .get(environment.api.group + '/subGroups')
      .toPromise()
      .catch(this.handleError);
  }

  getMyProfile(id): any {
    return this.httpClient
      .get(environment.api.user + '/users/' + this.authServiceZ.credentials.user._id + '/' + this.authServiceZ.credentials.user.userType)
      .toPromise()
      .catch(this.handleError);
  }

  getMyProfileNow(): any {
    if (this.authServiceZ.credentials) {
      return this.httpClient
        .get(environment.api.user + '/users/' + this.authServiceZ.credentials.user._id + '/' + this.authServiceZ.credentials.user.userType)
        .toPromise().then(d => {
          this.user = d
          if (d["regions"] && d["regions"].length > 1)
            this.gouvernorats = d["regions"]

        })
    }
  }

  updateProfileUser(user): any {
    return this.httpClient
      .put(environment.api.user + "/users/" + user._id, user)
      .toPromise()
      .catch(this.handleError);
  }
  updateProfileAdmin(user): any {
    return this.httpClient
      .put(environment.api.user + "/admins/" + user._id, user)
      .toPromise()
      .catch(this.handleError);
  }

  addGroup(group): any {
    return this.httpClient
      .post(environment.api.group, group)
      .toPromise()
      .catch(this.handleError);
  }

  getBusiness(business): any {
    return this.httpClient
      .get(environment.api.business + "/" + business)
      .toPromise()
      .catch(this.handleError);
  }
  updateBusiness(business): any {
    return this.httpClient
      .put(environment.api.business + "/" + business._id, business)
      .toPromise()
      .catch(this.handleError);
  }


  addBusiness(business): any {
    return this.httpClient
      .post(environment.api.business, business)
      .toPromise()
      .catch(this.handleError);
  }
  updatejobDropOffPosition(id, body): any {
    return this.httpClient
      .put(environment.api.deliveryRequest + "/updateDropOff/" + id, body)
      .toPromise()
  }
  updateDropOffAddress(id, body): any {
    return this.httpClient
      .post(environment.api.deliveryRequest + "/updatedropoffaddress/" + id, body)
      .toPromise()
  }
  updatePickUpAddress(id, body): any {
    return this.httpClient
      .post(environment.api.deliveryRequest + "/updatepickupaddress/" + id, body)
      .toPromise()
  }

  editGroup(group): any {
    return this.httpClient
      .put(environment.api.group + "/" + group._id, group)
      .toPromise()
      .catch(this.handleError);
  }

  getAllPermissions(): any {
    return this.httpClient
      .get(environment.api.permission)
      .toPromise()
      .catch(this.handleError);
  }


  getDriverPositionForAspeceficConciergerie(query) {
    return this.httpClient
      .get(environment.api.jobPositions + "?sort=-createdAt&query=" + JSON.stringify(query))
      .toPromise()
      .catch(this.handleError);
  }
  getJourneyById(query): any {
    var populate = [{ "path": "jobRequests", "populate": [{ path: "dropOff" }] }]


    return this.httpClient
      .post(environment.api.serverUrl + "/lastPosition/driverJourney" ,query) 
      .toPromise()
      .catch(this.handleError);
  }

  getDeliveryRequest(id) {
    var query = {
      _id: id
    }
    var populate = [{ "path": "business" }, { "path": "createdBy" }, { "path": "pickUp" }, { "path": "dropOff" }, { "path": "driver" }]

    return this.httpClient
      .get(environment.api.deliveryRequest + "?sort=-createdAt&query=" + JSON.stringify(query) + "&populate=" + JSON.stringify(populate))
      .toPromise()
      .catch(this.handleError);
  }

  timeDiffCalc(dateFuture) {
    var dateNow = new Date()
    dateFuture = new Date(dateFuture)

    let diffInMilliSeconds = Math.abs(dateNow.getTime() - dateFuture.getTime()) / 1000;
 

    // calculate days
    const days = Math.floor(diffInMilliSeconds / 86400);
    diffInMilliSeconds -= days * 86400;
 
    // calculate hours
    const hours = Math.floor(diffInMilliSeconds / 3600) % 24;
    diffInMilliSeconds -= hours * 3600;
 
    // calculate minutes
    const minutes = Math.floor(diffInMilliSeconds / 60) % 60;
    diffInMilliSeconds -= minutes * 60;
 
    let difference = '';
    if (days > 0) {
      difference += (days === 1) ? `${days} day, ` : `${days} days, `;
    }
    if (hours > 0) {
      difference += (hours === 0 || hours === 1) ? `${hours} hour, ` : `${hours} hours, `;

    }

    difference += (minutes === 0 || hours === 1) ? `${minutes} minutes` : `${minutes} minutes`;

    return {
      days: days,
      hours: hours,
      minutes: minutes,
      differenceStr: difference

    };
  }


  private handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response || error) {
      const body = error.json() || '';
      const err = JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Promise.reject(errMsg);
  }
}
