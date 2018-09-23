import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Car } from '../../models/car';
import { FloorProvider } from '../../providers/floor/floor';
import { COLORS } from '../../theme/colors';

@Component({
  selector: 'car',
  templateUrl: 'car.html'
})
export class CarComponent {
  theCar: Car;
  carColor: string;
  colors = COLORS;
  isOpenValue: boolean;

  @Input('car') set car(car: Car) {
    this.theCar = car;
    this.carColor = this.getCarColor();
  }

  @Input() get isOpen() {
    return this.isOpenValue;
  }

  @Output() isOpenChange = new EventEmitter();
  set isOpen(value) {
    this.isOpenValue = value;
    this.isOpenChange.emit(this.isOpenValue);
  }

  constructor(private floorProvider: FloorProvider) {
  }

  increase() {
    this.theCar.currentFloor++;
    this.floorProvider.updateCar(this.theCar);
  }

  decrease() {
    this.theCar.currentFloor--;
    this.floorProvider.updateCar(this.theCar);
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
    this.floorProvider.updateCar(this.theCar);
  }

  deleteCar() {
    this.floorProvider.deleteCar(this.theCar);
  }

  toggleIsOpen() {
    this.isOpen = !this.isOpen;
  }

}
