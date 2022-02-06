import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsModule } from '@ngxs/store';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { UserState } from './ngxs-store/user/user.state';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './shared/components/header/header.component';
import { EmailComponent } from './shared/components/headerComponents/email/email.component';
import { NotificationsComponent } from './shared/components/headerComponents/notifications/notifications.component';
import { SearchComponent } from './shared/components/headerComponents/search/search.component';
import { UserComponent } from './shared/components/headerComponents/user/user.component';
import { SideBarComponent } from './shared/components/side-bar/side-bar.component';
import { ShortNamePipe } from './shared/pipes/short-name';
import { ClassPageComponent } from './components/class-page/class-page.component';
import { TestsPageComponent } from './components/tests-page/tests-page.component';

@NgModule({
  declarations: [
    AppComponent,
    SideBarComponent,
    HeaderComponent,
    EmailComponent,
    NotificationsComponent,
    SearchComponent,
    UserComponent,
    ShortNamePipe,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    SharedModule,
    AppRoutingModule,
    FormsModule,
    NgxsModule.forRoot([UserState], {}),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    BrowserAnimationsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
