export const navigation = [
    {
        'id'      : 'applications',
        'title'   : 'Applications',
        'translate': 'NAV.APPLICATIONS',
        'type'    : 'group',
        'children': [
            {
                'id'   : 'sample',
                'title': 'Sample',
                'translate': 'NAV.SAMPLE.TITLE',
                'type' : 'item',
                'icon' : 'email',
                'url'  : '/sample',
                'badge': {
                    'title': 25,
                    'translate': 'NAV.SAMPLE.BADGE',
                    'bg'   : '#F44336',
                    'fg'   : '#FFFFFF'
                }
            },
            {
                'id'   : 'employee',
                'title': 'Employee',
                'translate': 'NAV.EMPLOYEE',
                'type' : 'item',
                'icon' : 'group',
                'url'  : '/apps/employee'
            },
            {
                'id'   : 'student',
                'title': 'Student',
                'translate': 'NAV.STUDENT',
                'type' : 'item',
                'icon' : 'group',
                'url'  : '/apps/student'
            }
        ]
    }
];
