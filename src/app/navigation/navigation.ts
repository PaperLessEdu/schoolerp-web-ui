export const navigation = [
    {
        'id': 'applications',
        'title': 'Applications',
        'translate': 'NAV.APPLICATIONS',
        'type': 'group',
        'children': [
            {
                'id': 'dashboard',
                'title': 'Dashboard',
                'translate': 'NAV.DASHBOARD',
                'type': 'item',
                'icon': 'dashboard',
                'url': '/apps/dashboard/home'
            },
            {
                'id': 'setup',
                'title': 'Setup',
                'translate': 'NAV.SETUP',
                'type': 'collapse',
                'icon': 'settings',
                'children': [
                    {
                        'id': 'academic-year',
                        'title': 'Academic Year',
                        'type': 'item',
                        'url': '/apps/setup/academic-year/list'
                    },
                    {
                        'id': 'standards',
                        'title': 'Standards',
                        'type': 'item',
                        'url': '/apps/setup/standards'
                    },
                    {
                        'id': 'divisions',
                        'title': 'Divisions',
                        'type': 'item',
                        'url': '/apps/setup/divisions'
                    },
                    {
                        'id': 'subjects',
                        'title': 'Subjects',
                        'type': 'item',
                        'url': '/apps/setup/subjects'
                    },
                    // {
                    //     'id': 'timetable',
                    //     'title': 'Timetable',
                    //     'type': 'collapse',
                    //     'children': [
                    //         {
                    //             'id': 'templates',
                    //             'title': 'Templates',
                    //             'type': 'item',
                    //             'url': '/apps/setup/timetable/templates/list'
                    //         }
                    //     ]
                    // },
                    // {
                    //     'id': 'role',
                    //     'title': 'Roles',
                    //     'type': 'item',
                    //     'url': '/apps/setup/roles/list'
                    // }
                ]
            },
            {
                'id': 'student',
                'title': 'Student',
                'translate': 'NAV.STUDENT',
                'type': 'collapse',
                'icon': 'group',
                'children': [
                    {
                        'id': 'list',
                        'title': 'All Students',
                        'type': 'item',
                        'url': '/apps/student/list'
                    },
                    {
                        'id': 'add',
                        'title': 'Register',
                        'type': 'item',
                        'url': '/apps/student/new'
                    }
                ]
            },
            {
                'id': 'employee',
                'title': 'Employee',
                'translate': 'NAV.EMPLOYEE',
                'type': 'collapse',
                'icon': 'group',
                'children': [
                    {
                        'id': 'list',
                        'title': 'All Employees',
                        'type': 'item',
                        'url': '/apps/employee/list'
                    },
                    {
                        'id': 'add',
                        'title': 'Register',
                        'type': 'item',
                        'url': '/apps/employee/new'
                    }
                ]
            },
            {
                'id': 'attendance',
                'title': 'Attendance',
                'translate': 'NAV.ATTENDANCE',
                'type': 'collapse',
                'icon': 'check_box',
                'children': [
                    {
                        'id': 'taker',
                        'title': 'Taker',
                        'type': 'item',
                        'url': '/apps/attendance/taker'
                    },
                    {
                        'id': 'report',
                        'title': 'Report',
                        'type': 'item',
                        'url': '/apps/attendance/report'
                    }
                ]
            },
            {
                'id': 'holidays',
                'title': 'Holidays',
                'translate': 'NAV.HOLIDAYS',
                'type': 'item',
                'icon': 'today',
                'url': '/apps/holidays/list'
            },
            {
                'id': 'communication',
                'title': 'Communication',
                'translate': 'NAV.COMMUNICATION',
                'type': 'item',
                'icon': 'forum',
                'url': '/apps/communication/home'
            },
            // {
            //     'id': 'examination',
            //     'title': 'Examination',
            //     'translate': 'NAV.EXAMINATION',
            //     'type': 'item',
            //     'url': '/apps/examination/list'
            // }
        ]
    }
];
