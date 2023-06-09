import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PrincipalComponent } from './principal/principal.component';
import { EventsComponent } from './principal/events/events.component';
import { ProfileComponent } from './principal/profile/profile.component';
import { RankingsComponent } from './principal/rankings/rankings.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { EventsFormComponent } from './principal/events/events-form/events-form.component';
import { EditProfileComponent } from './principal/profile/edit-profile/edit-profile.component';
import { HistoriesComponent } from './principal/profile/histories/histories.component';
import { EditHistoriesComponent } from './principal/profile/histories/edit-histories/edit-histories.component';
import { SeeHistoriesComponent } from './principal/profile/histories/see-histories/see-histories.component';
import { SeeEventComponent } from './principal/events/see-event/see-event.component';
import { LibraryService } from './services/library.service';
import { SeeYourHistoryComponent } from './principal/profile/histories/see-your-history/see-your-history.component';
import { SeeYourEventComponent } from './principal/events/see-your-event/see-your-event.component';
import { HistorieForYourEventComponent } from './principal/events/see-your-event/historie-for-your-event/historie-for-your-event.component';
import { EditHistoryForYourEventComponent } from './principal/events/see-your-event/edit-history-for-your-event/edit-history-for-your-event.component';
import { SeeHistoryForYourEventComponent } from './principal/events/see-your-event/see-history-for-your-event/see-history-for-your-event.component';
import { SeeAdminHistoryForEventComponent } from './principal/events/see-event/see-admin-history-for-event/see-admin-history-for-event.component';
import { ChaptersComponent } from './principal/profile/histories/see-your-history/chapters/chapters.component';
import { SeeChapterComponent } from './principal/profile/histories/see-histories/see-chapter/see-chapter.component';
import { ChaptersEventsComponent } from './principal/events/see-your-event/see-history-for-your-event/chapters-events/chapters-events.component';
import { SeeChapterEventComponent } from './principal/events/see-event/see-admin-history-for-event/see-chapter-event/see-chapter-event.component';
import { EditChapterComponent } from './principal/profile/histories/see-your-history/edit-chapter/edit-chapter.component';
import { EditChapterEventComponent } from './principal/events/see-your-event/see-history-for-your-event/edit-chapter-event/edit-chapter-event.component';

@NgModule({
  declarations: [
    AppComponent,
    PrincipalComponent,
    EventsComponent,
    ProfileComponent,
    RankingsComponent,
    RegisterComponent,
    LoginComponent,
    EventsFormComponent,
    EditProfileComponent,
    HistoriesComponent,
    EditHistoriesComponent,
    SeeHistoriesComponent,
    SeeEventComponent,
    SeeYourHistoryComponent,
    SeeYourEventComponent,
    HistorieForYourEventComponent,
    EditHistoryForYourEventComponent,
    SeeHistoryForYourEventComponent,
    SeeAdminHistoryForEventComponent,
    ChaptersComponent,
    SeeChapterComponent,
    ChaptersEventsComponent,
    SeeChapterEventComponent,
    EditChapterComponent,
    EditChapterEventComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [LibraryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
