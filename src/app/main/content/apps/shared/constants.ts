export class ApiConst {
    public static readonly BASE_URL = 'http://dev.cloudscripts.co.in:8080/schoolManagement/';
    public static readonly STUDENTS = '/students';
    // public static readonly BASE_URL = 'http://localhost:3000/';
}

export class Constants {
    public static readonly DEFAULT_STATE = 'Maharashtra';
    public static readonly DEFAULT_COUNTRY = 'India';
    public static readonly DEFAULT_NATIONALITY = 'Indian';
    public static readonly DEFAULT_GENDER_SELECTION = 'Male';
    public static readonly DEFAULT_MARITAL_STATUS_SELECTION = 'Unmarried';
}

export const MY_FORMATS = {
    parse  : {
        dateInput: 'LL'
    },
    display: {
        dateInput         : 'LL',
        monthYearLabel    : 'MMM YYYY',
        dateA11yLabel     : 'LL',
        monthYearA11yLabel: 'MMMM YYYY'
    }
};
