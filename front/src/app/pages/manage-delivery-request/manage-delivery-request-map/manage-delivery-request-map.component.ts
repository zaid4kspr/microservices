import { Component, ViewChild, OnInit, ChangeDetectorRef } from '@angular/core';
import { ManageDeliveryService } from "./../manage-delivery.service";
import { PushNotificationService } from "./../../../shared/push-notification.service";
import { ActivatedRoute } from '@angular/router';


declare const google: any;
declare const $: any;
@Component({
  selector: 'app-manage-delivery-request-map',
  templateUrl: './manage-delivery-request-map.component.html',
  styleUrls: ['./manage-delivery-request-map.component.scss']
})
export class ManageDeliveryRequestMapComponent implements OnInit {
  lat = 20.5937;
  lng = 78.9629;
  pointList: { lat: number; lng: number }[] = [];
  drawingManager: any;
  selectedShape: any;
  selectedArea = 0;
  deliveryRequests = []
  zoom = 8
  drivers = []
  listOfSelectedJobs = []
  jbRequestHistory = null
  selectedDriver
  updateDrivermInModal = {
    driver: undefined,
    deliveryRequest: undefined
  }

  selectedSatus
  jobType

  status = [
    {
      name: "NEW",
      value: 1
    }, {
      name: "ASSIGNED",
      value: 2
    }, {
      name: "ACCEPTED",
      value: 3
    }, {
      name: "DECLINED",
      value: 4
    }, {
      name: "STARTED",
      value: 5
    }, {
      name: "FINISHED",
      value: 6
    }, {
      name: "DECLINED_LAST_MINUTE",
      value: 7
    }, {
      name: "DECLINED_BY_ADMIN",
      value: 8
    }, {
      name: "PICKED_UP",
      value: 10
    },
    {
      name: "FROM08TO12",
      value: "08:00-12:00"
    },
    {
      name: "FROM12TO16",
      value: "12:00-16:00"
    },
    {
      name: "FROM16TO20",
      value: "16:00-20:00"
    }
  ]

  iconFrom = {
    url: './../../../../assets/img/mapIcons/p.png',
    scaledSize: {
      width: 35,
      height: 35
    }
  }
  iconFromwithDriver = {
    url: './../../../../assets/img/mapIcons/pwithc.png',
    scaledSize: {
      width: 35,
      height: 35
    }
  }
  iconTo = {
    url: './../../../../assets/img/mapIcons/d.png',
    scaledSize: {
      width: 35,
      height: 35
    }
  }
  iconReturn = {
    url: './../../../../assets/img/mapIcons/return.png',
    scaledSize: {
      width: 35,
      height: 35
    }
  }
  iconToWithDriver = {
    url: './../../../../assets/img/mapIcons/dwithc.png',
    scaledSize: {
      width: 35,
      height: 35
    }

  }

  constructor(
    private manageDeliveryService: ManageDeliveryService,
    private cdr: ChangeDetectorRef,
    private pushNotificationService: PushNotificationService,
    private activeroute: ActivatedRoute,

  ) { }

  ngOnInit() {

    this.activeroute.params
      .subscribe(params => {

        this.jobType = params.jobType
        this.getDeliveryRequests();
      })


    // this.getDeliveryRequests();

    this.setCurrentPosition();
    this.getAllTheDrivers();


    this.pushNotificationService.refreshListOfDeliveryRequests.subscribe(d => {
      this.getDeliveryRequests();

      if (this.jbRequestHistory) {
        this.jbRequestHistory = undefined
        this.openedWindow = undefined;

      }

    })

  }

  onMapReady(map) {
    this.initDrawingManager(map);
  }

  initDrawingManager = (map: any) => {
    const self = this;
    const options = {
      drawingControl: true,
      drawingControlOptions: {
        drawingModes: ['polygon'],
      },
      polygonOptions: {
        draggable: true,
        editable: true,
      },
      drawingMode: google.maps.drawing.OverlayType.POLYGON,
    };
    this.drawingManager = new google.maps.drawing.DrawingManager(options);
    this.drawingManager.setMap(map);
    google.maps.event.addListener(
      this.drawingManager,
      'overlaycomplete',
      (event) => {
        if (event.type === google.maps.drawing.OverlayType.POLYGON) {
          const paths = event.overlay.getPaths();
          for (let p = 0; p < paths.getLength(); p++) {
            google.maps.event.addListener(
              paths.getAt(p),
              'set_at',
              () => {

                if (!event.overlay.drag) {
                  self.updatePointList(event.overlay.getPath());
                }
              }
            );
            google.maps.event.addListener(
              paths.getAt(p),
              'insert_at',
              () => {

                self.updatePointList(event.overlay.getPath());
              }
            );
            google.maps.event.addListener(
              paths.getAt(p),
              'remove_at',
              () => {

                self.updatePointList(event.overlay.getPath());
              }
            );
          }

          self.updatePointList(event.overlay.getPath());
        }
        if (event.type !== google.maps.drawing.OverlayType.MARKER) {
          // Switch back to non-drawing mode after drawing a shape.
          self.drawingManager.setDrawingMode(null);
          // To hide:
          self.drawingManager.setOptions({
            drawingControl: false,
          });

          // set selected shape object
          const newShape = event.overlay;
          newShape.type = event.type;
          this.setSelection(newShape);

        }
      }
    );

    google.maps.Polygon.prototype.Contains = function (point) {
      var crossings = 0,
        path = this.getPath();

      // for each edge
      for (var i = 0; i < path.getLength(); i++) {
        var a = path.getAt(i),
          j = i + 1;
        if (j >= path.getLength()) {
          j = 0;
        }
        var b = path.getAt(j);
        if (rayCrossesSegment(point, a, b)) {
          crossings++;
        }
      }

      // odd number of crossings?
      return (crossings % 2 == 1);

      function rayCrossesSegment(point, a, b) {
        var px = point.lng(),
          py = point.lat(),
          ax = a.lng(),
          ay = a.lat(),
          bx = b.lng(),
          by = b.lat();
        if (ay > by) {
          ax = b.lng();
          ay = b.lat();
          bx = a.lng();
          by = a.lat();
        }
        // alter longitude to cater for 180 degree crossings
        if (px < 0) {
          px += 360;
        }
        if (ax < 0) {
          ax += 360;
        }
        if (bx < 0) {
          bx += 360;
        }

        if (py == ay || py == by) py += 0.00000001;
        if ((py > by || py < ay) || (px > Math.max(ax, bx))) return false;
        if (px < Math.min(ax, bx)) return true;

        var red = (ax != bx) ? ((by - ay) / (bx - ax)) : Infinity;
        var blue = (ax != px) ? ((py - ay) / (px - ax)) : Infinity;
        return (blue >= red);

      }

    }

  }
  private setCurrentPosition() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
      });
    }
  }
  clearSelection() {
    if (this.selectedShape) {
      this.selectedShape.setEditable(false);
      this.selectedShape = null;
      this.pointList = [];
    }
  }
  setSelection(shape) {
    this.clearSelection();
    this.selectedShape = shape;
    shape.setEditable(true);
  }

  deleteSelectedShape() {
    if (this.selectedShape) {
      this.selectedShape.setMap(null);
      this.selectedArea = 0;
      this.pointList = [];
      this.listOfSelectedJobs = [];
      // To show:
      this.drawingManager.setOptions({
        drawingControl: true,
      });
      this.cdr.detectChanges()
    }
  }

  updatePointList(path) {
    this.pointList = [];

    const len = path.getLength();
    for (let i = 0; i < len; i++) {
      this.pointList.push(
        path.getAt(i).toJSON()
      );
    }
    this.selectedArea = google.maps.geometry.spherical.computeArea(
      path
    );
    var polygon = new google.maps.Polygon({ path: this.pointList });
    this.listOfSelectedJobs = []
    for (let index = 0; index < this.deliveryRequests.length; index++) {

      var point = new google.maps.LatLng(this.deliveryRequests[index].latitude, this.deliveryRequests[index].longitude);
      if (polygon.Contains(point) && !this.deliveryRequests[index].driver) {
        // point is inside polygon
        this.listOfSelectedJobs.push(this.deliveryRequests[index])
      }
    }

    this.cdr.detectChanges();
  }

  getDeliveryRequests() {
    var query = {
      jobType: this.jobType,
      service: 2,
      status: []
    }
    query["status"] = [{ "status": 1 }, { "status": 2 }, { "status": 3 }, { "status": 4 }, { "status": 5 }, { "status": 7 }, { "status": 10 }];
    if (this.selectedSatus?.length) {

      query["status"] = []
      query["fromTo"] = []

      for (let index = 0; index < this.selectedSatus.length; index++) {
        if ([1, 2, 3, 4, 5, 6, 7, 8, 10].includes(this.selectedSatus[index])) {
          query["status"].push({ "status": this.selectedSatus[index] })
        }
        else {
          query["status"].push({ "fromTo": this.selectedSatus[index] });
        }

      }
    }
    this.manageDeliveryService.filterDeliveryRequestV1(query).then(d => {
      this.deliveryRequests = []
      for (let index = 0; index < d.length; index++) {
        this.deliveryRequests.push(this.extractGeoInfoFromJobRequest(d[index]))
      }
      this.cdr.detectChanges();
    })
  }


  extractGeoInfoFromJobRequest(job) {
    var jobRequest = {

    }
    jobRequest = job

    if (!job.pickUpJob) {
      //this is a pick up job request
      if (job?.pickUp?.geoLocation?.coordinates?.length) {
        jobRequest["type"] = 1
        jobRequest["longitude"] = job.pickUp.geoLocation.coordinates[0]
        jobRequest["latitude"] = job.pickUp.geoLocation.coordinates[1]
        jobRequest["address"] = job.pickUp.pickUpAddress
      }
    } else {
      //this is a dropOff
      if (job.dropOff?.geoLocation?.coordinates?.length) {
        jobRequest["type"] = 2
        jobRequest["longitude"] = job.dropOff.geoLocation.coordinates[0]
        jobRequest["latitude"] = job.dropOff.geoLocation.coordinates[1]
        jobRequest["address"] = job.dropOff.dropOffAddress
      }
    }
    jobRequest["selected"] = false;
    return jobRequest;

  }


  selectAllDeliveryJobs(ev) {


    for (let index = 0; index < this.listOfSelectedJobs.length; index++) {
      if (ev.currentTarget.checked) {
        this.listOfSelectedJobs[index].selected = true;
      } else {
        this.listOfSelectedJobs[index].selected = false;
      }

    }


  }

  assignDriver() {
    $('#assignDriver').modal('show');
  }


  driverChange() {
  }

  getAllTheDrivers() {
    this.manageDeliveryService.getAllDrivers("2").then(d => {
      this.drivers = d
    })
  }

  assignBtnDisabled() {
    var res = false
    for (let index = 0; index < this.listOfSelectedJobs.length; index++) {

      if (this.listOfSelectedJobs[index].selected) {
        res = true;
        break;
      }


    }
    return res;
  }


  assignDriverToJobs() {
    var RequestArray = []
    var j = 0
    if (this.selectedDriver) {
      for (let index = 0; index < this.listOfSelectedJobs.length; index++) {
        if (this.listOfSelectedJobs[index].selected) {

          RequestArray.push(this.listOfSelectedJobs[index])
          RequestArray[j].driver = this.selectedDriver;
          RequestArray[j].status = 2

          j++;
        }
      }

      this.manageDeliveryService.assignDriver2Delivery({ deliveryRequests: RequestArray }).then(d => {
        this.selectedDriver = undefined
        $('#assignDriver').modal('toggle');
        this.deleteSelectedShape();
      })
    }

  }


  openedWindow: String; // alternative: array of numbers
  openWindow(item) {
    this.jbRequestHistory = undefined
    this.openedWindow = item._id; // alternative: push to array of numbers
    if (item.driver || item.pickUpJob)
      this.jbRequestHistory = item

  }
  isInfoWindowOpen(item) {
    return this.openedWindow == item._id; // alternative: check if id is in array
  }
  hideInfo() {
    this.openedWindow = undefined
    //  this.jbRequestHistory = undefined

  }

  updateDriver(deliveryRequest) {
    if (deliveryRequest.driver) {
      $('#updateDriver').modal('show');
      this.updateDrivermInModal = {
        driver: deliveryRequest.driver,
        deliveryRequest: deliveryRequest
      }
    }

  }
  saveUpdateJobRequest() {
    var temp = {
      driver: this.updateDrivermInModal.driver._id,
      deliveryRequest: this.updateDrivermInModal.deliveryRequest._id,
    }
    this.manageDeliveryService.updateDeliveryRequestDriver(temp).then(d => {
      this.updateDrivermInModal.deliveryRequest = undefined
      this.updateDrivermInModal.driver = undefined
      this.deliveryRequests.forEach(dr => {


        if (dr._id == d.resultat._id) {
          dr.driver = d.resultat.driver
        }
      })
      $('#updateDriver').modal('toggle');
      this.deleteSelectedShape();
    })
  }




}
