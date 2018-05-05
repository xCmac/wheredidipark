import { Component } from '@angular/core';
import { NavController, IonicPage, PopoverController } from 'ionic-angular';
import { FloorProvider } from '../../providers/floor/floor';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  floor: number = 1;

  constructor(public navCtrl: NavController, 
              public popoverCtrl: PopoverController, 
              private floorProvider: FloorProvider) {
  }

  ionViewDidLoad() {

  }

  increase() {
    this.floor += 1;
    this.floorProvider.updateFloor(this.floor);
  }

  decrease() {
    this.floor -= 1;
    if(this.floor < 1) {
      this.floor = 1
    }

    
    this.floorProvider.updateFloor(this.floor);

  }

  isValidFloor(): boolean {
    return this.floor > 1;
  }

  presentMorePopoverPage(ev: UIEvent) {
    let popover = this.popoverCtrl.create('MorePopoverPage');
    popover.present({
      ev: ev
    });

  }

}
