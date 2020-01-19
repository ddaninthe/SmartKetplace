import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Web3Service } from '../services/web3/web3.service';
import { House } from '../models/house.model';

@Component({
  selector: 'app-sell',
  templateUrl: './sell.component.html',
  styleUrls: ['./sell.component.css']
})
export class SellComponent implements OnInit {

  private houseAdded: Boolean;
  private houseForm: any;
  private submitted: Boolean;

  constructor(private router: Router, private formBuilder: FormBuilder, private web3Service: Web3Service) { }

  ngOnInit() {
    this.houseAdded = false;
    this.submitted = false;

    this.houseForm = this.formBuilder.group({
      location: 'Paris 20ème',
      price: 1,
      area: 70,
      roomCount: 3
    });

    // Web3js can't subscribe
    /*
    this.web3Service.getEvents().NewHouse({}, (err, houseId)=> {
      if (err) {
        console.log(err);
      } else {
        this.houseAdded = true;
        setTimeout(() => this.router.navigate(['house/' + houseId]), 3000);
      }
    });*/
  }

  cancel(): void {
    this.router.navigate(['/']);
  }

  submitForm(houseFormValue: House): void {
    this.submitted = true;
    houseFormValue.documents = [];
    this.web3Service.addHouse(houseFormValue).then((d) => {
      console.log(d);
    })
    .catch(e => console.log(e));
  }
}
