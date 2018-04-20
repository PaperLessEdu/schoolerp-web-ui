import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class StandardListService {
    constructor(private http: HttpClient) { }

    getStandards() {
        return this.http.get('api/standards');
    }

    deleteStandard(standard) {
        return this.http.delete('api/standards/'+standard.id);
    }
}