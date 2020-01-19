import { Component, OnInit } from '@angular/core';
import { Web3Service } from '../services/web3/web3.service';
import { ActivatedRoute, Router } from '@angular/router';
import { House } from '../models/house.model';

@Component({
  selector: 'app-house',
  templateUrl: './house.component.html',
  styleUrls: ['./house.component.css']
})
export class HouseComponent implements OnInit {
  private houseId: number;
  private house: House;
  private disable: Boolean;
  private isOwner: Boolean;
  private houseBought: Boolean;
  private waiting: Boolean;
  private ownerAddress: string;
  private transactionDenied: Boolean;
  private userAddress: string;

  constructor(private web3service: Web3Service, private router: Router, private activeRoute: ActivatedRoute) { 
    this.web3service.smartContract.events.Transfer({}, (e, data) => {
      if (e) {
        console.log(e);
      } else {
        console.log(data);
        this.houseBought = true;
        this.userAddress = data.returnValues._from;
        this.ownerAddress = data.returnValues._from;
      }
    });
  }

  ngOnInit() {
    this.disable = true;
    this.isOwner = true;
    this.houseId = this.activeRoute.snapshot.params.houseId - 1;

    this.web3service.getHouseOwner(this.houseId)
      .then((address: string) => {
        this.isOwner = this.web3service.isSelfAddress(address);
        this.ownerAddress = address;
        this.disable = false;
      }).catch(e => console.log(e));

    this.web3service.getHouse(this.houseId)
      .then((house: House) => this.house = house)
      .catch(e => console.log(e));

    setInterval(() => 
      this.isOwner = this.web3service.isSelfAddress(this.ownerAddress), 1500);
  }

  buyHouse(): void {
    this.disable = true;
    this.waiting = true;

    this.web3service.buyHouse(this.houseId, this.house.price)
      .then(() => {
        this.houseBought = true;
        this.isOwner = true;
      })
      .catch(e => {
        // User denied transaction
        if (e.code == 4001) {
          this.transactionDenied = true;
        } else console.log(e);
        this.disable = false;
      }).finally(() => this.waiting = false);
  }

  back(): void {
    this.router.navigate(['/']);
  }
}