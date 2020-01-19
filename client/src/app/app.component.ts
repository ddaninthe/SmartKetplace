import { Component } from '@angular/core';
import { Web3Service } from './services/web3/web3.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SmartKetplace';

  constructor(private web3service : Web3Service) { }
}
