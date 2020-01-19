import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { WindowRef } from './services/windowRef';

// Components
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SellComponent } from './sell/sell.component';
import { HouseComponent } from './house/house.component';

// Services
import { Web3Service } from './services/web3/web3.service';

//Définition des routes
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'houses', component: HomeComponent },
  { path: 'houses/:houseId', component: HouseComponent },
  { path: 'sell', component: SellComponent },
  { path: '**', redirectTo: '' } //Redirection à la page d'accueil pour routes invalides
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SellComponent,
    HouseComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [WindowRef, Web3Service],
  bootstrap: [AppComponent]
})
export class AppModule { }
