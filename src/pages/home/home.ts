import { Component } from '@angular/core';
import { NavController, IonicApp, IonicPage } from 'ionic-angular';
import { BackendProvider } from '../../providers/backend/backend';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  floor: number = 1;

  constructor(public navCtrl: NavController, private backendProvider: BackendProvider) {
  }

  increase() {
    this.floor += 1;
    this.backendProvider.updateFloor(this.floor);
  }

  decrease() {
    this.floor -= 1;

    if(this.floor < 1) {
      this.floor = 1
    }

    this.backendProvider.updateFloor(this.floor);
  }

  isValidFloor(): boolean {
    return this.floor > 1;
  }

}
