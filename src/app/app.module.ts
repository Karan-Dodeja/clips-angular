import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { UserModule } from './user/user.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { AngularFireModule } from "@angular/fire/compat"
import { environment } from '../environments/environment';
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { VideoModule } from './video/video.module';
import { ClipComponent } from './clip/clip.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    AboutComponent,
    ClipComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    VideoModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }