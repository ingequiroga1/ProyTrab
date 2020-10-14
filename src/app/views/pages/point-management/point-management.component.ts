import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'kt-point-management',
  templateUrl: './point-management.component.html',
  styleUrls: ['./point-management.component.scss']
})
export class PointManagementComponent implements OnInit {
  options = [
    'coca-cola',
    'HDI',
    'Pepsi'
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
