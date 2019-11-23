import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { JwtModule } from '@auth0/angular-jwt';

import { AppRoutingModule, routingComponents } from './app-routing.module';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
// we don't need that
// import { AuthService } from './_services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { ErrorInterceptorProvider } from './_services/error.interceptor.service';
import { AlertifyService } from './_services/alertify.service';
import { BsDropdownModule, TabsModule } from 'ngx-bootstrap';
import { NgxGalleryModule } from 'ngx-gallery';

import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';

import { ListsComponent } from './lists/lists.component';
import { MemberListsComponent } from './members/member-lists/member-lists.component';
import { MessagesComponent } from './messages/messages.component';
import { appRoutes } from './routes';
import { AuthGuard } from './_guards/auth.guard';
import { MembersComponent } from './members/members.component';
import { MemberCardComponent } from './members/member-card/member-card.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { MemberDetailsResolver } from './_resolvers/member-details-resolver';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { MemberEditResolver } from './_resolvers/member-edit-resolver';


export function tokenGetter() {

   return localStorage.getItem('token');
}

@NgModule({
   declarations: [
      AppComponent,
      NavComponent,
      RegisterComponent,
      routingComponents,
      MembersComponent,
      MemberCardComponent,
      MemberDetailComponent,
      MemberEditComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      HttpClientModule,
      FormsModule,
      BsDropdownModule.forRoot(),
      TabsModule.forRoot(),
      NgxGalleryModule
      // to fix:
      // JwtModule.forRoot({
      //    config: {
      //       tokenGetter: tokenGetter,
      //       whitelistedDomains: ['localhost:4200'],
      //       blacklistedRoutes: ['localhost:4200/api/auth']
      //    }
      // })
      //RouterModule.forRoot(appRoutes)
   ],
   providers: [
      ErrorInterceptorProvider,
      AlertifyService,
      AuthGuard,
      MemberDetailsResolver,
      MemberEditResolver
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
