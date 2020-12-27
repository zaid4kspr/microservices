import { Injectable } from '@angular/core';
import {
  HttpClient
} from '@angular/common/http';
import { environment } from './../../../environments/environment';
@Injectable()
export class BusinessService {
  public gouvernorats = [
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

  jobToExchange = undefined

  constructor(private httpClient: HttpClient) { }

  addDeliveryRequest(deliveryRequest): any {
    return this.httpClient
      .post(environment.api.deliveryRequest, deliveryRequest)
      .toPromise()
      .catch(this.handleError);
  }
  addExpressDeliveryRequest(deliveryRequest): any {
    return this.httpClient
      .post(environment.api.deliveryRequest + "/express", deliveryRequest)
      .toPromise()
      .catch(this.handleError);
  }

  addconciergerieRequest(conciergerieRequest): any {
    return this.httpClient
      .post(environment.api.conciergerieRequest, conciergerieRequest)
      .toPromise()

  }
  updateDeliveryJobStatus(id, status): any {
    return this.httpClient
      .put(environment.api.deliveryRequest + "/updateStatus/" + id, { status })
      .toPromise()

  }
  editPack(body): any {
    return this.httpClient
      .put(environment.api.packingSlip, body)
      .toPromise()

  }
  getMyPickUpPoints(query): any {
    return this.httpClient
      .get(environment.api.pickUp + "?query=" + query)
      .toPromise()
      .catch(this.handleError);
  }

  getAllDrivers(s = null): any {

  
    return this.httpClient
      .get(environment.api.user + "/alldrivers/" + s)
      .toPromise()

  }

  getAllTheDeliveryRequest(query, populate, page): any {


    var skip = (page - 1) * 10;
    var limit = 10;
    return this.httpClient
      .get(environment.api.deliveryRequest + "?sort=-createdAt" + "&populate=" + populate + "&query=" + query + '&skip=' + skip + "&limit=" + limit, { observe: 'response' })
      .toPromise()

  }
  getAllTheConciergerieRequest4Client(query, populate, page): any {


    var skip = (page - 1) * 10;
    var limit = 10;
    return this.httpClient
      .get(environment.api.deliveryRequest + "?sort=-createdAt&query=" + JSON.stringify(query) + "&populate=" + populate + '&skip=' + skip + "&limit=" + limit, { observe: 'response' })
      .toPromise()
      .catch(this.handleError);
  }
  getAllpackingSlip(query, populate, page): any {
    var skip = (page - 1) * 10;
    var limit = 10;
    return this.httpClient
      .get(environment.api.packingSlip + "?sort=-updatedAt&query=" + query + "&populate=" + populate + '&skip=' + skip + "&limit=" + limit, { observe: 'response' })
      .toPromise()

  }
  filterAllpackingSlip(reqBody): any {

    return this.httpClient
      .post(environment.api.packingSlip, reqBody)
      .toPromise()

  }
  getStats(): any {
    if (localStorage.getItem("connectedAdmin") && JSON.parse(localStorage.getItem("connectedAdmin")).user.business) {
      return this.httpClient
        .get(environment.api.serverUrl + "/stats/client" + "?businessId=" + JSON.parse(localStorage.getItem("connectedAdmin")).user.business)
        .toPromise()

    }
  }

  getHowMuchMoneyIOweIntigo(): any {
    if (localStorage.getItem("connectedAdmin") && JSON.parse(localStorage.getItem("connectedAdmin")).user.business) {
      return this.httpClient
        .get(environment.api.serverUrl + "/deliveryrequest/partnerMoney/"+ JSON.parse(localStorage.getItem("connectedAdmin")).user.business)
        .toPromise()

    }
  }

  private handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response || error) {
      console.log(error);

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
