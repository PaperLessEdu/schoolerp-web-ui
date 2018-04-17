export const navigation = [
    {
        'id': 'applications',
        'title': 'Applications',
        'translate': 'NAV.APPLICATIONS',
        'type': 'group',
        'children': [
            {
                'id': 'setup',
                'title': 'Setup',
                'translate': 'NAV.SETUP',
                'type': 'collapse',
                'icon': 'settings',
                'children': [
                    {
                        'id': 'standards',
                        'title': 'Standards',
                        'type': 'item',
                        'url': '/apps/setup/standards'
                    },
                    {
                        'id': 'subjects',
                        'title': 'Subjects',
                        'type': 'item',
                        'url': '/apps/setup/subjects'
                    },
                    {
                        'id': 'divisions',
                        'title': 'Divisions',
                        'type': 'item',
                        'url': '/apps/setup/divisions'
                    },
                    {
                        'id': 'timetable',
                        'title': 'Timetable',
                        'type': 'collapse',
                        'children': [
                            {
                                'id': 'templates',
                                'title': 'Templates',
                                'type': 'item',
                                'url': '/apps/setup/timetable/templates/list'
                            }
                        ]
                    }
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
                'id': 'holidays',
                'title': 'Holidays',
                'translate': 'NAV.HOLIDAYS',
                'type': 'item',
                'icon': 'today',
                'url': '/apps/holidays/list'
            }
        ]
    }
];
