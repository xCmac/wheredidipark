import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  floor: number = 1;

  constructor(public navCtrl: NavController) {
  }

  increase() {
    this.floor += 1;
  }

  decrease() {
    this.floor -= 1;

    if(this.floor < 1) {
      this.floor = 1
    }

  }

  isValidFloor(): boolean {
    return this.floor > 1;
  }

}
