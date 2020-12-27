import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { SharedModalService } from "./../shared-modal.service";
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-job-request-history',
  templateUrl: './job-request-history.component.html',
  styleUrls: ['./job-request-history.component.scss']
})
export class JobRequestHistoryComponent implements OnChanges {
  @Input() job;
  pickUpJobHistory = []
  currentJobHistory = []
  currentJobActionHistory = []

  ngOnChanges() {
    // changes.prop contains the old and the new value...
    this.currentJobHistory = []
    if (this.job?._id) {
      this.getHistoryForAJob(this.job._id);
      this.getActionHistoryForAJob(this.job._id);

    }


  }
  constructor(
    public sharedModalService: SharedModalService,
    public router: Router

  ) { }

  ngOnInit(): void {

  }


  getHistoryForAJob(jobId) {
    var query = {
      jobRequest: jobId
    }
    var populate = [{ "path": "jobRequest", populate: { path: "createdBy", select: "name" } }, { "path": "driver", "select": "name" }, { "path": "oldDriver", "select": "name" }, { "path": "newDriver", "select": "name" }, { "path": "actionDoneBy", "select": "name" }]
    this.sharedModalService.getJobRequestHistory(query, populate).then(d => {
      this.currentJobHistory = d.body
    }).then(d => {

      if (this.job.pickUpJob) {
        var populate = [{ "path": "jobRequest", populate: { path: "createdBy", select: "name" } }, { "path": "driver", "select": "name" }, { "path": "oldDriver", "select": "name" }, { "path": "newDriver", "select": "name" }, { "path": "actionDoneBy", "select": "name" }]
        var query = {
          jobRequest: this.job.pickUpJob
        }
        this.sharedModalService.getJobRequestHistory(query, populate).then(d => {
          for (let index = 0; index < d.body.length; index++) {
            this.currentJobHistory.unshift(d.body[(d.body.length - 1) - index])

          }
        })
      }

    })
  }


  getActionHistoryForAJob(jobId) {
    var query = {
      jobRequest: jobId
    }
    var populate = [{ "path": "jobRequest" }, { "path": "business" }, { "path": "driver", "select": "name" }, { "path": "admin", "select": "name" },]
    this.sharedModalService.getJobRequestActionHistory(query, populate).then(d => {
      this.currentJobActionHistory = d
    }).then(d => {

      if (this.job.pickUpJob) {
        var populate = [{ "path": "jobRequest" }, { "path": "business" }, { "path": "driver", "select": "name" }, { "path": "admin", "select": "name" }]
        var query = {
          jobRequest: this.job.pickUpJob
        }
        this.sharedModalService.getJobRequestActionHistory(query, populate).then(d => {
          for (let index = 0; index < d.length; index++) {
            this.currentJobActionHistory.unshift(d[(d.length - 1) - index])

          }
        })
      }

    })
  }




}
