import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})

export class AuthService {

    apiUrl = environment.apiUrl;
    constructor(
        private httpClient: HttpClient,
    ) {

    }

    signinUser(userName: string, password: string): Observable<any> {
        const reqBody = {
            username: userName,
            password: password
        }

        return this.httpClient.post<any>(this.apiUrl + 'auth', reqBody, {});
    }

    validateUser() {

        return this.httpClient.get<any>(this.apiUrl + 'validateauth');
    }
}