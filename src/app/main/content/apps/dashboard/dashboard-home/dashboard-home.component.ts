import { Component, OnInit } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.scss'],
  animations : fuseAnimations
})
export class DashboardHomeComponent implements OnInit {
  dashboardTiles = [
    {
      title: 'Employees',
      icon: 'group',
      url: '/apps/employee/list'
    },
    {
      title: 'Students',
      icon: 'group',
      url: '/apps/student/list'
    },
    {
      title: 'Holidays',
      icon: 'event_note',
      url: '/apps/holidays/list'
    },
    {
      title: 'Standards',
      icon: 'group_work',
      url: '/apps/setup/standards'
    },
    {
      title: 'Divisions',
      icon: 'group_work',
      url: '/apps/setup/divisions'
    },
    // {
    //   title: 'Subjects',
    //   icon: 'import_contacts',
    //   url: '/apps/setup/subjects'
    // },
    {
      title: 'Communication',
      icon: 'forum',
      url: '/apps/communication/home'
    }
  ];
  
  constructor() { }

  ngOnInit() {
  }

}
