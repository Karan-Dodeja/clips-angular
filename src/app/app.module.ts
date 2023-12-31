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
import { ClipComponent } from './clip/clip.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { ClipsListComponent } from './clips-list/clips-list.component';
import { FbTimestampPipe } from './pipes/fb-timestamp.pipe';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    AboutComponent,
    ClipComponent,
    NotFoundComponent,
    ClipsListComponent,
    FbTimestampPipe
  ],
  imports: [
    BrowserModule,
    AngularFirestoreModule,
    UserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AppRoutingModule,
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }