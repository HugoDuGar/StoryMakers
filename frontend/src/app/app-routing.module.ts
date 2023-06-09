import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrincipalComponent } from './principal/principal.component';
import { EventsComponent } from './principal/events/events.component';
import { ProfileComponent } from './principal/profile/profile.component';
import { RankingsComponent } from './principal/rankings/rankings.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { EventsFormComponent } from './principal/events/events-form/events-form.component';
import { EditProfileComponent } from './principal/profile/edit-profile/edit-profile.component';
import { HistoriesComponent } from './principal/profile/histories/histories.component';
import { EditHistoriesComponent } from './principal/profile/histories/edit-histories/edit-histories.component';
import { SeeHistoriesComponent } from './principal/profile/histories/see-histories/see-histories.component';
import { SeeEventComponent } from './principal/events/see-event/see-event.component';
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
import { AuthGuard } from './auth.guard';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  /**
   * Rutas principales
   */
  { path: 'principal', component: PrincipalComponent, canActivate: [AuthGuard] },
  { path: 'events', component: EventsComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'rankings', component: RankingsComponent, canActivate: [AuthGuard] },
  /**
   * Rutas de autenticacion y registro
   */
  { path: 'login', component: LoginComponent },
  { path:'register', component: RegisterComponent },
  /**
   * Rutas de las historias
   */
  { path: 'histories', component: HistoriesComponent, canActivate: [AuthGuard] },
  { path: 'edit-histories/:id', component: EditHistoriesComponent },
  { path: 'see-histories/:history_id/:user_id', component: SeeHistoriesComponent },
  { path: 'see-your-history/:id', component: SeeYourHistoryComponent },
  /**
   * Rutas de los eventos
   */
  { path: 'events-form', component: EventsFormComponent, canActivate: [AuthGuard] },
  { path: 'see-event/:event_id/:user_id', component: SeeEventComponent },
  { path: 'see-your-event/:id', component: SeeYourEventComponent},
  { path: 'historie-for-your-event/:id', component: HistorieForYourEventComponent },
  { path: 'edit-historie-for-your-event/:id', component: EditHistoryForYourEventComponent },
  { path: 'see-history-for-your-event/:id', component: SeeHistoryForYourEventComponent },
  { path: 'see-admin-history-for-event/:event_id/:id', component: SeeAdminHistoryForEventComponent },
  /**
   * Rutas de los capítulos
   */
  { path: 'create-chapter/:history_id', component: ChaptersComponent },
  { path: 'see-chapter/:id', component: SeeChapterComponent },
  { path: 'create-chapter-event/:history_id', component: ChaptersEventsComponent },
  { path: 'see-chapter-event/:id', component: SeeChapterEventComponent },
  { path: 'edit-chapter/:id', component: EditChapterComponent} ,
  { path: 'edit-chapter-event/:id', component: EditChapterEventComponent },
  /**
   * Ruta de edición del perfil
   */
  { path: 'edit-profile', component: EditProfileComponent, canActivate: [AuthGuard] }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
