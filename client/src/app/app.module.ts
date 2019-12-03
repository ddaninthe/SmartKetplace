import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SellComponent } from './sell/sell.component';

//Définition des routes
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'sell', component: SellComponent },
  { path: '**', redirectTo: '' } //Redirection à la page d'accueil pour routes invalides
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SellComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes, { enableTracing: true })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
