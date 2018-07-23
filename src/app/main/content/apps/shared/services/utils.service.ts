import { Injectable } from '@angular/core';
import { ApiConst } from '../../shared/constants';

@Injectable()
export class UtilsService {
    constructor() { }

    capitalize(title: string): string {
        const temp = title.trim();
        return temp.charAt(0).toUpperCase() + temp.slice(1);
    }
}
