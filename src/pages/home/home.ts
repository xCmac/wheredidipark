import { Component } from '@angular/core';
import { NavController, IonicPage, PopoverController } from 'ionic-angular';
import { FloorProvider } from '../../providers/floor/floor';
import { ModalController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  floor: number = 1;
  floorO: any;

  constructor(public navCtrl: NavController, 
              public popoverCtrl: PopoverController,
              public modalCtrl: ModalController, 
              private floorProvider: FloorProvider) {
  }

  ionViewDidLoad() {
    this.print();
  }

  presentMorePopoverPage(ev: UIEvent) {
    let popover = this.popoverCtrl.create('MorePopoverPage');
    popover.present({
      ev: ev
    });
  }

  print() {
    this.floorProvider.cars.subscribe(res => {
      console.log(res);
    })

  }

  addNewCar() {
    const modal = this.modalCtrl.create('NewcarPage');
    modal.present();
  }

}
