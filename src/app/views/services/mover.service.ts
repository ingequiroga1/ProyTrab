import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserMovencoModel } from '../../core/_base/layout/models/usermovenco.model';

@Injectable()
export class MoverService {
    private url = 'http://52.226.100.59/api/User';

    constructor(private http: HttpClient) {    }

    crearUserMovenco( userMovenco: UserMovencoModel ){
        return this.http.post(this.url, userMovenco);
    }
}