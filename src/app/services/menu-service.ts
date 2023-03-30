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
        const userDetail = JSON.parse(localStorage.getItem('userDetail'))
        const queryParms = new HttpParams()
            .set('appname', 'av')
            .append('groupname', userDetail.groupName);

        return this.httpClient.get<menus>(this.apiUrl + 'postauth', { params: queryParms });
    }
}