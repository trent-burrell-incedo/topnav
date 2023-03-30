import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string;
  password: string;
  error: string;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }
  login(): void {
    this.authService.login(this.username, this.password)
      .subscribe(
        () => {
          this.router.navigate(['home']);
        },
        error => {
          this.error = error.message;
        }
      );
  }
}
