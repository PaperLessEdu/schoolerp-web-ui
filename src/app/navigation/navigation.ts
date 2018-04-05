export const navigation = [
    {
        'id'      : 'applications',
        'title'   : 'Applications',
        'translate': 'NAV.APPLICATIONS',
        'type'    : 'group',
        'children': [
            {
                'id'   : 'setup',
                'title': 'Setup',
                'translate': 'NAV.SETUP',
                'type'     : 'collapse',
                'icon'     : 'settings',
                'children' : [
                    {
                        'id'   : 'standards',
                        'title': 'Standards',
                        'type' : 'item',
                        'url'  : '/apps/setup/standards'
                    }
                ]
            },
            {
                'id'   : 'student',
                'title': 'Student',
                'translate': 'NAV.STUDENT',
                'type' : 'item',
                'icon' : 'group',
                'url'  : '/apps/student'
            },
            {
                'id'   : 'employee',
                'title': 'Employee',
                'translate': 'NAV.EMPLOYEE',
                'type'     : 'collapse',
                'icon'     : 'group',
                'children' : [
                    {
                        'id'   : 'list',
                        'title': 'All Employees',
                        'type' : 'item',
                        'url'  : '/apps/employee/list'
                    },
                    {
                        'id'   : 'add',
                        'title': 'Register',
                        'type' : 'item',
                        'url'  : '/apps/employee/new'
                    }
                ]
            }
        ]
    }
];
