import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
  private transactionDenied: Boolean;
  private houseForm: FormGroup;
  private submitted: Boolean;
  private waiting: Boolean;
  private houseId: number;

  constructor(private router: Router, private formBuilder: FormBuilder, private web3Service: Web3Service) {
    this.web3Service.smartContract.events.NewHouse({}, 
      (err, data) => {
        if (err) {
          console.log(err);
        } else {
          this.houseAdded = true;
          this.houseId = Number.parseInt(data.returnValues.houseId) + 1;
          this.houseForm.reset();
        }
      });
   }

  ngOnInit() {
    this.houseAdded = false;
    this.transactionDenied = false;
    this.submitted = false;
    this.waiting = false;

    this.houseForm = this.formBuilder.group({
      location: '',
      price: '',
      area: '',
      roomCount: ''
    });
  }

  cancel(): void {
    this.router.navigate(['/']);
  }

  navigate(): void {
    this.router.navigate(['/houses/'])
  }

  submitForm(houseFormValue: House): void {
    this.submitted = true;
    houseFormValue.documents = [];
    this.waiting = true;
    this.web3Service.addHouse(houseFormValue)
      .then()
      .catch(e => {
        // User denied transaction
        if (e.code == 4001) {
          this.transactionDenied = true;
        } else console.log(e);
      })
      .finally(() => {
        this.waiting = false;
        this.submitted = false;
      });
  }
}