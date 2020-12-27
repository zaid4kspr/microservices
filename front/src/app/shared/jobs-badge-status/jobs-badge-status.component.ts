import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-jobs-badge-status',
  templateUrl: './jobs-badge-status.component.html',
  styleUrls: ['./jobs-badge-status.component.scss']
})
export class JobsBadgeStatusComponent implements OnInit {
  @Input() status
  @Input() item
  @Input() status4Partner=null
  // 1 new 
  // 2 assigned 
  // 3 accepted by driver 
  // 4 declined by driver
  // 5 start the job
  // 6 finish the job
  // 7 decline after accepting
  // 8 decline by the admin 
  // 9 unsuccessful ( retour au magasin ) scanned by amen xD
  // 10 pickedUp
  // 11 no pickup address
  // 12 no dropoff address
  // 13 no pickup and dropoff addresses
  // 14 declined by client
  // 15 driver failed to deliver
  // 16 retour definitif 
  // 17 retour au client


  constructor() { }

  ngOnInit(): void {
  }

}
