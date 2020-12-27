import { Component, OnInit, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';

import { BusinessService } from "./../business.service";
import { PushNotificationService } from "./../../../shared/push-notification.service";
import { AuthServiceZ } from "../../../authentification/auth-service.service";
import { Router } from "@angular/router";
import { SharedService } from "./../../../shared/shared.service";
import * as XLSX from 'xlsx';
import { Subject } from 'rxjs';
import { FormArray, FormBuilder, Validators } from '@angular/forms';

declare var $
@Component({
  selector: 'app-deliveries-requests',
  templateUrl: './deliveries-requests.component.html',
  styleUrls: ['./deliveries-requests.component.scss']
})
export class DeliveriesRequestsComponent implements OnInit {
  itemsPerPage = 25
  total
  money
  packingSlip
  errorPMsg
  selectedPackingSlip
  selectJobInHistoryModal
  p = 1
  showQrCode = true
  filterBody = {
    finalClientName: undefined,
    finalClientPhone: undefined,
    business: JSON.parse(localStorage.getItem("connectedAdmin")).user.business,
    page: 1,
    itemsPerPage: this.itemsPerPage,
    nid: undefined,
    selectedStatus: undefined
  }
  status = [
    {
      name: "En attente de livraison",
      active: false,
      value: [1, 2, 4]
    },
    {
      name: "Livraison en cours",
      active: false,
      value: [5, 10]
    },
    {
      name: "Commande livrée",
      active: false,
      value: [6]
    },
    {
      name: "Annulée par vendeur",
      active: false,
      value: [14]
    }, {
      name: "Retour provisoir",
      active: false,
      value: [15]
    },
    {
      name: "Retour définitif",
      active: false,
      value: [16]
    }, {
      name: "Retour vendeur",
      active: false,
      value: [17]
    }
  ]
  constructor(private businessService: BusinessService,
    private authService: AuthServiceZ,
    private router: Router,
    public sharedService: SharedService,
    private cdr: ChangeDetectorRef,
    private fb: FormBuilder,
    private pushNotificationService: PushNotificationService) {
    this.itemsPerPage = this.sharedService.itemsPerPage
  }
  ngOnInit(): void {
    this.getAllTherequests()

    this.pushNotificationService.refreshListOfDeliveryRequests.subscribe(d => {
      this.getAllTherequests()

    })

    this.businessService.jobToExchange = undefined;

  }

  getAllTherequests() {
    this.errorPMsg = undefined
    this.filterBody.itemsPerPage = this.sharedService.itemsPerPage
    this.businessService.filterAllpackingSlip(this.filterBody).then(d => {
      this.total = d.totalDocs
      this.packingSlip = d.docs
      this.cdr.detectChanges()
    }).catch(d => {
      this.errorPMsg = "Une erreur s'est produite. Veuillez essayer plus tard ou contactez-nous."
    });
    this.getHowMuchMoneyIOweIntigo()

  }

  changePage($event) {
    this.p = $event
    this.filterBody.page = $event
    this.getAllTherequests();

  }
  openPackingSlip(item) {
    this.showQrCode = true
    this.selectedPackingSlip = item.nid
    $('#bordereau').modal('show');
  }

  openOldPackingSlip(item) {
    this.showQrCode = false;
    this.selectedPackingSlip = item;
    $('#bordereau').modal('show');
  }
  openJobHistory(item) {

    this.selectJobInHistoryModal = item.dropOffjobRequest;
    $('#history').modal('show');

  }

  abortMission(mission) {
    this.businessService.updateDeliveryJobStatus(mission.pickUpjobRequest._id, 14)
      .then(d => {
        mission.status = 14
      })
    this.businessService.updateDeliveryJobStatus(mission.dropOffjobRequest._id, 14)
      .then(d => {
        mission.status = 14
      })
  }
  echanger(item) {

    this.router.navigate(['/business/livraison/add'], { queryParams: { isExchangeFor: item._id } })
  }
  onKey(ev) {
    this.filterBody.finalClientName = ev.target.value
    // this.filterBody.name = ev.target.value
    this.getAllTherequests()

  }
  onKeyTelPressed(ev) {
    this.filterBody.finalClientPhone = ev.target.value
    // this.filterBody.name = ev.target.value
    this.getAllTherequests()

  }

  edit(id) {
    this.router.navigate(['/business/livraison/edit'], { queryParams: { packToEdit: id } });

  }
  onBordereauxKey(ev) {
    this.filterBody.nid = ev.target.value
    // this.filterBody.name = ev.target.value

    this.p = 1
    this.getAllTherequests()

  }

  activeStatus(ev) {


    this.filterBody.selectedStatus = ev ? ev.value : 0
    this.p = 1
    this.getAllTherequests()
  }

  getHowMuchMoneyIOweIntigo() {
    this.businessService.getHowMuchMoneyIOweIntigo().then(d => {
      this.money = d.total
    })
  }



  keys: string[];
  dataSheet
  @ViewChild('inputFile') inputFile: ElementRef;
  isExcelFile: boolean;
  onChange(evt) {
    let data, header;
    const target: DataTransfer = <DataTransfer>(evt.target);
    this.isExcelFile = !!target.files[0].name.match(/(.xls|.xlsx)/);
    if (target.files.length > 1) {
      this.inputFile.nativeElement.value = '';
    }
    if (this.isExcelFile) {
      // this.spinnerEnabled = true;
      $('#xls').modal('show');

      const reader: FileReader = new FileReader();
      reader.onload = (e: any) => {
        /* read workbook */
        const bstr: string = e.target.result;
        const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

        /* grab first sheet */
        const wsname: string = wb.SheetNames[0];
        const ws: XLSX.WorkSheet = wb.Sheets[wsname];

        /* save data */
        data = XLSX.utils.sheet_to_json(ws);
      };

      reader.readAsBinaryString(target.files[0]);

      reader.onloadend = (e) => {
        // this.spinnerEnabled = false;
        this.keys = Object.keys(data[0]);
        this.dataSheet = (data)
        console.log(data[0]);

        // data 
        //patch Values and prepare the array
        this.keys.push("done")

        this.prepareArrayOfDeliveries()

      }
    } else {
      this.inputFile.nativeElement.value = '';
    }
  }

  removeData() {
    this.inputFile.nativeElement.value = '';
    // this.dataSheet = []
    // this.keys = [];
  }


  btnDisabled = true
  prepareArrayOfDeliveries(i = 0) {
    console.log(i);

    if (
      i == this.dataSheet.length
    ) {
      this.getAllTherequests()
      this.removeData()
      return;
    } else {

      var today = new Date()
      var tomorrow = new Date()
      tomorrow.setDate(today.getDate() + 1)


      this.dataSheet[i].DATE = tomorrow.toISOString().substring(0, 10)
      this.dataSheet[i]["done"] = false

      console.log(this.dataSheet);

      let requestDelivery = this.fb.group({
        pickUp: this.fb.group({
          longitude: [''],
          latitude: [''],
          pickUpAddress: ['', Validators.required],
          name: [''],
          exactPickUpAddress: [false, Validators.required],
        }),
        dropOff: this.fb.group({
          longitude: [''],
          latitude: [''],
          dropOffAddress: [''],
          exactDropOffAddress: [false, Validators.required],
          deliveredTo: this.fb.group({
            name: ['', Validators.required],
            email: ['', [Validators.maxLength(50), Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,10})+$/)]],
            phone: ['', Validators.required]
          })

        }),
        city: [undefined],
        subDivision: [undefined],
        addInfo: [''],
        descProduit: [''],
        when: ['2', Validators.required],
        amount: [undefined, Validators.required],
        business: [JSON.parse(localStorage.getItem("connectedAdmin")).user.business, Validators.required],
        createdBy: [JSON.parse(localStorage.getItem("connectedAdmin")).user?._id, Validators.required],
        paymentStatus: ['', Validators.required],
        packageSize: [1, Validators.required],
        status: [1, Validators.required],
        startDate: [tomorrow.toISOString().substring(0, 10), Validators.required],
        fromTo: ['08:00-12:00', Validators.required],
        endDate: [''],
        isExchangeFor: [''],
        addedInBackend: [false],


      });

      requestDelivery.patchValue({
        // startDate: tomorrow,
        pickUp: {
          pickUpAddress: this.dataSheet[i]["BOUTIQUE LUXOLOR"]
        },
        descProduit: this.dataSheet[i].article,
        dropOff: {
          dropOffAddress: this.dataSheet[i].Adresse + " " + this.dataSheet[i]["GOUVERNORAT"],
          deliveredTo: {
            name: this.dataSheet[i].client,
            phone: this.dataSheet[i].portable
          }
        },
        // city: this.dataSheet[i]["GOUVERNORAT"],
        // subDivision: this.dataSheet[i].Adresse,
        amount: this.dataSheet[i]["MONTANT TOTAL"],
        paymentStatus: this.dataSheet[i]["MONTANT TOTAL"] > 0 ? "2" : "1"
      })
      //  paymentStatus : 2 if  amount > 0
      if (requestDelivery.valid) {
        let reqBody = Object.assign({}, requestDelivery.value)
        let endTime = Number(requestDelivery.controls.fromTo.value.substr(0, 2)) + 4;


        let t1 = new Date(requestDelivery.controls.startDate.value + 'T' + requestDelivery.controls.fromTo.value.substr(0, 2) + ':00:00')
        let t2 = new Date(requestDelivery.controls.startDate.value + 'T' + endTime + ':00:00')


        reqBody.startDate = t1
        reqBody.endDate = t2


        console.log(i);


        this.businessService.addDeliveryRequest(reqBody).then(d => {
          this.dataSheet[i]["done"] = true
          this.prepareArrayOfDeliveries(i + 1)

          if (i == this.dataSheet.length - 1) {
            this.btnDisabled = false
          }
        }).catch(err => {
          this.dataSheet[i]["done"] = false
          this.prepareArrayOfDeliveries(i + 1)

          if (i == this.dataSheet.length - 1) {
            this.btnDisabled = false
          }

        })


      } else {
        console.log(requestDelivery.value);
        this.prepareArrayOfDeliveries(i + 1)

      }

    }
  }



}
