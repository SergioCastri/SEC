import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/first';

import { client  } from '../models/client.model';

import { changePass  } from '../models/changePass.model';
import { HttpService } from './http.service';
import { Config } from '../config';

@Injectable()
export class clientService extends HttpService{

	url = Config.API_SERVER_CLIENTS;
	constructor(public _http: Http){
		super(_http)
	}

	getAllclient() : Observable<Array<client>>{
		return this.get(this.url);
	}

	onSaveclient(client : client){
        return this.post(this.url, client)				
	}

	onChangePass(url, changePass : changePass){
        return this.post(url, changePass)				
	}

	

}   