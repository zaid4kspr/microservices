import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ConciergerieService } from "./../conciergerie.service";
@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {
  total = 0;
  p: number = 1;
  today = new Date()
  datePickerConfig = {
    locale: "fr",
    firstDayOfWeek: "mo",
    format: "YYYY-MM-DD",
  }

  drivers = []

  filterBody = this.fb.group({
    day: [undefined, Validators.required],
    page: [this.p, Validators.required],
  });
  get f() {
    return this.filterBody.controls;
  }

  constructor(
    private fb: FormBuilder,
    private conciergerieService: ConciergerieService,
  ) { }

  ngOnInit(): void {
    this.filterBody.patchValue({
      day: this.today.toISOString().substring(0, 10)
    })
    this.getDriversData();

  }


  getDriversData() {
    this.conciergerieService.getDriversWorkingHours(this.filterBody.value).then(d => {
      this.drivers = d.docs
      this.total = d.totalDocs
    })
  }




  totalHours(item) {
    var total = 0;
    var workingHours = item.workingHours
    

    for (let index = 0; index < workingHours.length; index++) {
      if (workingHours[index].status == 6)
        total += (new Date(workingHours[index].endDate).getHours() - new Date(workingHours[index].startDate).getHours())

    }
    return total

  }


  dateChanged() {
    this.getDriversData()
  }

  changePage($event) {
    this.p = $event
    this.filterBody.patchValue({
      page: $event
    })


    this.getDriversData();

  }

}
