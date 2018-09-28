import { Component, Input, Output, EventEmitter } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { Car } from '../../models/car';
import { CarProvider } from '../../providers/car/car';
import { COLORS } from '../../theme/colors';

@Component({
  selector: 'car',
  templateUrl: 'car.html'
})
export class CarComponent {
  theCar: Car;
  carColor: string;
  colors = COLORS;

  @Input('car') set car(car: Car) {
    this.theCar = car;
    this.carColor = this.getCarColor();
  }

  @Input() isOpen: boolean;
  @Output() isOpenChange: EventEmitter<boolean> = new EventEmitter();

  constructor(private carProvider: CarProvider, public alertCtrl: AlertController) {
  }

  increase() {
    this.theCar.currentFloor++;
    this.carProvider.updateCar(this.theCar);
  }

  decrease() {
    this.theCar.currentFloor--;
    this.carProvider.updateCar(this.theCar);
  }

  getCarColor() {
    if (!this.theCar.color) {
      return this.colors.darkGrey;
    } 

    switch(this.theCar.color) {
      case "red": {
        return this.colors.red;
      }
      case "orange": {
        return this.colors.orange;
      }
      case "yellow": {
        return this.colors.yellow;
      }
      case "green": {
        return this.colors.green;
      }
      case "blue": {
        return this.colors.blue;
      }
    }
  }

  setCarColor(hexColor: string) {
    var englishColor = "";

    switch(hexColor) {
      case this.colors.red: {
        englishColor = "red";
        break;
      }
      case this.colors.orange: {
        englishColor = "orange";
        break;
      }
      case this.colors.yellow: {
        englishColor = "yellow";
        break;
      }
      case this.colors.green: {
        englishColor = "green";
        break;
      }
      case this.colors.blue: {
        englishColor = "blue";
        break;
      }
    }

    this.theCar.color = englishColor;
    this.carProvider.updateCar(this.theCar);
  }

  deleteCar() {
    this.carProvider.deleteCar(this.theCar);
  }

  confirmDeleteCar() {
    const confirm = this.alertCtrl.create({
      title: 'Delete this car?',
      message: 'Do you agree to delete this car? You will lose the data you\'ve saved for it.',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Delete',
          handler: () => {
            this.deleteCar();
          }
        }
      ]
    });
    confirm.present();
  }

  toggleIsOpen() {
    this.isOpen = !this.isOpen;
    this.isOpenChange.emit(this.isOpen);
  }

}
