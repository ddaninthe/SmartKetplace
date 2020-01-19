import { Component, OnInit } from '@angular/core';
import { Web3Service } from '../services/web3/web3.service';
import { House } from '../models/house.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private houses: Array<House> = [];

  constructor(private web3service: Web3Service) { }

  ngOnInit() {
    this.web3service.getHouses()
      .then((houses: House[]) => {
        console.log(houses);
        this.houses = [...houses];
      })
      .catch(e => {
        console.log(e);
      });
  }
}
