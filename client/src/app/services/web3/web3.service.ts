import { Injectable, OnInit } from '@angular/core';
import Fortmatic from 'fortmatic';
import Web3 from 'web3';
import * as SmartContract_artifacts from '../../../../../truffle/build/contracts/SmartKetplace.json';
import { House } from '../../models/house.model';
import { WindowRef } from '../windowRef';

@Injectable({
  providedIn: 'root'
})
export class Web3Service {

  private API_KEY: string = "pk_test_A7FAD9454AAFD7A1";

  private fm: Fortmatic;
  private web3: Web3;

  
  private smartContract;

  private userAddress: string;

  constructor(private winRef: WindowRef) {
    this.fm = new Fortmatic(this.API_KEY, 'ropsten');
    this.web3 = new Web3(this.fm.getProvider());

    this.smartContract = new this.web3.eth.Contract(SmartContract_artifacts.abi, SmartContract_artifacts.networks[3].address);
    console.log(this.smartContract);

  //  const tokenContractInstance = this.tokenContract.at(this.CONTRACT_ADDRESS);

    //this.SmartContract = contract(SmartContract_artifacts);
    //this.SmartContract.setProvider(this.web3.currentProvider);

    /*this.smartContract.deployed().then(instance => {
      this.deployed = instance;
      console.log("Deployed");
      console.log(instance);
    }).catch(e => {
      console.log(e);
    });*/

    //const tokenContract = this.winRef.nativeWindow.web3.eth.contract(this.erc20TokenContractAbi);
    //this.smarketplace = tokenContract.at(this.CONTRACT_ADDRESS);

    // Request user login if needed, returns current user account address
    this.winRef.nativeWindow.web3.currentProvider.enable()
      .then((accounts: string[]) => {
        this.userAddress = accounts[0];
      })
      .catch(() => {
        alert("You must connect to Metamask");
        window.location.reload();
      });
  }

  getEvents() {
    return this.smartContract.events;
  }

  // Add a house
  addHouse(house: House): Promise<any> {
    return this.smartContract.methods.addHouse(house.location, house.roomCount, house.area, 
      house.price, house.documents).call({from: this.userAddress});
  }

  // Get all houses
  getHouses(): Promise<House[]> {
    return this.smartContract.methods.getHouses().call();
  }
}
