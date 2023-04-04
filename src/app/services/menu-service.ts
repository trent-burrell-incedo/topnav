import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { menus } from "../models/menu/menu";

@Injectable({
    providedIn: 'root'
})

export class MenuService {

    apiUrl = environment.apiUrl;
    constructor(
        private httpClient: HttpClient,
    ) {

    }

    // getNavMenu(): Observable<menus> {
    //     const queryParms = new HttpParams()
    //         .set('appname', 'av');

    //     return this.httpClient.get<menus>(this.apiUrl + 'preauth', { params: queryParms });
    // }

    getPostMenu(): Observable<menus> {
        const groupName = localStorage.getItem('groupName');
        const token = localStorage.getItem('token');
        const queryParms = new HttpParams()
            .set('appname', 'av')
            .append('groupname', groupName);

        const httpOptions = {
            headers: { 'Authorization': 'Bearer ' + token, 'Content-Type': 'application/json', 'accept': 'application/json' },
            params: { 'appname': 'av', 'groupName': groupName}
        };
        return this.httpClient.get<menus>(this.apiUrl + 'postauth', httpOptions);
    }
}