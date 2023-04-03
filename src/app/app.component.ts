import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { Location } from '@angular/common';


declare const require: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  ngVersion = require('../../package.json').dependencies['@angular/core'];

  title = 'shell';
  currentDate = new Date();
  profile: Record<string, string> = {};
  subLink: SafeUrl = '';
  constructor(
    private auth: AuthService,
    protected _sanitizer: DomSanitizer,
    private router: Router,
    private location: Location
  ) {
  }

  ngOnInit(): void {
    this.profile = this.auth.getUserDetails();
  }

  topNavRouting(link) {
    this.subLink = this._sanitizer.bypassSecurityTrustResourceUrl(link);
    this.location.replaceState('/');
  }


  sendData() {
    const event = new CustomEvent('event', { detail: 'LPL Business User' });
    dispatchEvent(event);
  }

  logOut() {
    localStorage.clear();
    this.router.navigate(['login'])
  }

}
