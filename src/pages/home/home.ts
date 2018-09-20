import { Component } from '@angular/core';
import { NavController, IonicPage, PopoverController } from 'ionic-angular';
import { FloorProvider } from '../../providers/floor/floor';
import { ModalController } from 'ionic-angular';
import { Car } from '../../models/car';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  floor: number = 1;
  floorO: any;
  cars: Car[];
  isOpenArray: boolean[] = [];

  constructor(public navCtrl: NavController, 
              public popoverCtrl: PopoverController,
              public modalCtrl: ModalController, 
              private floorProvider: FloorProvider) {
    floorProvider.cars.subscribe(data => {
      this.cars = data;

      if(this.isOpenArray.length == 0) {
        data.forEach(car => {
          this.isOpenArray.push(false);
        });
      }
    });
  }

  presentMorePopoverPage(ev: UIEvent) {
    let popover = this.popoverCtrl.create('MorePopoverPage');
    popover.present({
      ev: ev
    });
  }

  addNewCar() {
    const modal = this.modalCtrl.create('NewcarPage');
    modal.present();
  }
}
