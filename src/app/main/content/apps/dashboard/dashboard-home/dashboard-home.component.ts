import { Component, OnInit } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.scss'],
  animations : fuseAnimations
})
export class DashboardHomeComponent implements OnInit {
  dateNow = Date.now();

  dashboardWebTiles = [
    {
      title: 'Employees',
      icon: 'group',
      url: '/apps/employee/list',
      css: 'web-module'
    },
    {
      title: 'Students',
      icon: 'group',
      url: '/apps/student/list',
      css: 'web-module'
    },
    {
      title: 'Holidays',
      icon: 'event_note',
      url: '/apps/holidays/list',
      css: 'web-module'
    },
    {
      title: 'Standards',
      icon: 'group_work',
      url: '/apps/setup/standards',
      css: 'web-module'
    },
    {
      title: 'Divisions',
      icon: 'group_work',
      url: '/apps/setup/divisions',
      css: 'web-module'
    },
    // {
    //   title: 'Subjects',
    //   icon: 'import_contacts',
    //   url: '/apps/setup/subjects'
    // },
    {
      title: 'Communication',
      icon: 'forum',
      url: '/apps/communication/home',
      css: 'web-module'
    }, {
      title: 'Attendance',
      icon: 'forum',
      url: '/apps/attendance/taker',
      css: 'mobile-module'
    }
  ];

  constructor() {
  }

  ngOnInit() {
  }

}
