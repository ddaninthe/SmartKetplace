import { Component, OnInit } from '@angular/core';
import { Web3Service } from '../services/web3/web3.service';
import { House } from '../models/house.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private houses: Array<House> = [];

  constructor(private web3service: Web3Service, private router: Router) { }

  ngOnInit() {
    this.web3service.getHouses()
      .then((houses: House[]) => {
        this.houses = [...houses];
      })
      .catch(e => {
        console.log(e);
      });
  }

  showDetails(houseId: number): void {
    this.router.navigate(['houses/' + houseId]);
  }
}
