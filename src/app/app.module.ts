import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MfeLibraryV1Module } from 'mfe-library-v1';
import { AppComponent } from './app.component';
// import { ComponentShareModule } from './components/component-share.module';
import { startsWith } from './router.utils';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './services/auth.guard';
import { TopNavComponent } from './components/top-nav/top-nav.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { WrapperComponent } from './components/wrapper/wrapper.component';
import { InterceptorInterceptor } from './shared/interceptor.interceptor';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    BrowserModule,
    HttpClientModule,
    MfeLibraryV1Module,
    // ComponentShareModule,
    RouterModule.forRoot([
      { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
      {
        path: '',
        component: AppComponent,
        children: [
          { matcher: startsWith('goals'), component: WrapperComponent, data: { importName: 'mfe1', elementName: 'mfe1-element' } },
          { matcher: startsWith('mfe2'), component: WrapperComponent, data: { importName: 'mfe2', elementName: 'mfe2-element' } },
          {
            path: 'legacy-account-view',
            loadChildren: () => import('./components/poll/poll.module').then(m => m.PollModule),
          }
        ],
        canActivate: [AuthGuard]
      },
      // { matcher: startsWith('monolithic'), component: WrapperComponent, data: { importName: 'monolithic', elementName: 'monolithic-element' } },
      // {
      //   path: 'legacy-account-view',
      //   loadChildren: () => import('./components/poll/poll.module').then(m => m.PollModule),
      // },
    ])
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    TopNavComponent,
    WrapperComponent
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: InterceptorInterceptor, multi: true
    },
  ],
  bootstrap: [HomeComponent]
})
export class AppModule { }
